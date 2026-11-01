"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import * as Ably from "ably";
import { toast } from "sonner";

import type { AppDispatch } from "@/redux/store";
import { ApiSlice } from "@/redux/services/apiSlice";
interface AppNotification {
  id: number;
  type: "APPOINTMENT_SCHEDULED" | "APPOINTMENT_CANCELLED";
  title: string;
  message: string;
  isRead: boolean;
  appointmentId: number | null;
  createdAt: string;
}

interface AblyNotificationsProviderProps {
  userId: number | null;
  children: React.ReactNode;
}

export default function AblyNotificationsProvider({
  userId,
  children,
}: AblyNotificationsProviderProps) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!userId) return;

    // Establish the Ably connection
    const realtime = new Ably.Realtime({
      authUrl: "/api/ably/token",
    });

    // Subscribe to this user's private channel
    const channel = realtime.channels.get(`user:${userId}`);

    const handleNotification = (message: Ably.Message) => {
      const notification = message.data as AppNotification;

      // Display a toast
      toast(notification.title, {
        description: notification.message,
      });

      // Refresh notification queries in RTK Query
      dispatch(
        ApiSlice.util.invalidateTags(["Notifications"])
      );
    };

    channel.subscribe("notification", handleNotification);

    realtime.connection.on("failed", (stateChange) => {
      console.error("Ably connection failed:", stateChange.reason);
    });

    return () => {
      channel.unsubscribe("notification", handleNotification);
      // realtime.close();
    };
  }, [userId, dispatch]);

  return <>{children}</>;
}