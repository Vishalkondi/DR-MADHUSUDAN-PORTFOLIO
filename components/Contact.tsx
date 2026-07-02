"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Clock, Phone, Check } from "lucide-react";
import { Reveal } from "./Reveal";
import { CLINIC, CONCERNS, SLOT_TIMES } from "@/lib/data";

const DAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MON = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export default function Contact() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [concern, setConcern] = useState(0);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  const days = useMemo(() => {
    const out: { key: string; dow: string; dom: number; month: number }[] = [];
    const d = new Date();
    while (out.length < 12) {
      if (d.getDay() !== 0) out.push({ key: `${d.getDate()}-${d.getMonth()}`, dow: DAY[d.getDay()], dom: d.getDate(), month: d.getMonth() });
      d.setDate(d.getDate() + 1);
    }
    return out;
  }, []);

  const sel = days.find((x) => x.key === date);
  const dateLabel = sel ? `${sel.dow}, ${sel.dom} ${MON[sel.month]}` : "Not selected";
  const stepTitles = ["Your details", "Pick a date & time", "Review & confirm", "Request received"];

  const summary = [
    ["Name", name || "Guest patient"],
    ["Concern", CONCERNS[concern]],
    ["Date", dateLabel],
    ["Time", time || "Not selected"],
    ["Doctor", CLINIC.doctor],
    ["Clinic", `${CLINIC.clinicName}, Pune`],
  ];

  const redBtn: React.CSSProperties = { borderRadius: 12, border: "none", background: "linear-gradient(135deg,#c8323a,#a11f2c)", color: "#fff", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 12px 28px rgba(200,50,58,.28)" };
  const ghostBtn: React.CSSProperties = { padding: "14px 22px", borderRadius: 12, border: "1px solid rgba(11,31,58,.16)", background: "#fff", color: "#33435c", fontSize: 14.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" };
  const input: React.CSSProperties = { width: "100%", padding: "13px 15px", borderRadius: 11, border: "1px solid rgba(11,31,58,.14)", fontSize: 14.5, fontFamily: "inherit", outline: "none" };

  return (
    <section id="contact" style={{ padding: "110px 40px", background: "#fff" }}>
      <div id="book" style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }} className="max-lg:!grid-cols-1">
        {/* LEFT — clinic info */}
        <Reveal dir="left" style={{ padding: 44, borderRadius: 24, background: "linear-gradient(160deg,#0e2a4d,#0a1a2f)", color: "#fff" }}>
          <p className="font-mono" style={{ fontSize: 12, letterSpacing: 3, color: "#f4d9a8", textTransform: "uppercase", margin: "0 0 16px" }}>10 — Visit</p>
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: 36, lineHeight: 1.12, margin: "0 0 28px" }}>Book a consultation.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            {[
              [<MapPin key="m" size={18} />, CLINIC.clinicName, CLINIC.address, "#7ff0c2", "rgba(255,255,255,.08)"],
              [<Clock key="c" size={18} />, "OPD Timings", CLINIC.opd, "#7ff0c2", "rgba(255,255,255,.08)"],
              [<Phone key="p" size={18} />, "Emergency (24×7)", CLINIC.phone, "#ff9ba1", "rgba(200,50,58,.2)"],
            ].map(([icon, t, d, col, bg], idx) => (
              <div key={idx} style={{ display: "flex", gap: 14 }}>
                <span style={{ flex: "none", display: "grid", placeItems: "center", width: 40, height: 40, borderRadius: 11, background: bg as string, color: col as string }}>{icon as React.ReactNode}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, marginBottom: 3 }}>{t as string}</div>
                  <div style={{ color: "rgba(255,255,255,.6)", fontSize: 14, lineHeight: 1.5 }}>{d as string}</div>
                </div>
              </div>
            ))}
          </div>
          <a href={`https://maps.google.com/?q=${encodeURIComponent(CLINIC.mapQuery)}`} target="_blank" rel="noopener" style={{ display: "block", marginTop: 30, borderRadius: 14, overflow: "hidden", border: "1px solid rgba(255,255,255,.12)", textDecoration: "none" }}>
            <iframe title="Clinic location" src={`https://www.google.com/maps?q=${encodeURIComponent(CLINIC.mapQuery)}&output=embed`} width="100%" height={170} style={{ display: "block", border: 0, filter: "grayscale(.25) contrast(1.05)" }} loading="lazy" />
          </a>
        </Reveal>

        {/* RIGHT — booking flow */}
        <Reveal dir="right" style={{ padding: 44, borderRadius: 24, background: "#fff", border: "1px solid rgba(11,31,58,.08)", boxShadow: "0 30px 60px rgba(11,31,58,.06)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ display: "flex", gap: 6 }}>
              {[0, 1, 2].map((n) => <span key={n} style={{ width: 26, height: 4, borderRadius: 2, background: n <= Math.min(step, 2) ? "#c8323a" : "rgba(11,31,58,.12)" }} />)}
            </span>
            <span className="font-mono" style={{ fontSize: 11, color: "#5a6b82", letterSpacing: 1 }}>{step < 3 ? `Step ${step + 1} of 3` : "Done"}</span>
          </div>
          <h3 className="font-display" style={{ fontSize: 26, fontWeight: 600, color: "#0b1f3a", margin: "0 0 24px" }}>{stepTitles[step]}</h3>

          <AnimatePresence mode="wait">
            <motion.div key={step} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
              {step === 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#33435c", marginBottom: 7 }}>Full name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" style={input} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#33435c", marginBottom: 7 }}>Phone</label>
                    <input placeholder="+91" style={input} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#33435c", marginBottom: 7 }}>Concern</label>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                      {CONCERNS.map((c, i) => (
                        <button key={c} onClick={() => setConcern(i)} style={{ padding: "9px 15px", borderRadius: 999, border: `1px solid ${concern === i ? "#12805c" : "rgba(11,31,58,.14)"}`, background: concern === i ? "rgba(18,128,92,.1)" : "#fff", color: concern === i ? "#0d6b4c" : "#33435c", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "all .2s" }}>{c}</button>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setStep(1)} className="shimmer-btn" style={{ ...redBtn, marginTop: 8, width: "100%", padding: 15, fontSize: 15 }}><span className="sh" /><span style={{ position: "relative" }}>Continue →</span></button>
                </div>
              )}

              {step === 1 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#33435c", marginBottom: 10 }}>Select a date</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 8 }}>
                      {days.map((d) => {
                        const s = date === d.key;
                        return (
                          <button key={d.key} onClick={() => setDate(d.key)} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "10px 0", borderRadius: 11, background: s ? "linear-gradient(135deg,#c8323a,#a11f2c)" : "#fff", border: s ? "none" : "1px solid rgba(11,31,58,.12)", color: s ? "#fff" : "#0b1f3a", cursor: "pointer", fontFamily: "inherit", transition: "all .2s" }}>
                            <span className="font-mono" style={{ fontSize: 9.5, letterSpacing: .5, textTransform: "uppercase", color: s ? "rgba(255,255,255,.7)" : "#8894a6" }}>{d.dow}</span>
                            <span className="font-display" style={{ fontSize: 18, fontWeight: 600 }}>{d.dom}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12.5, fontWeight: 600, color: "#33435c", marginBottom: 10 }}>Available slots</label>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 8 }}>
                      {SLOT_TIMES.map((tt) => {
                        const s = time === tt;
                        return <button key={tt} onClick={() => setTime(tt)} className="font-mono" style={{ padding: "10px 0", borderRadius: 10, background: s ? "rgba(18,128,92,.12)" : "#fff", border: s ? "1px solid #12805c" : "1px solid rgba(11,31,58,.12)", color: s ? "#0d6b4c" : "#33435c", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s" }}>{tt}</button>;
                      })}
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                    <button onClick={() => setStep(0)} style={ghostBtn}>← Back</button>
                    <button onClick={() => setStep(2)} className="shimmer-btn" style={{ ...redBtn, flex: 1, padding: 14, fontSize: 14.5 }}><span className="sh" /><span style={{ position: "relative" }}>Review →</span></button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div style={{ border: "1px solid rgba(11,31,58,.1)", borderRadius: 16, overflow: "hidden" }}>
                    {summary.map(([k, v]) => (
                      <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16, padding: "13px 18px", borderBottom: "1px solid rgba(11,31,58,.06)" }}>
                        <span className="font-mono" style={{ fontSize: 11, letterSpacing: 1, color: "#8894a6", textTransform: "uppercase" }}>{k}</span>
                        <span style={{ fontSize: 14, fontWeight: 600, color: "#0b1f3a", textAlign: "right" }}>{v}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <button onClick={() => setStep(1)} style={ghostBtn}>← Back</button>
                    <button onClick={() => setStep(3)} className="shimmer-btn" style={{ flex: 1, padding: 14, borderRadius: 12, border: "none", background: "linear-gradient(135deg,#12805c,#0d6b4c)", color: "#fff", fontSize: 14.5, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 12px 28px rgba(18,128,92,.3)" }}><span className="sh" /><span style={{ position: "relative" }}>Confirm appointment ✓</span></button>
                  </div>
                  <p style={{ margin: 0, textAlign: "center", fontSize: 12, color: "#8894a6" }}>You&rsquo;ll receive email + WhatsApp confirmation. No payment needed to book.</p>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "14px 0 6px" }}>
                  <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200, damping: 12 }} style={{ display: "grid", placeItems: "center", width: 76, height: 76, borderRadius: "50%", background: "rgba(18,128,92,.12)", color: "#12805c", marginBottom: 22 }}><Check size={38} strokeWidth={2.2} /></motion.span>
                  <h4 className="font-display" style={{ fontSize: 24, fontWeight: 600, color: "#0b1f3a", margin: "0 0 10px" }}>Request received!</h4>
                  <p style={{ margin: "0 0 8px", color: "#5a6b82", fontSize: 15, lineHeight: 1.6, maxWidth: 340 }}>Thank you, {name || "there"}. We&rsquo;ve noted your preferred slot on <strong style={{ color: "#0b1f3a" }}>{dateLabel}</strong>. Our team will confirm shortly by phone &amp; WhatsApp.</p>
                  <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
                    <a href={CLINIC.whatsapp} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "12px 20px", borderRadius: 11, background: "#25d366", color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>Message on WhatsApp</a>
                    <button onClick={() => { setStep(0); setDate(null); setTime(null); }} style={{ ...ghostBtn, padding: "12px 20px", fontSize: 14 }}>Book another</button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
