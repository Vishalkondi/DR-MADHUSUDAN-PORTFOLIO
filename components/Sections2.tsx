"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Plus, ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { GALLERY, TESTIMONIALS, FAQS, BLOG } from "@/lib/data";

const label = (n: string, text: string, color = "#c8323a") => (
  <p className="font-mono" style={{ fontSize: 12, letterSpacing: 3, color, textTransform: "uppercase", margin: "0 0 16px" }}>
    {n} — {text}
  </p>
);

/* ---------------- GALLERY (masonry) ---------------- */
export function Gallery() {
  return (
    <section id="gallery" style={{ padding: "110px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 44 }}>
          <div>
            {label("06", "Gallery")}
            <h2 className="font-display" style={{ fontWeight: 600, fontSize: 42, lineHeight: 1.12, margin: 0, color: "#0b1f3a" }}>Inside the practice.</h2>
          </div>
          <p style={{ maxWidth: 320, color: "#5a6b82", fontSize: 15, lineHeight: 1.65, margin: 0 }}>Moments from the clinic, cath lab, conferences and community screening drives.</p>
        </Reveal>
        <div style={{ columns: 3, columnGap: 18 }} className="max-md:!columns-1">
          {GALLERY.map((g) => (
            <div key={g.label} style={{ breakInside: "avoid", margin: "0 0 18px" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.img} alt={g.label} style={{ display: "block", width: "100%", height: g.h, objectFit: "cover", borderRadius: 18 }} />
              <div style={{ padding: "11px 4px 0" }}>
                <div className="font-display" style={{ fontSize: 16.5, fontWeight: 600, color: "#0b1f3a" }}>{g.label}</div>
                <div className="font-mono" style={{ fontSize: 10, letterSpacing: 1, color: "#8894a6", textTransform: "uppercase", marginTop: 3 }}>{g.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
export function Testimonials() {
  const [i, setI] = useState(0);
  const len = TESTIMONIALS.length;
  const next = () => setI((v) => (v + 1) % len);
  const prev = () => setI((v) => (v - 1 + len) % len);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % len), 6000);
    return () => clearInterval(t);
  }, [len]);
  const t = TESTIMONIALS[i];
  return (
    <section id="testimonials" style={{ padding: "110px 40px", background: "#0a1a2f", overflow: "hidden" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        {label("07", "Testimonials", "#f4d9a8")}
        <h2 className="font-display" style={{ fontWeight: 600, fontSize: 42, lineHeight: 1.12, margin: "0 0 50px", color: "#fff" }}>In the words of patients.</h2>
        <AnimatePresence mode="wait">
          <motion.div key={i} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.5, ease: [0.16, 0.84, 0.28, 1.02] }}>
            <div style={{ display: "flex", gap: 3, justifyContent: "center", marginBottom: 22, color: "#f4d9a8" }}>★★★★★</div>
            <p className="font-display" style={{ fontStyle: "italic", fontSize: 26, lineHeight: 1.55, color: "#fff", margin: "0 auto 28px", maxWidth: 760 }}>&ldquo;{t.quote}&rdquo;</p>
            <div style={{ fontWeight: 600, color: "#fff", fontSize: 15 }}>{t.name}</div>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: 1.5, color: "rgba(255,255,255,.5)", textTransform: "uppercase", marginTop: 4 }}>{t.meta}</div>
          </motion.div>
        </AnimatePresence>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 20, marginTop: 40 }}>
          {[[prev, <ChevronLeft key="l" size={18} />], [next, <ChevronRight key="r" size={18} />]].map(([fn, icon], idx) => (
            <button key={idx} onClick={fn as () => void} aria-label={idx === 0 ? "Previous" : "Next"} style={{ display: "grid", placeItems: "center", width: 44, height: 44, borderRadius: "50%", background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.16)", color: "#fff", cursor: "pointer" }}>
              {icon as React.ReactNode}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
export function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <section id="faq" style={{ padding: "110px 40px", background: "#fff" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <Reveal style={{ textAlign: "center", marginBottom: 50 }}>
          {label("08", "FAQ")}
          <h2 className="font-display" style={{ fontWeight: 600, fontSize: 42, lineHeight: 1.12, margin: 0, color: "#0b1f3a" }}>Questions, answered.</h2>
        </Reveal>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {FAQS.map((f, idx) => {
            const isOpen = open === idx;
            return (
              <div key={f.q} style={{ border: "1px solid rgba(11,31,58,.09)", borderRadius: 14, overflow: "hidden", background: "#fbfcfd" }}>
                <button onClick={() => setOpen(isOpen ? -1 : idx)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "22px 24px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span className="font-display" style={{ fontSize: 18, fontWeight: 600, color: "#0b1f3a" }}>{f.q}</span>
                  <span style={{ flex: "none", display: "grid", placeItems: "center", width: 28, height: 28, borderRadius: "50%", background: isOpen ? "rgba(18,128,92,.14)" : "rgba(11,31,58,.06)", color: isOpen ? "#12805c" : "#8894a6", transition: "transform .3s", transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>
                    <Plus size={18} />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.35, ease: [0.16, 0.84, 0.28, 1.02] }} style={{ overflow: "hidden" }}>
                      <p style={{ margin: 0, padding: "0 24px 24px", color: "#5a6b82", fontSize: 15, lineHeight: 1.7 }}>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------------- BLOG ---------------- */
export function Blog() {
  return (
    <section id="blog" style={{ padding: "110px 40px", background: "#f5f7fa" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <Reveal style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 44 }}>
          <div>
            {label("09", "Insights")}
            <h2 className="font-display" style={{ fontWeight: 600, fontSize: 42, lineHeight: 1.12, margin: 0, color: "#0b1f3a" }}>From the doctor&rsquo;s desk.</h2>
          </div>
          <a href="#blog" style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: "#12805c", textDecoration: "none" }}>View all articles <ArrowRight size={15} /></a>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }} className="max-md:!grid-cols-1">
          {BLOG.map((b, i) => (
            <motion.a key={b.title} href="#blog" initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 0.84, 0.28, 1.02] }} whileHover={{ y: -6 }}
              style={{ display: "flex", flexDirection: "column", background: "#fff", border: "1px solid rgba(11,31,58,.07)", borderRadius: 18, overflow: "hidden", textDecoration: "none" }}>
              <span style={{ height: 180, backgroundImage: `url(${b.img})`, backgroundSize: "cover", backgroundPosition: "center" }} />
              <span style={{ display: "flex", flexDirection: "column", flex: 1, padding: 22 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span className="font-mono" style={{ padding: "4px 11px", borderRadius: 999, background: "rgba(18,128,92,.1)", color: "#0d6b4c", fontSize: 10, letterSpacing: 1, textTransform: "uppercase" }}>{b.cat}</span>
                  <span className="font-mono" style={{ fontSize: 11, color: "#8894a6" }}>{b.read}</span>
                </span>
                <span className="font-display" style={{ fontSize: 19, fontWeight: 600, color: "#0b1f3a", lineHeight: 1.3, marginBottom: 10 }}>{b.title}</span>
                <span style={{ fontSize: 13.5, color: "#5a6b82", lineHeight: 1.6, marginBottom: 16 }}>{b.excerpt}</span>
                <span style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span className="font-mono" style={{ fontSize: 11, color: "#8894a6" }}>{b.date}</span>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 13, fontWeight: 600, color: "#c8323a" }}>Read <ArrowRight size={14} /></span>
                </span>
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
