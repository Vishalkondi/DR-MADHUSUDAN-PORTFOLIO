import { CLINIC } from "@/lib/data";

export default function Footer() {
  return (
    <footer style={{ background: "#0a1a2f", padding: "60px 40px 40px", borderTop: "1px solid rgba(255,255,255,.07)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 40, flexWrap: "wrap", alignItems: "flex-start" }}>
        <div style={{ maxWidth: 320 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <span className="font-display" style={{ display: "grid", placeItems: "center", width: 38, height: 38, borderRadius: 10, background: "linear-gradient(140deg,#12805c,#0e2a4d)", color: "#fff", fontWeight: 700, fontSize: 19 }}>Y</span>
            <span className="font-display" style={{ color: "#fff", fontWeight: 600, fontSize: 17 }}>{CLINIC.doctor}</span>
          </div>
          <p style={{ color: "rgba(255,255,255,.55)", fontSize: 14, lineHeight: 1.6, margin: 0 }}>Senior interventional cardiologist. Precision, prevention, and compassion for every heartbeat.</p>
        </div>
        <div style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
          <div>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,.4)", textTransform: "uppercase", marginBottom: 16 }}>Explore</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              {[["#about", "About"], ["#expertise", "Expertise"], ["#procedures", "Procedures"], ["#research", "Research"]].map(([h, t]) => (
                <a key={h} href={h} style={{ color: "rgba(255,255,255,.72)", textDecoration: "none", fontSize: 14 }}>{t}</a>
              ))}
            </div>
          </div>
          <div>
            <div className="font-mono" style={{ fontSize: 11, letterSpacing: 2, color: "rgba(255,255,255,.4)", textTransform: "uppercase", marginBottom: 16 }}>Contact</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
              <a href={`tel:${CLINIC.phoneHref}`} style={{ color: "rgba(255,255,255,.72)", textDecoration: "none", fontSize: 14 }}>{CLINIC.phone}</a>
              <a href={`mailto:${CLINIC.email}`} style={{ color: "rgba(255,255,255,.72)", textDecoration: "none", fontSize: 14 }}>{CLINIC.email}</a>
              <a href={CLINIC.whatsapp} style={{ color: "rgba(255,255,255,.72)", textDecoration: "none", fontSize: 14 }}>WhatsApp</a>
              <span style={{ color: "rgba(255,255,255,.5)", fontSize: 14 }}>Pune, India</span>
            </div>
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "44px auto 0", paddingTop: 22, borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span className="font-mono" style={{ fontSize: 11.5, color: "rgba(255,255,255,.4)" }}>© 2026 {CLINIC.doctor} · All rights reserved</span>
        <span className="font-mono" style={{ fontSize: 11.5, color: "rgba(255,255,255,.4)" }}>Privacy · Terms · Medical Disclaimer</span>
      </div>
    </footer>
  );
}
