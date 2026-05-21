import { NextResponse } from "next/server";
import { createChallenge } from "@/lib/captcha";

export const dynamic = "force-dynamic";

export async function GET() {
  const challenge = createChallenge();
  return NextResponse.json(challenge, {
    headers: { "Cache-Control": "no-store" },
  });
}
