import "server-only";
import * as Ably from "ably";

export const getAbly = () => {
  const apiKey = process.env.ABLY_API_KEY;

  if (!apiKey) {
    throw new Error("ABLY_API_KEY is not configured.");
  }

  return new Ably.Rest(apiKey);
};

export async function publishNotification(
  userId: number,
  notification: {
    id: number;
    type: "APPOINTMENT_SCHEDULED" | "APPOINTMENT_CANCELLED";
    title: string;
    message: string;
    appointmentId: number | null;
    createdAt: Date;
  }
) {
  const ably = getAbly();

  await ably.channels
    .get(`user:${userId}`)
    .publish("notification", {
      ...notification,
      createdAt: notification.createdAt.toISOString(),
    });
}