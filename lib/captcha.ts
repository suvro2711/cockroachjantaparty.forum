import crypto from "crypto";

const SECRET =
  process.env.CAPTCHA_SECRET ||
  "ajp-dev-captcha-secret-please-set-CAPTCHA_SECRET-in-env-local";
const TTL_MS = 10 * 60 * 1000; // 10 minutes

function sign(payload: string): string {
  return crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
}

export type Challenge = {
  question: string;
  token: string;
};

export function createChallenge(): Challenge {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  const answer = a + b;
  const expires = Date.now() + TTL_MS;
  const sig = sign(`${answer}:${expires}`);
  return {
    question: `What is ${a} + ${b}?`,
    token: `${expires}.${sig}`,
  };
}

export function verifyChallenge(answer: string, token: string): boolean {
  if (!answer || !token) return false;
  const idx = token.indexOf(".");
  if (idx < 0) return false;
  const expiresStr = token.slice(0, idx);
  const sig = token.slice(idx + 1);
  const expires = Number(expiresStr);
  if (!Number.isFinite(expires) || Date.now() > expires) return false;
  const expected = sign(`${answer.trim()}:${expires}`);
  if (expected.length !== sig.length) return false;
  try {
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
  } catch {
    return false;
  }
}
