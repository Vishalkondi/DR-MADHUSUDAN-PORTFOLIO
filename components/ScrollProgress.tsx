"use client";

import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const on = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight || 1;
      setW(Math.min(100, (window.scrollY / max) * 100));
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 3, zIndex: 60, background: "transparent", pointerEvents: "none" }}>
      <div style={{ height: "100%", width: `${w}%`, background: "linear-gradient(90deg,#c8323a,#f4d9a8,#12805c)", boxShadow: "0 0 10px rgba(18,211,138,.5)" }} />
    </div>
  );
}
