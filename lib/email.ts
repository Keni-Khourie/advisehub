
import "server-only";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const from = process.env.EMAIL_FROM;

interface AppointmentConfirmationEmail {
  to: string;
  recipientName: string;
  otherPersonName: string;
  appointmentDate: string;
  timeZone: string;
  specialization: string;
}

export async function sendAppointmentConfirmationEmail({
  to,
  recipientName,
  otherPersonName,
  appointmentDate,
  timeZone,
  specialization,
}: AppointmentConfirmationEmail) {
  if (!process.env.RESEND_API_KEY || !from) {
    throw new Error("Email environment variables are missing.");
  }

  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone,
  }).format(new Date(appointmentDate));

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: "Your AdviseHub appointment is confirmed",
    text: [
      `Hello ${recipientName},`,
      "",
      "Your AdviseHub appointment has been booked successfully.",
      "",
      `With: ${otherPersonName}`,
      `Date: ${formattedDate} (${timeZone})`,
      `Reason: ${specialization}`,
      "",
      "Please sign in to AdviseHub to view your appointment details.",
    ].join("\n"),
  });

  if (error) {
    throw new Error(`Failed to send confirmation email: ${error.message}`);
  }

  return data;
}


export async function sendAppointmentCancellationEmail({
  to,
  recipientName,
  otherPersonName,
  appointmentDate,
  timeZone,
  specialization,
}: AppointmentConfirmationEmail) {
  if (!process.env.RESEND_API_KEY || !from) {
    throw new Error("Email environment variables are missing.");
  }

  const formattedDate = new Intl.DateTimeFormat("en", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone,
  }).format(new Date(appointmentDate));

  const { data, error } = await resend.emails.send({
    from,
    to,
    subject: "Your AdviseHub appointment has been cancelled",
    text: [
      `Hello ${recipientName},`,
      "",
      "This is a confirmation that the following AdviseHub appointment has been cancelled.",
      "",
      `With: ${otherPersonName}`,
      `Date: ${formattedDate} (${timeZone})`,
      `Specialization: ${specialization}`,
      "",
      "Please sign in to AdviseHub if you need to arrange another appointment.",
    ].join("\n"),
  });

  if (error) {
    throw new Error(`Failed to send cancellation email: ${error.message}`);
  }

  return data;
}

