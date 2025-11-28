import { Resend } from "resend";
import { render } from "@react-email/render";
import WaitlistWelcomeEmail from "@/emails/waitlist-welcome";

export interface SendWaitlistWelcomeEmailParams {
  email: string;
  position?: number;
}

export async function sendWaitlistWelcomeEmail({
  email,
  position,
}: SendWaitlistWelcomeEmailParams) {
  try {
    // Check if Resend is configured
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn("RESEND_API_KEY not configured, skipping email send");
      return { success: false, message: "Email service not configured" };
    }

    // Initialize Resend with the API key (do this per request to ensure env vars are loaded)
    const resend = new Resend(apiKey);

    // Render the email template
    const emailHtml = await render(WaitlistWelcomeEmail({ email, position }));

    console.log("Attempting to send email to:", email);
    console.log("Using API key:", apiKey.substring(0, 10) + "...");

    // Send the email
    const result = await resend.emails.send({
      from: "HandyPay <hello@tryhandypay.com>",
      to: [email],
      subject: "Thanks for joining the HandyPay waitlist",
      html: emailHtml,
    });

    console.log("Resend API response:", JSON.stringify(result, null, 2));

    if (result.error) {
      console.error("Error sending waitlist email:", {
        name: result.error.name,
        message: result.error.message,
        statusCode: result.error.statusCode,
        fullError: JSON.stringify(result.error)
      });
      return { success: false, message: result.error.message };
    }

    console.log("Waitlist email sent successfully:", result.data?.id);
    return { success: true, data: result.data };
  } catch (error) {
    console.error("Error in sendWaitlistWelcomeEmail:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
