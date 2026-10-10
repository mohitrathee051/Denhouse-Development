import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Den House Group handles information submitted through this website.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="container-page max-w-3xl py-12">
      <h1 className="font-heading text-3xl font-semibold text-ink">Privacy Policy</h1>
      <p className="mt-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
        Template text — have this reviewed by a qualified professional and adapt it to Den House Group&apos;s actual practices before launch.
      </p>
      <div className="prose mt-8 max-w-none text-ink/80">
        <h2>Information we collect</h2>
        <p>When you use our contact form we collect the details you submit: name, email, phone number and your message.</p>
        <h2>How it is delivered</h2>
        <p>Contact form submissions are sent to our configured business inbox using Resend, a transactional email service.</p>
        <h2>How we use it</h2>
        <p>We use your details only to respond to your enquiry.</p>
        <h2>Contact</h2>
        <p>Questions about this policy can be sent through our contact page.</p>
      </div>
    </div>
  );
}
