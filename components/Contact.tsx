"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail, Phone } from "lucide-react";
import { SiInstagram, SiWhatsapp } from "@icons-pack/react-simple-icons";
import { SITE } from "@/lib/site-config";

type Status = "idle" | "submitting" | "success" | "error";

// Web3Forms access key is meant to be public (it's rate-limited and
// domain-scoped on their end, not a secret) — see AGENTS.md "Content status".
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

export default function Contact() {
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange =
    (field: keyof typeof values) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setValues((prev) => ({ ...prev, [field]: event.target.value }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    if (!WEB3FORMS_ACCESS_KEY) {
      setStatus("error");
      setErrorMessage("Email sending isn't configured yet. Please call or WhatsApp us instead.");
      return;
    }

    try {
      // FormData (not a raw JSON body) so this is a CORS "simple request" —
      // Web3Forms doesn't reliably handle the preflight a JSON body triggers.
      const formData = new FormData();
      formData.append("access_key", WEB3FORMS_ACCESS_KEY);
      formData.append("subject", `New quote request from ${values.name}`);
      formData.append("from_name", "FabiDecor Website");
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("message", values.message);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      }).catch(() => {
        // Network/CORS-level failure — fetch throws a raw, unhelpful
        // "Failed to fetch" TypeError here, so replace it with something a
        // visitor can actually act on.
        throw new Error("Couldn't reach the server. Please try WhatsApp or phone instead.");
      });

      const data = await response.json().catch(() => null);
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || "Something went wrong. Please try again.");
      }

      setStatus("success");
      setValues({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  };

  const inputClassName =
    "w-full rounded-sm border border-border px-4 py-3 text-base text-text placeholder:text-text-muted/70 focus:border-primary focus:outline-none disabled:opacity-60";

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

      <div className="flex w-full max-w-lg flex-col items-stretch rounded-lg bg-white p-10 shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
        {status === "success" ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <CheckCircle2 className="h-12 w-12 text-accent-green" />
            <h3 className="font-heading text-2xl font-bold text-text">Message sent!</h3>
            <p className="text-text-muted">
              Thanks — we&apos;ll get back to you within a day with a free quote.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-2 font-semibold text-secondary hover:opacity-80"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col items-stretch gap-5">
            <h3 className="font-heading text-2xl font-bold text-text">Request a Free Quote</h3>

            <label className="flex flex-col items-stretch gap-1.5">
              <span className="text-sm font-medium text-text-muted">Name</span>
              <input
                type="text"
                required
                disabled={status === "submitting"}
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
                  disabled={status === "submitting"}
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
                  disabled={status === "submitting"}
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
                disabled={status === "submitting"}
                placeholder="Tell us a bit about the job — property type, rooms or areas, and timing."
                value={values.message}
                onChange={handleChange("message")}
                className={`${inputClassName} resize-none`}
              />
            </label>

            {status === "error" && (
              <p className="text-sm font-medium text-accent-red">{errorMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-1 flex h-12 items-center justify-center rounded-sm bg-secondary font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Send Message"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
