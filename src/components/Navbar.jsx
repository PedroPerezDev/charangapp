import { useState, useEffect } from "react";

const ACCENT = "#E8303A";
const GRAY_600 = "#4B5563";
const GRAY_900 = "#111827";

const NAV_LINKS = [
  { label: "Funcionalidades", href: "/#funcionalidades" },
  { label: "Módulos", href: "/#modulos" },
  { label: "Precios", href: "/precios" },
  { label: "Contacto", href: "/contacto" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "#fff",
      boxShadow: scrolled ? "0 1px 16px rgba(0,0,0,0.08)" : "0 1px 0 rgba(0,0,0,0.06)",
      transition: "box-shadow 0.3s",
    }}>
      <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
        <a href="/" style={{ textDecoration: "none" }}>
          <img src="/logo.png" alt="Charangapp" style={{ height: 32 }} />
        </a>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {NAV_LINKS.map(({ label, href }) => (
            <a key={label} href={href} style={{
              color: GRAY_600, fontSize: 14, fontFamily: "'Inter', sans-serif", fontWeight: 500,
              textDecoration: "none", transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = ACCENT}
              onMouseLeave={e => e.target.style.color = GRAY_600}
            >{label}</a>
          ))}
          <button style={{
            background: ACCENT, color: "#fff", border: "none",
            borderRadius: 10, padding: "10px 22px",
            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14,
            cursor: "pointer", transition: "all 0.2s",
            boxShadow: `0 4px 16px ${ACCENT}35`,
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#C8232C"; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.transform = "translateY(0)"; }}
          >Solicitar Demo</button>
        </div>
      </div>
    </nav>
  );
}
