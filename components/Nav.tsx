"use client";

import { useEffect, useRef, useState } from "react";

const LINKS = [
  ["#about", "About"],
  ["#expertise", "Expertise"],
  ["#procedures", "Procedures"],
  ["#journey", "Journey"],
  ["#research", "Research"],
  ["#blog", "Insights"],
  ["#contact", "Contact"],
];

export default function Nav() {
  const nav = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      ref={nav}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: scrolled ? "11px 40px" : "16px 40px",
        background: scrolled ? "rgba(10,26,47,.9)" : "rgba(10,26,47,.55)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        borderBottom: "1px solid rgba(255,255,255,.08)",
        transition: "background .4s, padding .4s",
      }}
    >
      <a href="#top" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
        <span
          className="font-display"
          style={{
            display: "grid",
            placeItems: "center",
            width: 38,
            height: 38,
            borderRadius: 10,
            background: "linear-gradient(140deg,#12805c,#0e2a4d)",
            color: "#fff",
            fontWeight: 700,
            fontSize: 19,
            boxShadow: "0 6px 18px rgba(18,128,92,.35)",
          }}
        >
          Y
        </span>
        <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
          <span className="font-display" style={{ color: "#fff", fontWeight: 600, fontSize: 16, letterSpacing: ".2px" }}>
            Dr. Madhusudan Yemul
          </span>
          <span className="font-mono" style={{ color: "rgba(255,255,255,.55)", fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>
            Interventional Cardiology
          </span>
        </span>
      </a>
      <div style={{ display: "flex", alignItems: "center", gap: 30 }}>
        <div style={{ display: "flex", gap: 26 }} className="max-lg:hidden">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} style={{ color: "rgba(255,255,255,.72)", textDecoration: "none", fontSize: 13.5, fontWeight: 500 }}>
              {label}
            </a>
          ))}
        </div>
        <a
          href="#book"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "10px 20px",
            borderRadius: 999,
            background: "#fff",
            color: "#0a1a2f",
            textDecoration: "none",
            fontSize: 13.5,
            fontWeight: 600,
            boxShadow: "0 8px 22px rgba(0,0,0,.25)",
          }}
        >
          Book Appointment
        </a>
      </div>
    </nav>
  );
}
