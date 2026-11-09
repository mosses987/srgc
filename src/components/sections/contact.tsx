import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { z } from "zod";
import { ArrowRight, Check, Phone } from "lucide-react";

import { EMAIL, PHONE_DISPLAY, PHONE_HREF, SectionHead } from "./shared";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z
    .string()
    .trim()
    .max(30)
    .regex(/^[0-9+()\-.\s]*$/, "Please enter a valid phone number"),
  service: z
    .string({ required_error: "Please choose a service" })
    .min(1, "Please choose a service"),
  message: z.string().trim().min(1, "Please add a short message").max(1500),
});
type Values = z.infer<typeof schema>;
type Status = "idle" | "sending" | "ready" | "sent" | "error";

const FORM_KEY = import.meta.env["VITE_WEB3FORMS_KEY"] as string | undefined;

const FIELD_ORDER = ["name", "email", "phone", "service", "message"] as const;

function buildMailto(v: Values) {
  const body = `Name: ${v.name}\nEmail: ${v.email}\nPhone: ${v.phone}\nService: ${v.service}\n\n${v.message}`;
  return {
    body,
    href: `mailto:${EMAIL}?subject=${encodeURIComponent(`Quote request - ${v.service}`)}&body=${encodeURIComponent(body)}`,
  };
}

