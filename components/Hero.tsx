"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Calendar, Phone } from "lucide-react";
import { STATS } from "@/lib/data";

const ECG_PATH =
  "M0,60 H150 l14,-34 l12,64 l18,-58 l10,28 H470 l14,-34 l12,64 l18,-58 l10,28 H790 l14,-34 l12,64 l18,-58 l10,28 H1200";

function Counter({ value, suffix = "", plus, gold }: { value: number; suffix?: string; plus?: boolean; gold?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState("0");
  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.5,
      ease: [0.16, 0.84, 0.28, 1],
      onUpdate(v) {
        if (value >= 1000) {
          setDisplay(v >= 1000 ? (v / 1000).toFixed(v < value ? 1 : 0).replace(/\.0$/, "") + "k" : Math.round(v).toString());
        } else {
          setDisplay(Math.round(v).toString());
        }
      },
      onComplete() {
        setDisplay((value >= 1000 ? (value / 1000).toString().replace(/\.0$/, "") + "k" : value.toString()) + (plus ? "+" : "") + suffix);
      },
    });
    return () => controls.stop();
  }, [value, suffix, plus]);
  return (
    <span ref={ref} className="font-display" style={{ fontSize: 34, fontWeight: 600, color: gold ? "#f4d9a8" : "#fff" }}>
      {display}
      {suffix && !display.includes(suffix) ? suffix : ""}
    </span>
  );
}

function MagneticButton({ children, href }: { children: React.ReactNode; href: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 15 });
  const sy = useSpring(y, { stiffness: 200, damping: 15 });
  return (
    <motion.a
      href={href}
      className="shimmer-btn"
      style={{
        x: sx,
        y: sy,
        display: "inline-flex",
        alignItems: "center",
        gap: 9,
        padding: "15px 26px",
        borderRadius: 999,
        background: "linear-gradient(135deg,#c8323a,#a11f2c)",
        color: "#fff",
        textDecoration: "none",
        fontWeight: 600,
        fontSize: 15,
        boxShadow: "0 14px 34px rgba(200,50,58,.4)",
      }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) * 0.3);
        y.set((e.clientY - r.top - r.height / 2) * 0.4);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <span className="sh" />
      {children}
    </motion.a>
  );
}

