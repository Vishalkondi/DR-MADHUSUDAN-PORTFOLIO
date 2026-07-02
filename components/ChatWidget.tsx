"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, MessageSquare, ArrowUp, HeartPulse } from "lucide-react";
import { CLINIC } from "@/lib/data";

type Msg = { role: "user" | "bot"; text: string };

const QUICK = ["Book appointment", "OPD timings", "Is angioplasty safe?", "Emergency help"];

// Offline keyword fallback (used if the API route is unavailable).
function fallback(text: string): string {
  const t = text.toLowerCase();
  if (/\b(hi|hello|hey|namaste)\b/.test(t)) return "Hello! How can I help with your heart-health questions today?";
  if (/appoint|book|slot|consult/.test(t)) return `You can book from the form on this page, or call ${CLINIC.phone}. OPD runs ${CLINIC.opd}.`;
  if (/time|timing|hour|open|opd/.test(t)) return `OPD timings: ${CLINIC.opd}. Cardiac emergency support is available 24×7.`;
  if (/emergency|chest pain|attack|urgent/.test(t)) return `If you have severe chest pain, breathlessness or fainting, call our 24×7 line immediately: ${CLINIC.phone}, or reach the nearest ER.`;
  if (/angioplasty|stent|angiography/.test(t)) return "Angioplasty is a minimally-invasive, catheter-based procedure. Most patients go home within 24–48 hours. A second opinion is always welcome.";
  if (/cost|price|fee|insurance|cashless/.test(t)) return `The clinic is empanelled with all major insurers for cashless treatment. For fees, call ${CLINIC.phone}.`;
  if (/where|location|address|map|direction/.test(t)) return `${CLINIC.clinicName}, ${CLINIC.address}.`;
  if (/thank/.test(t)) return "You're most welcome. Take care of your heart! ❤";
  return `Thanks for your question. For anything specific to your case, please book a consultation or call ${CLINIC.phone}.`;
}

function useScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return show;
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([
    { role: "bot", text: "Hi! I'm Dr. Yemul's AI health assistant. Ask me anything — appointments, what a procedure involves, recovery, timings, insurance, or general heart-health guidance." },
  ]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const showTop = useScrollTop();

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [msgs, typing, open]);

  async function send(raw?: string) {
    const text = (raw ?? input).trim();
    if (!text) return;
    setInput("");
    const history = [...msgs, { role: "user" as const, text }];
    setMsgs(history);
    setTyping(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.role === "bot" ? "assistant" : "user", content: m.text })).slice(-8),
        }),
      });
      if (!res.ok) throw new Error("bad");
      const data = await res.json();
      setMsgs((m) => [...m, { role: "bot", text: (data.text && data.text.trim()) || fallback(text) }]);
    } catch {
      setMsgs((m) => [...m, { role: "bot", text: fallback(text) }]);
    } finally {
      setTyping(false);
    }
  }

  return (
    <>
      {/* PANEL */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 18, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18, scale: 0.96 }} transition={{ duration: 0.3 }}
            style={{ position: "fixed", right: 24, bottom: 96, zIndex: 58, width: "min(370px,calc(100vw - 40px))" }}>
            <div style={{ borderRadius: 20, overflow: "hidden", background: "#f4f6f9", boxShadow: "0 30px 70px rgba(6,14,24,.4)", border: "1px solid rgba(11,31,58,.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 18px", background: "linear-gradient(135deg,#0e2a4d,#0a1a2f)" }}>
                <span style={{ position: "relative", display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: "50%", background: "linear-gradient(140deg,#12805c,#0e2a4d)", color: "#fff" }}>
                  <HeartPulse size={20} />
                  <span style={{ position: "absolute", right: -1, bottom: -1, width: 11, height: 11, borderRadius: "50%", background: "#12d38a", border: "2px solid #0a1a2f" }} />
                </span>
                <div style={{ flex: 1, lineHeight: 1.2 }}>
                  <div style={{ color: "#fff", fontWeight: 600, fontSize: 14.5 }}>AI Health Assistant</div>
                  <div className="font-mono" style={{ fontSize: 10, letterSpacing: 1, color: "#7ff0c2", textTransform: "uppercase" }}>Online · Replies instantly</div>
                </div>
                <button onClick={() => setOpen(false)} aria-label="Close chat" style={{ display: "grid", placeItems: "center", width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,.1)", border: "none", color: "#fff", cursor: "pointer" }}><X size={16} /></button>
              </div>
              <div ref={scrollRef} style={{ height: 300, overflowY: "auto", padding: "16px 14px", background: "#f4f6f9" }}>
                {msgs.map((m, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
                    <div style={{ maxWidth: "82%", padding: "10px 13px", borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.role === "user" ? "linear-gradient(135deg,#c8323a,#a11f2c)" : "#fff", color: m.role === "user" ? "#fff" : "#1c2b40", border: m.role === "user" ? "none" : "1px solid rgba(11,31,58,.1)", fontSize: 13.5, lineHeight: 1.5, boxShadow: "0 3px 10px rgba(11,31,58,.06)" }}>{m.text}</div>
                  </div>
                ))}
                {typing && (
                  <div style={{ display: "flex", justifyContent: "flex-start", marginBottom: 10 }}>
                    <div style={{ display: "flex", gap: 5, padding: "13px 15px", borderRadius: "14px 14px 14px 4px", background: "#fff", border: "1px solid rgba(11,31,58,.1)" }}>
                      {[0, 0.18, 0.36].map((d) => <span key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: "#8894a6", animation: `blink 1s infinite ${d}s` }} />)}
                    </div>
                  </div>
                )}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "0 14px 10px", background: "#f4f6f9" }}>
                {QUICK.map((q) => <button key={q} onClick={() => send(q)} style={{ padding: "7px 11px", borderRadius: 999, border: "1px solid rgba(18,128,92,.3)", background: "rgba(18,128,92,.08)", color: "#0d6b4c", fontSize: 11.5, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" }}>{q}</button>)}
              </div>
              <div style={{ display: "flex", gap: 8, padding: "12px 14px", borderTop: "1px solid rgba(11,31,58,.08)", background: "#fff" }}>
                <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); send(); } }} placeholder="Type your question..." style={{ flex: 1, minWidth: 0, padding: "11px 13px", borderRadius: 10, border: "1px solid rgba(11,31,58,.14)", fontSize: 13, fontFamily: "inherit", outline: "none" }} />
                <button onClick={() => send()} aria-label="Send message" style={{ flex: "none", display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 10, border: "none", background: "linear-gradient(135deg,#c8323a,#a11f2c)", color: "#fff", cursor: "pointer" }}><Send size={17} /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING CONTROLS */}
      <div style={{ position: "fixed", right: 24, bottom: 24, zIndex: 59, display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <AnimatePresence>
          {showTop && (
            <motion.button initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 12 }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top"
              style={{ display: "grid", placeItems: "center", width: 46, height: 46, borderRadius: "50%", background: "#fff", border: "1px solid rgba(11,31,58,.12)", color: "#0b1f3a", cursor: "pointer", boxShadow: "0 10px 26px rgba(11,31,58,.18)" }}><ArrowUp size={18} /></motion.button>
          )}
        </AnimatePresence>
        <a href={CLINIC.whatsapp} aria-label="WhatsApp" style={{ display: "grid", placeItems: "center", width: 52, height: 52, borderRadius: "50%", background: "#25d366", color: "#fff", boxShadow: "0 12px 30px rgba(37,211,102,.4)", textDecoration: "none", fontSize: 22 }}>✆</a>
        <button onClick={() => setOpen((v) => !v)} aria-label="Open AI health assistant" style={{ position: "relative", display: "grid", placeItems: "center", width: 60, height: 60, borderRadius: "50%", background: "linear-gradient(135deg,#c8323a,#a11f2c)", color: "#fff", border: "none", cursor: "pointer", boxShadow: "0 14px 34px rgba(200,50,58,.45)" }}>
          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid #c8323a", animation: "ring 2s ease-out infinite" }} />
          <MessageSquare size={26} />
        </button>
      </div>
    </>
  );
}