export function Contact() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [sent, setSent] = useState<{ href: string; body: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => {
        const k = String(i.path[0]);
        if (!errs[k]) errs[k] = i.message;
      });
      setErrors(errs);
      setStatus("idle");
      const firstBad = FIELD_ORDER.find((k) => errs[k]);
      if (firstBad) form.current?.querySelector<HTMLElement>(`#${firstBad}`)?.focus();
      return;
    }
    setErrors({});
    setStatus("sending");
    const mail = buildMailto(r.data);
    if (FORM_KEY) {
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: FORM_KEY,
          subject: `Quote request - ${r.data.service}`,
          from_name: "SRGC website",
          name: r.data.name,
          email: r.data.email,
          phone: r.data.phone,
          service: r.data.service,
          message: r.data.message,
        }),
      })
        .then((res) => res.json())
        .then((json: { success?: boolean }) => {
          setSent(mail);
          setStatus(json.success ? "sent" : "error");
        })
        .catch(() => {
          setSent(mail);
          setStatus("error");
        })
        .finally(() => window.setTimeout(() => resultRef.current?.focus(), 50));
      return;
    }
    window.setTimeout(() => {
      try {
        window.location.href = mail.href;
        setSent(mail);
        setStatus("ready");
        window.setTimeout(() => resultRef.current?.focus(), 50);
      } catch {
        setSent(mail);
        setStatus("error");
        window.setTimeout(() => resultRef.current?.focus(), 50);
      }
    }, 650);
  }

  async function copy() {
    if (!sent) return;
    try {
      await navigator.clipboard.writeText(`To: ${EMAIL}\n\n${sent.body}`);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      setCopied(false);
    }
  }

  function reset() {
    form.current?.reset();
    setSent(null);
    setStatus("idle");
    setErrors({});
  }

  const field =
    "mt-2 w-full rounded-sm border border-input bg-card px-4 py-3 text-base text-foreground outline-none transition-colors focus:border-accent focus:ring-2 focus:ring-ring/40 aria-[invalid=true]:border-destructive aria-[invalid=true]:ring-2 aria-[invalid=true]:ring-destructive/25";
  const done = status === "ready" || status === "sent" || status === "error";
  const errorCount = Object.keys(errors).length;

  return (
    <section id="contact" className="bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-[90rem] gap-16 px-5 md:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <SectionHead reveal={false} eyebrow="Contact" title="Let's Build Something Together.">
            Tell us about your project and we'll get back to you to discuss scope and next steps.
          </SectionHead>
          <ul className="mt-12 space-y-8">
            <ContactRow label="Contact">Berat Sorguc · SRGC Developments Ltd</ContactRow>
            <ContactRow label="Phone">
              <a
                href={PHONE_HREF}
                className="font-display text-3xl font-extrabold text-navy underline decoration-accent decoration-2 underline-offset-8 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring md:text-4xl"
              >
                {PHONE_DISPLAY}
              </a>
            </ContactRow>
            <ContactRow label="Email">
              <a
                href={`mailto:${EMAIL}`}
                className="break-all underline decoration-accent decoration-2 underline-offset-4 hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
              >
                {EMAIL}
              </a>
            </ContactRow>
            <ContactRow label="Service area">Ontario, Canada</ContactRow>
          </ul>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          {done && sent ? (
            <div
              ref={resultRef}
              tabIndex={-1}
              role={status === "error" ? "alert" : "status"}
              className="rounded-sm bg-navy p-8 text-navy-foreground outline-none md:p-12"
            >
              <span className="grid h-12 w-12 place-items-center rounded-full bg-steel text-navy">
                <Check className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-6 text-3xl font-bold md:text-4xl">
                {status === "sent"
                  ? "Thank you. Your request has been sent"
                  : status === "ready"
                    ? "Your quote request is ready to send"
                    : FORM_KEY
                      ? "We couldn't send your request"
                      : "We couldn't open your email app"}
              </h3>
              <p className="mt-4 max-w-[46ch] text-lg leading-relaxed">
                {status === "sent"
                  ? `We'll be in touch soon. If it's urgent, call us on ${PHONE_DISPLAY}.`
                  : status === "ready"
                    ? "Your email app should now be open with your details filled in. Press send there to finish. Nothing is sent until you do."
                    : `Nothing was sent. Copy your message and email it to ${EMAIL}, or call us on ${PHONE_DISPLAY}.`}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {status !== "sent" && (
                  <button
                    type="button"
                    onClick={copy}
                    className="inline-flex items-center justify-center rounded-sm bg-navy-foreground px-6 py-4 text-sm font-bold text-navy transition-colors hover:bg-steel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel"
                  >
                    {copied ? "Copied to clipboard" : "Copy my message"}
                  </button>
                )}
                {status !== "sent" && (
                  <a
                    href={sent.href}
                    className="inline-flex items-center justify-center rounded-sm bg-primary px-6 py-4 text-sm font-bold text-primary-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel"
                  >
                    Open email again
                  </a>
                )}
                <a
                  href={PHONE_HREF}
                  className="inline-flex items-center justify-center gap-2 rounded-sm px-4 py-4 text-sm font-bold underline decoration-steel decoration-2 underline-offset-8 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-steel"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" /> Call instead
                </a>
              </div>
              <button
                type="button"
                onClick={reset}
                className="mt-8 text-sm font-bold text-steel underline underline-offset-8 hover:text-navy-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-steel"
              >
                Start a new request
              </button>
            </div>
          ) : (
            <form
              ref={form}
              onSubmit={onSubmit}
              noValidate
              className="rounded-sm bg-secondary p-7 md:p-10"
              aria-busy={status === "sending"}
            >
              <h3 className="text-3xl font-bold text-navy">Request a Quote</h3>
              {errorCount > 0 && (
                <p
                  role="alert"
                  className="mt-5 rounded-sm bg-destructive/10 px-4 py-3 text-base font-semibold text-destructive"
                >
                  Please fix {errorCount === 1 ? "1 field" : `${errorCount} fields`} below.
                </p>
              )}
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Field label="Name" name="name" error={errors["name"]}>
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    className={field}
                    aria-invalid={!!errors["name"]}
                    aria-describedby={errors["name"] ? "name-err" : undefined}
                  />
                </Field>
                <Field label="Email" name="email" error={errors["email"]}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={field}
                    aria-invalid={!!errors["email"]}
                    aria-describedby={errors["email"] ? "email-err" : undefined}
                  />
                </Field>
                <Field label="Phone" name="phone" error={errors["phone"]}>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={field}
                    aria-invalid={!!errors["phone"]}
                    aria-describedby={errors["phone"] ? "phone-err" : undefined}
                  />
                </Field>
                <Field label="Service Required" name="service" error={errors["service"]}>
                  <select
                    id="service"
                    name="service"
                    defaultValue=""
                    className={field}
                    aria-invalid={!!errors["service"]}
                    aria-describedby={errors["service"] ? "service-err" : undefined}
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {["Stucco", "EIFS", "Siding", "Drywall", "Multiple / Not sure"].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </Field>
                <div className="sm:col-span-2">
                  <Field label="Message" name="message" error={errors["message"]}>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      className={field}
                      aria-invalid={!!errors["message"]}
                      aria-describedby={errors["message"] ? "message-err" : undefined}
                    />
                  </Field>
                </div>
              </div>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group mt-7 inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-4 font-bold text-primary-foreground transition-colors hover:bg-navy active:translate-y-px disabled:cursor-wait disabled:bg-navy focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {status === "sending" ? (
                  <>
                    <span
                      className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground"
                      aria-hidden="true"
                    />
                    {FORM_KEY ? "Sending your request" : "Preparing your email"}
                  </>
                ) : (
                  <>
                    Request a Quote{" "}
                    <ArrowRight
                      className="h-4 w-4 transition-transform group-hover:translate-x-1"
                      aria-hidden="true"
                    />
                  </>
                )}
              </button>
              <p className="mt-4 text-sm text-foreground">
                {FORM_KEY
                  ? "Your details are sent straight to our team. We never share them."
                  : `This opens your email app with your details filled in, ready to send to ${EMAIL}.`}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  error,
  children,
}: {
  label: string;
  name: string;
  error?: string | undefined;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={name} className="text-base font-semibold text-navy">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${name}-err`} className="mt-1.5 text-sm font-semibold text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <li>
      <p className="text-sm font-bold text-primary">{label}</p>
      <p className="mt-1 text-xl font-semibold text-navy">{children}</p>
    </li>
  );
}
