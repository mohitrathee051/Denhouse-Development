"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";
import {
  contactFormSchema,
  serviceOptions,
  type ContactFormValues,
} from "@/lib/validations/contact";

interface ContactFormProps {
  defaultService?: ContactFormValues["service"];
  defaultSubject?: string;
}

type SubmitState = "idle" | "success" | "error";

export function ContactForm({ defaultService = "GENERAL_INQUIRY", defaultSubject = "" }: ContactFormProps) {
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
  const [status, setStatus] = useState<SubmitState>("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: defaultSubject,
      service: defaultService,
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    if (!endpoint) {
      setStatus("error");
      return;
    }
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(values),
      });
      if (!response.ok) throw new Error(`Formspree responded ${response.status}`);
      setStatus("success");
      reset();
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="rounded-card border border-emerald-200 bg-emerald-50 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" aria-hidden />
        <h2 className="mt-4 font-heading text-2xl font-semibold text-ink">Thank you — message sent.</h2>
        <p className="mt-2 text-muted">The Denhouse Group team will get back to you shortly.</p>
        <Button variant="outline" className="mt-6" onClick={() => setStatus("idle")}>
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      {status === "error" && (
        <div role="alert" className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {endpoint
            ? "We couldn't send your message. Please check your connection and try again."
            : "The contact form is not configured yet (missing NEXT_PUBLIC_FORMSPREE_ENDPOINT)."}
        </div>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Name" autoComplete="name" error={errors.name?.message} {...register("name")} />
        <Input label="Email" type="email" autoComplete="email" error={errors.email?.message} {...register("email")} />
        <Input label="Phone (optional)" type="tel" autoComplete="tel" error={errors.phone?.message} {...register("phone")} />
        <Select label="Service" options={serviceOptions} error={errors.service?.message} {...register("service")} />
      </div>
      <Input label="Subject (optional)" error={errors.subject?.message} {...register("subject")} />
      <Textarea label="Message" error={errors.message?.message} {...register("message")} />
      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting ? "Sending…" : "Contact Denhouse"}
      </Button>
    </form>
  );
}
