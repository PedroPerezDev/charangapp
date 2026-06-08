const ACCENT = "#E8303A";
const GRAY_900 = "#111827";

export default function Footer() {
  return (
    <footer style={{ background: GRAY_900, padding: "56px 2rem 40px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
          <div style={{ maxWidth: 280 }}>
            <div style={{ marginBottom: 14 }}>
              <img src="/logo.png" alt="Charangapp" style={{ height: 28, filter: "brightness(0) invert(1)" }} />
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.65, margin: 0 }}>
              La plataforma para la gestión de charangas de fiestas patronales.
            </p>
          </div>
          <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
            {[
              { title: "Producto", links: [["Funcionalidades", "/#funcionalidades"], ["Módulos", "/#modulos"], ["Precios", "/precios"], ["Demo", "#"]] },
              { title: "Contacto", links: [["Email", "mailto:demo@charangapp.com"], ["Instagram", "#"], ["WhatsApp", "#"]] },
              { title: "Legal", links: [["Privacidad", "#"], ["Términos", "#"], ["Cookies", "#"]] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", marginBottom: 16, letterSpacing: "0.3px" }}>{col.title}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map(([label, href]) => (
                    <li key={label}>
                      <a href={href} style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                        onMouseEnter={e => e.target.style.color = "#fff"}
                        onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
                      >{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.25)", margin: 0 }}>© 2026 Charangapp. Todos los derechos reservados.</p>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.2)", margin: 0 }}>Hecho con ❤️ en la Comunitat Valenciana</p>
        </div>
      </div>
    </footer>
  );
}
