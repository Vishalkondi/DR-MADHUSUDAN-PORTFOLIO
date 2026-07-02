import { NextResponse } from "next/server";
import { AI_SYSTEM_PROMPT } from "@/lib/data";

// POST /api/chat  — AI Health Assistant endpoint.
// Supports either OpenAI or Anthropic depending on which API key is set in env.
// Set ONE of these in .env.local (or your Vercel project settings):
//   OPENAI_API_KEY=sk-...            (uses gpt-4o-mini)
//   ANTHROPIC_API_KEY=sk-ant-...     (uses claude-3-5-haiku)

export const runtime = "edge";

type Msg = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  let messages: Msg[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const openai = process.env.OPENAI_API_KEY;
  const anthropic = process.env.ANTHROPIC_API_KEY;

  try {
    if (anthropic) {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": anthropic,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-5-haiku-latest",
          max_tokens: 400,
          system: AI_SYSTEM_PROMPT,
          messages,
        }),
      });
      const data = await res.json();
      const text = data?.content?.[0]?.text ?? "";
      return NextResponse.json({ text });
    }

    if (openai) {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${openai}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          max_tokens: 400,
          messages: [{ role: "system", content: AI_SYSTEM_PROMPT }, ...messages],
        }),
      });
      const data = await res.json();
      const text = data?.choices?.[0]?.message?.content ?? "";
      return NextResponse.json({ text });
    }

    // No key configured — let the client use its offline keyword fallback.
    return NextResponse.json({ text: "" }, { status: 200 });
  } catch (e) {
    return NextResponse.json({ text: "", error: String(e) }, { status: 200 });
  }
}
