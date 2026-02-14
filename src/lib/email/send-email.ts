import { resend } from "@/lib/resend";
import type { ReactElement } from "react";

type SendEmailParams = {
  to: string;
  subject: string;
  react: ReactElement;
};

export async function sendEmail({ to, subject, react }: SendEmailParams) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM ?? "quotes@procourtquotes.com",
      to,
      subject,
      react,
    });

    if (error) {
      console.error("[sendEmail] Resend error:", error.message);
      return { success: false, error: error.message };
    }

    console.log("[sendEmail] Sent:", data?.id, "to:", to);
    return { success: true, id: data?.id };
  } catch (err) {
    console.error("[sendEmail] Unexpected error:", err instanceof Error ? err.message : err);
    return { success: false, error: "Failed to send email" };
  }
}
