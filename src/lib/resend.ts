import { Resend } from "resend";

let client: Resend | null = null;

/** Lazily construct the Resend client so a missing RESEND_API_KEY never
 *  crashes a route at import time — the error surfaces at send time, where
 *  sendEmail() already catches it. */
export function getResend(): Resend {
  if (!client) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) throw new Error("RESEND_API_KEY is not set");
    client = new Resend(apiKey);
  }
  return client;
}
