"use client";

import { useEffect, useState } from "react";

type Status = "idle" | "submitting" | "ok" | "error";
type Challenge = { question: string; token: string };
const MEMBER_COUNT_PLACEHOLDER = "10,000+";

export default function JoinForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [isMember, setIsMember] = useState(false);
  let submitLabel = "Become a member";
  if (status === "submitting") {
    submitLabel = "Submitting…";
  } else if (isMember) {
    submitLabel = "You are a member";
  }

  async function loadChallenge() {
    try {
      const res = await fetch("/api/captcha", { cache: "no-store" });
      const json = (await res.json()) as Challenge;
      setChallenge(json);
    } catch {
      setChallenge(null);
    }
  }

  useEffect(() => {
    loadChallenge();

    try {
      setIsMember(localStorage.getItem("is_member") === "yes");
    } catch {
      setIsMember(false);
    }
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setMessage("");

    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: fd.get("name"),
      phone: fd.get("phone"),
      ami_artist: fd.get("ami_artist") === "on",
      from_kolkata: fd.get("from_kolkata") === "on",
      website: fd.get("website"), // honeypot
      captcha_answer: fd.get("captcha_answer"),
      captcha_token: challenge?.token ?? "",
    };

    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok: boolean; message: string };
      setStatus(json.ok ? "ok" : "error");
      setMessage(json.message);
      if (json.ok) {
        form.reset();
        try {
          localStorage.setItem("is_member", "yes");
        } catch {
          // Ignore storage failures and keep UI responsive.
        }
        setIsMember(true);
      }
      // Always rotate the captcha after a submit (success or fail)
      loadChallenge();
    } catch {
      setStatus("error");
      setMessage("Could not reach the server. Please try again.");
      loadChallenge();
    }
  }

  if (isMember) {
    return (
      <section className="relative flex min-h-[22rem] items-center justify-center overflow-hidden rounded-2xl bg-bone p-6 text-ink shadow-xl md:p-8">
        <div className="relative flex flex-col items-center gap-4 text-center">
          <img
            src="/logo-transparent.png"
            alt="Arshola Janata Party logo"
            className="h-32 w-32 object-contain md:h-40 md:w-40"
          />
          <div className="rounded-lg border border-ink/15 bg-white/75 px-4 py-2">
            <p className="text-xs font-semibold uppercase tracking-widest text-alta">
              Member count
            </p>
            <p className="mt-1 font-display text-2xl font-bold text-ink">
              {MEMBER_COUNT_PLACEHOLDER}
            </p>
          </div>
          <h3 className="font-display text-2xl font-bold text-ink">
            You are part of the crowd now.
          </h3>
          <p className="max-w-sm text-sm text-ink/70">
            Thank you for joining. We will keep you updated on local meetings,
            cleaning drives, and action alerts.
          </p>
        </div>
      </section>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-bone p-6 text-ink shadow-xl md:p-8"
    >
      <div className="grid gap-4">
        <div className="rounded-lg border border-ink/15 bg-white/75 px-4 py-3 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-alta">
            Member count
          </p>
          <p className="mt-1 font-display text-2xl font-bold text-ink">
            {MEMBER_COUNT_PLACEHOLDER}
          </p>
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">
            Full name · নাম
          </span>
          <input
            name="name"
            required
            autoComplete="name"
            placeholder="As you would like it on the register"
            className="field"
          />
        </label>

        <label className="block">
          <span className="mb-1 block text-sm font-semibold">
            Mobile number · মোবাইল নম্বর
          </span>
          <input
            name="phone"
            required
            inputMode="tel"
            pattern="^[0-9+\-\s]{7,15}$"
            autoComplete="tel"
            placeholder="10-digit mobile number"
            className="field"
          />
          <span className="mt-1 block text-xs text-ink/60">
            We will only use this to send meeting and action alerts.
          </span>
        </label>

        <fieldset className="rounded-lg border border-ink/15 bg-white/70 p-4">
          <legend className="px-2 text-xs font-semibold uppercase tracking-widest text-alta">
            About you (optional)
          </legend>
          <label className="mt-1 flex items-start gap-2 text-sm">
            <input type="checkbox" name="ami_artist" className="mt-1" />
            <span>
              <strong>Ami artist</strong> — I write, sing, paint, perform, film
              or otherwise make work that could use a platform.
            </span>
          </label>
          <label className="mt-3 flex items-start gap-2 text-sm">
            <input type="checkbox" name="from_kolkata" className="mt-1" />
            <span>
              <strong>I am from Kolkata</strong> — happy to join local meetups
              and cleaning drives in the city.
            </span>
          </label>
        </fieldset>

        {/* Honeypot: hidden from humans, often filled by bots */}
        <div aria-hidden="true" className="hidden">
          <label>
            <span>Website</span>{" "}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>

        <div className="rounded-lg border border-ink/15 bg-white/70 p-4">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-widest text-alta">
              Quick check — not a bot
            </span>
            <span className="mb-2 block text-sm font-medium text-ink">
              {challenge ? challenge.question : "Loading…"}
            </span>
            <input
              name="captcha_answer"
              required
              inputMode="numeric"
              pattern="^[0-9]{1,3}$"
              placeholder="Your answer"
              className="field"
              autoComplete="off"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={status === "submitting" || !challenge}
          className="btn-primary mt-2 w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitLabel}
        </button>

        {status === "ok" && (
          <p className="rounded-md bg-moss/10 p-3 text-sm text-moss">
            {message}
          </p>
        )}
        {status === "error" && (
          <p className="rounded-md bg-sindoor/10 p-3 text-sm text-sindoor">
            {message}
          </p>
        )}

        <p className="text-xs text-ink/50">
          By submitting, you agree to be contacted about Arshola Janata Party
          activities. Your details are stored privately and never sold.
        </p>
      </div>
    </form>
  );
}
