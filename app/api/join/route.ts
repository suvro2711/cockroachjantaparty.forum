import { NextResponse } from "next/server";
import { verifyChallenge } from "@/lib/captcha";

type JoinPayload = {
  name?: string;
  phone?: string;
  ami_artist?: boolean;
  from_kolkata?: boolean;
  website?: string; // honeypot — bots fill this
  captcha_answer?: string;
  captcha_token?: string;
};

const PHONE_RE = /^[0-9+\-\s]{7,15}$/;

/**
 * Forward a member sign-up to a Google Form.
 *
 * Env vars (in .env.local):
 *   GOOGLE_FORM_ID                — the form's ID from its live URL
 *   GOOGLE_FORM_ENTRY_NAME        — entry.<id> for the Name field         (required)
 *   GOOGLE_FORM_ENTRY_PHONE       — entry.<id> for the Mobile field       (required)
 *   GOOGLE_FORM_ENTRY_ARTIST      — entry.<id> for the "Ami artist" field (optional)
 *   GOOGLE_FORM_ENTRY_KOLKATA     — entry.<id> for the "From Kolkata" fld (optional)
 */
async function postToGoogleForm(data: {
  name: string;
  phone: string;
  ami_artist: boolean;
  from_kolkata: boolean;
}): Promise<boolean> {
  const formId = process.env.GOOGLE_FORM_ID;
  const nameEntry = process.env.GOOGLE_FORM_ENTRY_NAME;
  const phoneEntry = process.env.GOOGLE_FORM_ENTRY_PHONE;
  const artistEntry = process.env.GOOGLE_FORM_ENTRY_ARTIST;
  const kolkataEntry = process.env.GOOGLE_FORM_ENTRY_KOLKATA;

  if (!formId || !nameEntry || !phoneEntry) {
    console.warn(
      "[join] Google Form env vars not set — submission was NOT forwarded.",
    );
    return false;
  }

  const url = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
  const body = new URLSearchParams();
  body.set(nameEntry, data.name);
  body.set(phoneEntry, data.phone);
  if (artistEntry) body.set(artistEntry, data.ami_artist ? "Yes" : "No");
  if (kolkataEntry) body.set(kolkataEntry, data.from_kolkata ? "Yes" : "No");

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    redirect: "manual",
  });

  return res.ok || res.status === 302 || res.status === 0;
}

export async function POST(req: Request) {
  let body: JoinPayload = {};
  try {
    body = (await req.json()) as JoinPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Could not read the form. Please try again." },
      { status: 400 },
    );
  }

  // Honeypot — silently accept and discard if filled.
  if (body.website && String(body.website).trim() !== "") {
    return NextResponse.json({
      ok: true,
      message: "Thank you — you are on the register.",
    });
  }

  const name = body.name?.trim();
  const phone = body.phone?.trim();

  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, message: "Name and mobile number are both required." },
      { status: 400 },
    );
  }
  if (!PHONE_RE.test(phone)) {
    return NextResponse.json(
      { ok: false, message: "Please enter a valid mobile number." },
      { status: 400 },
    );
  }

  if (
    !verifyChallenge(
      String(body.captcha_answer ?? ""),
      String(body.captcha_token ?? ""),
    )
  ) {
    return NextResponse.json(
      {
        ok: false,
        message:
          "The bot-check answer was wrong or expired. Please try again.",
      },
      { status: 400 },
    );
  }

  const payload = {
    name,
    phone,
    ami_artist: Boolean(body.ami_artist),
    from_kolkata: Boolean(body.from_kolkata),
  };

  try {
    const forwarded = await postToGoogleForm(payload);
    if (!forwarded) {
      console.log("[join · local only]", {
        at: new Date().toISOString(),
        ...payload,
      });
    }
  } catch (err) {
    console.error("[join] Google Form forward failed:", err);
    return NextResponse.json(
      {
        ok: false,
        message: "Something went wrong saving your details. Please try again.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({
    ok: true,
    message: `Welcome, ${name}. You are now on the member register — we will be in touch about meetings and the next cleaning drive.`,
  });
}
