
import NextAuth from "next-auth";
import MicrosoftEntraID from "next-auth/providers/microsoft-entra-id";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import bcrypt from "bcryptjs";

import prisma from "@/lib/prisma";

const adminLoginSchema = z.object({
  email: z.email().transform((value) => value.trim().toLowerCase()),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  providers: [
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID!,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET!,
      issuer: process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER!,
      authorization: {
        params: {
          scope: "openid profile email User.Read",
        },
      },
      profilePhotoSize: 96
    }),

    Credentials({
      id: "admin-credentials",
      name: "Administrator",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const parsed = adminLoginSchema.safeParse(credentials);

        if (!parsed.success) return null;

        const user = await prisma.user.findUnique({
          where: { email: parsed.data.email },
          include: { admin: true },
        });

        if (
          !user ||
          user.role !== "ADMIN" ||
          !user.admin ||
          !user.passwordHash
        ) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(
          parsed.data.password,
          user.passwordHash,
        );

        if (!passwordMatches) return null;

        return {
          id: String(user.id),
          email: user.email,
          name: `${user.firstName} ${user.lastName}`,
        };
      },
    }),
    Credentials({
  id: "test-credentials",
  name: "Test User",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },

  async authorize(credentials) {
    const parsed = adminLoginSchema.safeParse(credentials);

    if (!parsed.success) return null;

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    // Test login must never authenticate an administrator.
    if (
      !user ||
      user.role === "ADMIN" ||
      !user.passwordHash
    ) {
      return null;
    }

    const passwordMatches = await bcrypt.compare(
      parsed.data.password,
      user.passwordHash,
    );

    if (!passwordMatches) return null;

    return {
      id: String(user.id),
      email: user.email,
      name: `${user.firstName} ${user.lastName}`,
    };
  },
}),
  ],

  callbacks: {
    async signIn({ account, profile, user }) {
      // Only automatically provision Microsoft institutional users.
      if (account?.provider !== "microsoft-entra-id") {
        return true;
      }

      const microsoftProfile = profile as
        | {
            oid?: string;
            tid?: string;
            email?: string;
            preferred_username?: string;
            name?: string;
            given_name?: string;
            family_name?: string;
          }
        | undefined;

      const tenantId = microsoftProfile?.tid;
      const objectId = microsoftProfile?.oid;

      if (
        !tenantId ||
        !objectId ||
        tenantId.toLowerCase() !==
          process.env.MICROSOFT_TENANT_ID?.toLowerCase()
      ) {
        return false;
      }

      const email = (
        microsoftProfile?.email ??
        microsoftProfile?.preferred_username
      )?.trim().toLowerCase();

      if (!email) return false;

      const firstName =
        microsoftProfile?.given_name?.trim() ||
        microsoftProfile?.name?.trim().split(/\s+/)[0] ||
        "Unknown";

      const lastName =
        microsoftProfile?.family_name?.trim() ||
        microsoftProfile?.name?.trim().split(/\s+/).slice(1).join(" ") ||
        "Unknown";

       
      const existingIdentity = await prisma.user.findUnique({
        where: {
          microsoftTenantId_microsoftObjectId: {
            microsoftTenantId: tenantId,
            microsoftObjectId: objectId,
          },
        },
      });

      if (existingIdentity) {
        if (user.image) {
    await prisma.user.update({
      where: {
        microsoftTenantId_microsoftObjectId: {
          microsoftTenantId: tenantId,
          microsoftObjectId: objectId,
        },
      },
      data: {
        image: user.image,
      },
    });
  }
        // The immutable Microsoft identity is already linked.
        // Do not change administrator-assigned application data here.
        return true;
      }

      // Never link a different Microsoft identity to an existing
      // application account based only on matching email addresses.
      const existingEmail = await prisma.user.findUnique({
        where: { email },
      });

      if (existingEmail) {
        return false;
      }

      await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          microsoftTenantId: tenantId,
          microsoftObjectId: objectId,
          role: null,
          image: user.image ?? null,
        },
      });

      return true;
    },

    async jwt({ token, account, profile, user }) {
  // Runs when the user first signs in.
  if (account && user) {
    if (
      account.provider === "admin-credentials" ||
      account.provider === "test-credentials"
    ) {
      const userId = Number(user.id);

      if (Number.isSafeInteger(userId) && userId > 0) {
        token.userId = userId;
      }
    }

    if (account.provider === "microsoft-entra-id") {
      const microsoftProfile = profile as
        | { oid?: string; tid?: string }
        | undefined;

      if (microsoftProfile?.oid && microsoftProfile.tid) {
        const dbUser = await prisma.user.findUnique({
          where: {
            microsoftTenantId_microsoftObjectId: {
              microsoftTenantId: microsoftProfile.tid,
              microsoftObjectId: microsoftProfile.oid,
            },
          },
          select: { id: true },
        });

        if (dbUser) {
          token.userId = dbUser.id;
        }
      }
    }
  }

  return token;
},

    async session({ session, token }) {
      if (session.user && typeof token.userId === "number") {
        session.user.id = String(token.userId);
      }

      return session;
    },
    authorized({ auth }) {
    return !!auth;
  },
  },
});
