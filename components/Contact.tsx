"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone } from "lucide-react";
import { SiInstagram, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { SITE } from "@/lib/site-config";

/**
 * There's no backend wired up yet, so submitting builds a mailto: link
 * pre-filled with the form values and hands off to the visitor's mail
 * client. Swap this for a real API route / form service later — see
 * AGENTS.md "Content status" for the todo.
 */
function buildMailtoHref(values: { name: string; email: string; phone: string; message: string }) {
  const subject = `Free quote request from ${values.name || "website visitor"}`;
  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Phone: ${values.phone}`,
    "",
    values.message,
  ].join("\n");
  const params = new URLSearchParams({ subject, body });
  return `${SITE.emailHref}?${params.toString()}`;
}

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });

  const handleChange =
    (field: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.location.href = buildMailtoHref(values);
  };

  const inputClassName =
    "w-full rounded-sm border border-border px-4 py-3 text-base text-text placeholder:text-text-muted/70 focus:border-primary focus:outline-none";

  return (
    <section
      id="contact"
      className="scroll-mt-20 flex w-full flex-col items-start gap-16 bg-primary-dark px-6 py-24 md:flex-row md:justify-between md:px-16 md:py-28"
    >
      <div className="flex w-full max-w-xl flex-col items-start gap-5">
        <span className="rounded-full bg-white/12 px-3.5 py-1.5 text-sm font-semibold text-white">
          Get In Touch
        </span>
        <h2 className="font-heading text-4xl font-extrabold leading-tight tracking-tight text-white">
          Let&apos;s talk about your project
        </h2>
        <p className="text-lg leading-relaxed text-[#B9C3D6]">
          Send us a few details and we&apos;ll get back to you with a free,
          no-obligation quote — usually within a day.
        </p>

        <div className="mt-3 flex flex-col items-start gap-4">
          <a href={SITE.emailHref} className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-orange">
              <Mail className="h-5 w-5 text-white" />
            </span>
            <span className="font-medium text-white">{SITE.email}</span>
          </a>

          <a href={SITE.phoneHref} className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-teal">
              <Phone className="h-5 w-5 text-white" />
            </span>
            <span className="font-medium text-white">{SITE.phoneDisplay}</span>
          </a>

          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3.5"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-accent-green">
              <SiWhatsapp className="h-5 w-5 text-white" />
            </span>
            <span className="font-medium text-white">WhatsApp: {SITE.phoneDisplay}</span>
          </a>

          <a href={SITE.instagramHref} className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-instagram">
              <SiInstagram className="h-5 w-5 text-white" />
            </span>
            <span className="font-medium text-white">{SITE.instagramHandle}</span>
          </a>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-lg flex-col items-stretch gap-5 rounded-lg bg-white p-10 shadow-[0_24px_60px_rgba(0,0,0,0.28)]"
      >
        <h3 className="font-heading text-2xl font-bold text-text">Request a Free Quote</h3>

        <label className="flex flex-col items-stretch gap-1.5">
          <span className="text-sm font-medium text-text-muted">Name</span>
          <input
            type="text"
            required
            placeholder="Your name"
            value={values.name}
            onChange={handleChange("name")}
            className={inputClassName}
          />
        </label>

        <div className="flex flex-col gap-4 sm:flex-row">
          <label className="flex flex-1 flex-col items-stretch gap-1.5">
            <span className="text-sm font-medium text-text-muted">Email</span>
            <input
              type="email"
              required
              placeholder="you@email.com"
              value={values.email}
              onChange={handleChange("email")}
              className={inputClassName}
            />
          </label>
          <label className="flex flex-1 flex-col items-stretch gap-1.5">
            <span className="text-sm font-medium text-text-muted">Phone</span>
            <input
              type="tel"
              placeholder="021 234 5678"
              value={values.phone}
              onChange={handleChange("phone")}
              className={inputClassName}
            />
          </label>
        </div>

        <label className="flex flex-col items-stretch gap-1.5">
          <span className="text-sm font-medium text-text-muted">Message</span>
          <textarea
            required
            rows={4}
            placeholder="Tell us a bit about the job — property type, rooms or areas, and timing."
            value={values.message}
            onChange={handleChange("message")}
            className={`${inputClassName} resize-none`}
          />
        </label>

        <button
          type="submit"
          className="mt-1 flex h-12 items-center justify-center rounded-sm bg-secondary font-semibold text-white transition-opacity hover:opacity-90"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}