export default function Hero() {
  return (
    <header
      id="top"
      style={{
        position: "relative",
        padding: "150px 40px 90px",
        background: "radial-gradient(120% 90% at 78% 0%,#123a63 0%,#0d2748 42%,#0a1a2f 100%)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(80% 70% at 50% 30%,#000,transparent)",
          WebkitMaskImage: "radial-gradient(80% 70% at 50% 30%,#000,transparent)",
        }}
      />
      <div style={{ position: "absolute", top: -140, right: -120, width: 520, height: 520, borderRadius: "50%", background: "radial-gradient(circle,rgba(18,128,92,.28),transparent 65%)", filter: "blur(20px)", animation: "drift1 16s ease-in-out infinite" }} />
      <div style={{ position: "absolute", bottom: -160, left: -140, width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle,rgba(200,50,58,.16),transparent 65%)", filter: "blur(20px)", animation: "drift2 19s ease-in-out infinite" }} />

      <div style={{ position: "relative", maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 60, alignItems: "center" }} className="max-lg:!grid-cols-1">
        {/* LEFT */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ staggerChildren: 0.11 }}>
          {[
            <div key="badge" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "7px 14px 7px 10px", borderRadius: 999, background: "rgba(18,128,92,.14)", border: "1px solid rgba(18,128,92,.4)", marginBottom: 26 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#12d38a", animation: "pulsedot 2s infinite" }} />
              <span className="font-mono" style={{ fontSize: 11, letterSpacing: 1.5, color: "#7ff0c2", textTransform: "uppercase" }}>Available Today · OPD Open</span>
            </div>,
            <p key="creds" className="font-mono" style={{ fontSize: 12.5, letterSpacing: 3, color: "rgba(255,255,255,.5)", textTransform: "uppercase", margin: "0 0 14px" }}>MD · DM Cardiology · FSCAI · FACC</p>,
            <h1 key="h1" className="font-display" style={{ fontWeight: 600, color: "#fff", fontSize: 60, lineHeight: 1.04, letterSpacing: "-.5px", margin: "0 0 22px" }}>
              Precision care<br />for every<br /><span className="grad-text" style={{ fontStyle: "italic" }}>heartbeat.</span>
            </h1>,
            <p key="lede" style={{ maxWidth: 460, color: "rgba(255,255,255,.68)", fontSize: 17, lineHeight: 1.65, margin: "0 0 34px" }}>
              Senior interventional cardiologist with 25 years restoring hearts through evidence-based, compassionate, minimally-invasive care — from complex angioplasty to lifelong prevention.
            </p>,
            <div key="cta" style={{ display: "flex", flexWrap: "wrap", gap: 14, marginBottom: 44 }}>
              <MagneticButton href="#book"><Calendar size={17} /><span style={{ position: "relative" }}>Book Appointment</span></MagneticButton>
              <a href="tel:+910000000000" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "15px 24px", borderRadius: 999, background: "rgba(255,255,255,.08)", border: "1px solid rgba(255,255,255,.2)", color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: 15, backdropFilter: "blur(8px)" }}><Phone size={16} />Call Clinic</a>
              <a href="https://wa.me/910000000000" style={{ display: "inline-flex", alignItems: "center", gap: 9, padding: "15px 24px", borderRadius: 999, background: "rgba(37,211,102,.12)", border: "1px solid rgba(37,211,102,.4)", color: "#8ff0b4", textDecoration: "none", fontWeight: 600, fontSize: 15 }}>WhatsApp</a>
            </div>,
            <div key="stats" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 22, maxWidth: 560 }}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <Counter value={s.value} suffix={s.suffix} plus={s.plus} gold={s.gold} />
                  <div className="font-mono" style={{ fontSize: 10.5, letterSpacing: 1, color: "rgba(255,255,255,.5)", textTransform: "uppercase", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>,
          ].map((el, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 0.84, 0.28, 1.02], delay: 0.12 + i * 0.11 }}>
              {el}
            </motion.div>
          ))}
        </motion.div>

        {/* RIGHT: PHOTO */}
        <motion.div style={{ position: "relative" }} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.16, 0.84, 0.28, 1.02], delay: 0.4 }}>
          <div style={{ position: "relative", borderRadius: 26, overflow: "hidden", border: "1px solid rgba(255,255,255,.16)", boxShadow: "0 40px 90px rgba(0,0,0,.5)", background: "#0e2a4d" }}>
            <Image src="/dr-yemul.png" alt="Dr. Madhusudan Yemul, Interventional Cardiologist" width={640} height={760} priority style={{ display: "block", width: "100%", height: "auto" }} />
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: "absolute", left: 0, right: 0, bottom: 78, width: "100%", height: 70, opacity: 0.9 }}>
              <path d={ECG_PATH} fill="none" stroke="rgba(127,240,194,.28)" strokeWidth={2} />
              <path d={ECG_PATH} fill="none" stroke="#12d38a" strokeWidth={2.5} strokeDasharray={1400} style={{ animation: "ecgdraw 4s linear infinite", filter: "drop-shadow(0 0 6px rgba(18,211,138,.8))" }} />
            </svg>
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "26px 24px 20px", background: "linear-gradient(0deg,rgba(8,20,36,.95),rgba(8,20,36,0))" }}>
              <div className="font-display" style={{ color: "#fff", fontSize: 22, fontWeight: 600 }}>Dr. Madhusudan Yemul</div>
              <div className="font-mono" style={{ color: "#f4d9a8", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginTop: 3 }}>Senior Interventional Cardiologist</div>
            </div>
          </div>
          <div style={{ position: "absolute", top: 26, left: -30, display: "flex", alignItems: "center", gap: 10, padding: "11px 15px", borderRadius: 14, background: "rgba(255,255,255,.92)", backdropFilter: "blur(10px)", boxShadow: "0 16px 40px rgba(0,0,0,.28)", animation: "floaty 5.5s ease-in-out infinite" }}>
            <span style={{ display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 8, background: "rgba(200,50,58,.12)", color: "#c8323a", fontSize: 18 }}>♥</span>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0b1f3a" }}>72 BPM</div>
              <div className="font-mono" style={{ fontSize: 9, letterSpacing: 1, color: "#5a6b82", textTransform: "uppercase" }}>Live Monitor</div>
            </div>
          </div>
          <div style={{ position: "absolute", bottom: 120, right: -34, display: "flex", alignItems: "center", gap: 10, padding: "11px 15px", borderRadius: 14, background: "rgba(255,255,255,.92)", backdropFilter: "blur(10px)", boxShadow: "0 16px 40px rgba(0,0,0,.28)", animation: "floaty2 6.5s ease-in-out infinite" }}>
            <span className="font-display" style={{ display: "grid", placeItems: "center", width: 30, height: 30, borderRadius: 8, background: "rgba(18,128,92,.14)", color: "#12805c", fontWeight: 700 }}>★</span>
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: "#0b1f3a" }}>4.9 / 5.0</div>
              <div className="font-mono" style={{ fontSize: 9, letterSpacing: 1, color: "#5a6b82", textTransform: "uppercase" }}>2,400+ Reviews</div>
            </div>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
