"use client";

import * as Icons from "lucide-react";
import { Reveal } from "./Reveal";
import { AFFILIATIONS, EXPERTISE, PROCEDURES, TIMELINE, AWARDS, RESEARCH } from "@/lib/data";
import { motion, useMotionValue, useSpring } from "framer-motion";

const label = (n: string, text: string, color = "#c8323a") => (
  <p className="font-mono" style={{ fontSize: 12, letterSpacing: 3, color, textTransform: "uppercase", margin: "0 0 16px" }}>
    {n} — {text}
  </p>
);

/* ---------------- AFFILIATIONS MARQUEE ---------------- */
export function Affiliations() {
  const items = [...AFFILIATIONS, ...AFFILIATIONS];
  return (
    <section id="trust" style={{ background: "#0a1a2f", padding: "30px 40px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", gap: 34 }}>
        <span className="font-mono" style={{ flex: "none", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: "rgba(255,255,255,.4)" }}>
          Affiliations<br />& Fellowships
        </span>
        <div style={{ flex: 1, minWidth: 0, overflow: "hidden", maskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 7%,#000 93%,transparent)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 52, width: "max-content", animation: "marquee 30s linear infinite" }}>
            {items.map((a, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 52 }}>
                <span className="font-display" style={{ fontSize: 19, color: "rgba(255,255,255,.72)", whiteSpace: "nowrap" }}>{a}</span>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#12805c", flex: "none" }} />
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
export function About() {
  return (
    <section id="about" style={{ padding: "110px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: ".9fr 1.1fr", gap: 70, alignItems: "start" }} className="max-lg:!grid-cols-1">
        <Reveal dir="left">
          {label("01", "About")}
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: 42, lineHeight: 1.1, margin: "0 0 24px", color: "#0b1f3a" }}>A career devoted to the science and craft of the heart.</h2>
          <p style={{ color: "#4a5a70", fontSize: 16.5, lineHeight: 1.75, margin: "0 0 20px" }}>Dr. Madhusudan Yemul is a senior interventional cardiologist whose practice unites advanced catheter-based intervention with a deep commitment to preventive, patient-first care. Over two and a half decades he has led complex cardiac programs and mentored a generation of clinicians.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 34 }}>
            {[["Mission", "To make world-class cardiac care accessible, humane, and grounded in evidence for every patient."], ["Vision", "A future where preventable heart disease is caught early and treated with precision, not fear."]].map(([t, d]) => (
              <div key={t} style={{ padding: 22, borderRadius: 16, background: "#f5f7fa", border: "1px solid rgba(11,31,58,.06)" }}>
                <div className="font-mono" style={{ fontSize: 11, letterSpacing: 1.5, color: "#12805c", textTransform: "uppercase", marginBottom: 10 }}>{t}</div>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: "#33435c" }}>{d}</p>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal dir="right" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=1000&q=60" alt="Clinic" style={{ gridColumn: "1 / -1", width: "100%", height: 240, objectFit: "cover", borderRadius: 18 }} />
          <div style={{ padding: 26, borderRadius: 18, background: "linear-gradient(160deg,#0e2a4d,#0a1a2f)", color: "#fff", gridColumn: "1 / -1" }}>
            <p className="font-display" style={{ fontStyle: "italic", fontSize: 22, lineHeight: 1.5, margin: "0 0 16px" }}>&ldquo;The catheter is only a tool. The real intervention is trust — earned one honest conversation at a time.&rdquo;</p>
            <p className="font-mono" style={{ margin: 0, fontSize: 11, letterSpacing: 2, color: "#f4d9a8", textTransform: "uppercase" }}>— Dr. M. Yemul</p>
          </div>
          {[["DM", "Cardiology, super-speciality board certified"], ["FSCAI", "Fellow, Society for Cardiovascular Angiography"]].map(([k, v]) => (
            <div key={k} style={{ padding: 24, borderRadius: 16, border: "1px solid rgba(11,31,58,.08)" }}>
              <div className="font-display" style={{ fontSize: 30, color: "#0b1f3a", fontWeight: 600 }}>{k}</div>
              <p style={{ margin: "8px 0 0", fontSize: 13.5, color: "#5a6b82", lineHeight: 1.55 }}>{v}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- EXPERTISE (tilt cards) ---------------- */
function TiltCard({ ex, i }: { ex: (typeof EXPERTISE)[number]; i: number }) {
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 18 });
  const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[ex.icon] ?? Icons.Heart;
  return (
    <motion.a
      href="#book"
      initial={{ opacity: 0, scale: 0.92 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: [0.16, 0.84, 0.28, 1.02], delay: (i % 3) * 0.08 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800, position: "relative", display: "block", padding: 28, borderRadius: 18, background: "#fff", border: "1px solid rgba(11,31,58,.07)", textDecoration: "none", overflow: "hidden" }}
      onMouseMove={(e) => {
        const r = (e.currentTarget as HTMLElement).getBoundingClientRect();
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 7);
        rx.set((0.5 - (e.clientY - r.top) / r.height) * 7);
      }}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
    >
      <span style={{ position: "absolute", top: -40, right: -40, width: 130, height: 130, borderRadius: "50%", background: "radial-gradient(circle,rgba(18,128,92,.1),transparent 70%)" }} />
      <span style={{ position: "relative", display: "grid", placeItems: "center", width: 52, height: 52, borderRadius: 14, background: ex.tint, color: ex.color, marginBottom: 20 }}>
        <Icon size={24} strokeWidth={1.7} />
      </span>
      <h3 className="font-display" style={{ position: "relative", fontSize: 21, fontWeight: 600, color: "#0b1f3a", margin: "0 0 10px" }}>{ex.title}</h3>
      <p style={{ position: "relative", color: "#5a6b82", fontSize: 14, lineHeight: 1.6, margin: "0 0 18px" }}>{ex.desc}</p>
      <span style={{ position: "relative", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#12805c" }}>Learn more <Icons.ArrowRight size={15} /></span>
    </motion.a>
  );
}

export function Expertise() {
  return (
    <section id="expertise" style={{ padding: "110px 40px", background: "#f5f7fa" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 50 }}>
          <div style={{ maxWidth: 640 }}>
            {label("02", "Expertise")}
            <h2 className="font-display" style={{ fontWeight: 600, fontSize: 42, lineHeight: 1.12, margin: 0, color: "#0b1f3a" }}>Comprehensive cardiac care, under one practice.</h2>
          </div>
          <p style={{ maxWidth: 340, color: "#5a6b82", fontSize: 15, lineHeight: 1.65, margin: 0 }}>From acute emergencies to lifelong prevention — a full spectrum of subspecialty expertise.</p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 18 }} className="max-md:!grid-cols-1">
          {EXPERTISE.map((ex, i) => <TiltCard key={ex.title} ex={ex} i={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROCEDURES ---------------- */
export function Procedures() {
  return (
    <section id="procedures" style={{ padding: "110px 40px", background: "#0a1a2f" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal style={{ marginBottom: 48, maxWidth: 680 }}>
          {label("03", "Procedures", "#f4d9a8")}
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: 42, lineHeight: 1.12, margin: "0 0 16px", color: "#fff" }}>Advanced interventions, performed with precision.</h2>
          <p style={{ color: "rgba(255,255,255,.6)", fontSize: 16, lineHeight: 1.65, margin: 0 }}>Each procedure is explained end-to-end — preparation, steps, recovery and FAQs — so you walk in informed and at ease.</p>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 14 }} className="max-lg:!grid-cols-2">
          {PROCEDURES.map((p, i) => (
            <motion.a key={p.name} href="#book" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: (i % 5) * 0.06 }} whileHover={{ y: -5 }}
              style={{ display: "flex", flexDirection: "column", gap: 14, padding: "22px 20px", borderRadius: 16, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", textDecoration: "none" }}>
              <span className="font-mono" style={{ fontSize: 11, color: "#f4d9a8", letterSpacing: 1 }}>{p.no}</span>
              <span className="font-display" style={{ fontSize: 18, color: "#fff", lineHeight: 1.25, fontWeight: 600 }}>{p.name}</span>
              <span style={{ fontSize: 12.5, color: "rgba(255,255,255,.55)", lineHeight: 1.5 }}>{p.tag}</span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- JOURNEY ---------------- */
export function Journey() {
  return (
    <section id="journey" style={{ padding: "110px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 60 }}>
          {label("04", "Professional Journey")}
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: 42, lineHeight: 1.12, margin: 0, color: "#0b1f3a" }}>Education, fellowships & milestones.</h2>
        </Reveal>
        <div style={{ position: "relative", paddingLeft: 38 }}>
          <span style={{ position: "absolute", left: 9, top: 6, bottom: 6, width: 2, background: "linear-gradient(#c8323a,#12805c,#0e2a4d)" }} />
          {TIMELINE.map((t) => (
            <Reveal key={t.year} style={{ position: "relative", padding: "0 0 40px" }}>
              <span style={{ position: "absolute", left: -38, top: 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", border: "3px solid #12805c", boxShadow: "0 0 0 4px rgba(18,128,92,.12)" }} />
              <div style={{ display: "flex", alignItems: "baseline", gap: 14, flexWrap: "wrap", marginBottom: 6 }}>
                <span className="font-mono" style={{ fontSize: 13, color: "#c8323a", fontWeight: 500 }}>{t.year}</span>
                <h3 className="font-display" style={{ fontSize: 21, fontWeight: 600, color: "#0b1f3a", margin: 0 }}>{t.title}</h3>
              </div>
              <p style={{ margin: 0, color: "#5a6b82", fontSize: 15, lineHeight: 1.6, maxWidth: 640 }}>{t.detail}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- RECOGNITION (Awards + Research) ---------------- */
export function Recognition() {
  return (
    <section id="research" style={{ padding: "110px 40px", background: "#f5f7fa" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60 }} className="max-lg:!grid-cols-1">
        <Reveal dir="left">
          {label("05", "Recognition")}
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: 38, lineHeight: 1.14, margin: "0 0 28px", color: "#0b1f3a" }}>Awards & honours.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {AWARDS.map((a) => (
              <div key={a.title} style={{ display: "flex", gap: 16, padding: 20, borderRadius: 14, background: "#fff", border: "1px solid rgba(11,31,58,.07)" }}>
                <span style={{ display: "grid", placeItems: "center", width: 44, height: 44, flex: "none", borderRadius: 12, background: "rgba(176,141,87,.14)", color: "#b08d57" }}><Icons.Award size={22} strokeWidth={1.8} /></span>
                <div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                    <span className="font-mono" style={{ fontSize: 12, color: "#b08d57" }}>{a.year}</span>
                    <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, color: "#0b1f3a", margin: 0 }}>{a.title}</h3>
                  </div>
                  <p style={{ margin: "5px 0 0", color: "#5a6b82", fontSize: 13.5, lineHeight: 1.5 }}>{a.by}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
        <Reveal dir="right">
          {label("", "Research & Publications")}
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: 38, lineHeight: 1.14, margin: "0 0 28px", color: "#0b1f3a" }}>Peer-reviewed work.</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {RESEARCH.map((r) => (
              <a key={r.title} href="#" style={{ display: "block", padding: 22, borderRadius: 14, background: "#fff", border: "1px solid rgba(11,31,58,.07)", textDecoration: "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 14, alignItems: "flex-start" }}>
                  <h3 className="font-display" style={{ fontSize: 17, fontWeight: 600, color: "#0b1f3a", margin: 0, lineHeight: 1.35, maxWidth: "78%" }}>{r.title}</h3>
                  <span className="font-mono" style={{ fontSize: 11, color: "#12805c", whiteSpace: "nowrap" }}>PDF ↓</span>
                </div>
                <p className="font-mono" style={{ margin: "10px 0 0", fontSize: 12, color: "#5a6b82" }}>{r.meta}</p>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
