import { resend } from "@/lib/resend";
import type { ReactElement } from "react";

type SendEmailParams = {
  to: string;
  subject: string;
  react?: ReactElement;
  text?: string;
};

export async function sendEmail({ to, subject, react, text }: SendEmailParams) {
  try {
    const payload: Record<string, unknown> = {
      from: process.env.EMAIL_FROM ?? "Pro Court Surfaces <quotes@procourtsurfaces.com>",
      to,
      subject,
    };

    if (text) {
      payload.text = text;
    } else if (react) {
      payload.react = react;
    }

    const { data, error } = await resend.emails.send(payload as Parameters<typeof resend.emails.send>[0]);

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
