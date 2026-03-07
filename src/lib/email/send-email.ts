import { resend } from "@/lib/resend";
import type { ReactElement } from "react";

type SendEmailParams = {
  to: string;
  subject: string;
  from?: string;
  react?: ReactElement;
  text?: string;
  html?: string;
};

export async function sendEmail({ to, subject, from, react, text, html }: SendEmailParams) {
  try {
    const sender = from ?? process.env.EMAIL_FROM ?? "Pro Court Surfaces <quotes@procourtsurfaces.com>";

    let result;

    if (html) {
      // Minimal HTML (e.g. plain text with hyperlinks)
      result = await resend.emails.send({
        from: sender,
        to,
        subject,
        html,
      });
    } else if (text && !react) {
      // Pure plain text — no HTML at all
      result = await resend.emails.send({
        from: sender,
        to,
        subject,
        text,
      });
    } else if (react) {
      result = await resend.emails.send({
        from: sender,
        to,
        subject,
        react,
      });
    } else {
      throw new Error("Either text, html, or react must be provided");
    }

    if (result.error) {
      console.error("[sendEmail] Resend error:", result.error.message);
      return { success: false, error: result.error.message };
    }

    console.log("[sendEmail] Sent:", result.data?.id, "to:", to);
    return { success: true, id: result.data?.id };
  } catch (err) {
    console.error("[sendEmail] Unexpected error:", err instanceof Error ? err.message : err);
    return { success: false, error: "Failed to send email" };
  }
}
