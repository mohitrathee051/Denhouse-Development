import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactFormSchema, serviceOptions } from "@/lib/validations/contact";

export const runtime = "nodejs";

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character] ?? character;
  });
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!apiKey || !fromEmail || !toEmail) {
    return NextResponse.json(
      { error: "Contact email service is not configured." },
      { status: 503 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactFormSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form fields and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const values = parsed.data;
  const serviceLabel =
    serviceOptions.find((option) => option.value === values.service)?.label ?? values.service;
  const subject = values.subject || `${serviceLabel} enquiry from ${values.name}`;
  const safeMessage = escapeHtml(values.message).replace(/\n/g, "<br />");

  try {
    const { error } = await new Resend(apiKey).emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: values.email,
      subject,
      text: [
        `Name: ${values.name}`,
        `Email: ${values.email}`,
        `Phone: ${values.phone || "Not provided"}`,
        `Service: ${serviceLabel}`,
        `Subject: ${values.subject || "Not provided"}`,
        "",
        values.message,
      ].join("\n"),
      html: `
        <h2>New website enquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(values.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(values.email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(values.phone || "Not provided")}</p>
        <p><strong>Service:</strong> ${escapeHtml(serviceLabel)}</p>
        <p><strong>Subject:</strong> ${escapeHtml(values.subject || "Not provided")}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      `,
    });

    if (error) {
      console.error("Resend contact email error:", error);
      return NextResponse.json({ error: "Unable to send your message right now." }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact email request failed:", error);
    return NextResponse.json({ error: "Unable to send your message right now." }, { status: 502 });
  }
}
