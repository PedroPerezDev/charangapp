import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const ACCENT = "#E8303A";
const GRAY_50 = "#F8F9FB";
const GRAY_100 = "#F1F3F6";
const GRAY_200 = "#E4E8EF";
const GRAY_400 = "#9BA3B0";
const GRAY_600 = "#4B5563";
const GRAY_900 = "#111827";

const PLANS = [
  {
    name: "Plan Pianissimo",
    emoji: "🎶",
    tagline: "Para charangas pequeñas",
    price: 25,
    limit: "Hasta 25 músicos",
    popular: false,
    color: "#059669",
    features: [
      { text: "Hasta 25 músicos", highlight: true },
      { text: "App móvil (iOS y Android)", highlight: false },
      { text: "Panel de administración web", highlight: false },
      { text: "Gestión de socios y cuotas", highlight: false },
      { text: "Comunicación oficial (push y email)", highlight: false },
      { text: "Soporte por email", highlight: false },
    ],
    notIncluded: [
      "Repertorio digital",
      "Gestión de ensayos",
      "Tickets QR para eventos",
      "Módulos adicionales",
    ],
  },
  {
    name: "Plan Forte",
    emoji: "🎺",
    tagline: "Para charangas medianas",
    price: 50,
    limit: "Hasta 50 músicos",
    popular: true,
    color: ACCENT,
    features: [
      { text: "Hasta 50 músicos", highlight: true },
      { text: "App móvil (iOS y Android)", highlight: false },
      { text: "Panel de administración web", highlight: false },
      { text: "Gestión de socios y cuotas", highlight: false },
      { text: "Comunicación oficial (push y email)", highlight: false },
      { text: "Repertorio digital incluido", highlight: true },
      { text: "Gestión de ensayos incluida", highlight: true },
      { text: "1 módulo a elegir gratis", highlight: true },
      { text: "Soporte por email", highlight: false },
    ],
    notIncluded: [
      "Tickets QR para eventos",
    ],
  },
  {
    name: "Plan Fortissimo",
    emoji: "🥁",
    tagline: "Para charangas grandes",
    price: 80,
    limit: "Músicos ilimitados",
    popular: false,
    color: "#7C3AED",
    features: [
      { text: "Músicos ilimitados", highlight: true },
      { text: "App móvil (iOS y Android)", highlight: false },
      { text: "Panel de administración web", highlight: false },
      { text: "Gestión de socios y cuotas", highlight: false },
      { text: "Comunicación oficial (push y email)", highlight: false },
      { text: "Repertorio digital incluido", highlight: true },
      { text: "Gestión de ensayos incluida", highlight: true },
      { text: "Tickets QR para eventos", highlight: true },
      { text: "Todos los módulos incluidos", highlight: true },
      { text: "Soporte prioritario por WhatsApp", highlight: true },
    ],
    notIncluded: [],
  },
];

const FAQS = [
  { q: "¿Qué pasa si mi charanga crece y supera el límite del plan?", a: "Puedes cambiar de plan en cualquier momento desde el panel de administración. El cambio se aplica de forma inmediata y solo pagas la diferencia proporcional al mes en curso." },
  { q: "¿El mes gratis incluye todas las funcionalidades?", a: "Sí, el mes de prueba da acceso completo al plan elegido con todos los módulos activos, sin limitaciones y sin necesidad de tarjeta de crédito." },
  { q: "¿Puedo cambiar de plan después de contratarlo?", a: "Sí, puedes subir o bajar de plan cuando quieras. Si subes, el cambio es inmediato. Si bajas, se aplica al inicio del siguiente mes." },
  { q: "¿Cómo se factura, mensual o anual?", a: "La facturación es mensual. No hay permanencia mínima: puedes cancelar cuando quieras sin penalización." },
  { q: "¿Los módulos adicionales tienen coste extra?", a: "En el Plan Fortissimo todos los módulos están incluidos. En Forte tienes 1 gratis. En Pianissimo los módulos tienen un pequeño coste adicional por módulo activo." },
  { q: "¿Tiene algún coste para los músicos?", a: "No. La app para músicos es completamente gratuita. Solo paga la directiva de la charanga." },
];

const MODULES = [
  { icon: "🎵", name: "Repertorio", pianissimo: false, forte: true, fortissimo: true },
  { icon: "📅", name: "Ensayos", pianissimo: false, forte: true, fortissimo: true },
  { icon: "🎟️", name: "Eventos QR", pianissimo: false, forte: false, fortissimo: true },
  { icon: "🗳️", name: "Votaciones", pianissimo: false, forte: false, fortissimo: true },
  { icon: "🎰", name: "Lotería", pianissimo: false, forte: false, fortissimo: true },
  { icon: "📸", name: "Galería", pianissimo: false, forte: false, fortissimo: true },
  { icon: "🏅", name: "Medallas", pianissimo: false, forte: false, fortissimo: true },
  { icon: "🛍️", name: "Tienda", pianissimo: false, forte: false, fortissimo: true },
  { icon: "📄", name: "Documentos", pianissimo: false, forte: false, fortissimo: true },
];



function PlanCards() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, maxWidth: 1060, margin: "0 auto 80px" }}>
      {PLANS.map(plan => (
        <div key={plan.name} style={{
          background: "#fff",
          border: plan.popular ? `2px solid ${ACCENT}` : `1px solid ${GRAY_200}`,
          borderRadius: 20, padding: "40px 32px",
          boxShadow: plan.popular ? `0 8px 48px ${ACCENT}18` : "0 2px 16px rgba(0,0,0,0.05)",
          position: "relative", transition: "transform 0.2s, box-shadow 0.2s",
          display: "flex", flexDirection: "column",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = plan.popular ? `0 16px 56px ${ACCENT}28` : "0 10px 40px rgba(0,0,0,0.10)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = plan.popular ? `0 8px 48px ${ACCENT}18` : "0 2px 16px rgba(0,0,0,0.05)"; }}
        >
          {plan.popular && (
            <div style={{
              position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
              background: ACCENT, color: "#fff",
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 11,
              letterSpacing: "1px", textTransform: "uppercase",
              padding: "5px 18px", borderRadius: 100, whiteSpace: "nowrap",
            }}>⭐ Más Popular</div>
          )}

          {/* Header */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <span style={{ fontSize: 28 }}>{plan.emoji}</span>
              <div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 18, color: GRAY_900, letterSpacing: "-0.3px", marginBottom: 2 }}>{plan.name}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: GRAY_400 }}>{plan.tagline}</p>
              </div>
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: `${plan.color}12`, border: `1px solid ${plan.color}25`,
              borderRadius: 100, padding: "4px 12px",
            }}>
              <span style={{ color: plan.color, fontSize: 11, fontWeight: 700, fontFamily: "'Inter', sans-serif" }}>👥 {plan.limit}</span>
            </div>
          </div>

          {/* Price */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 2 }}>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 56, fontWeight: 800, color: plan.popular ? ACCENT : GRAY_900, letterSpacing: "-3px", lineHeight: 1 }}>{plan.price}€</span>
              <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: GRAY_400, marginLeft: 4 }}>/mes</span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: GRAY_400, marginTop: 4 }}>+ IVA · Sin permanencia</p>
          </div>

          {/* Features */}
          <div style={{ borderTop: `1px solid ${GRAY_100}`, paddingTop: 24, marginBottom: 28, flex: 1 }}>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 11 }}>
              {plan.features.map(({ text, highlight }) => (
                <li key={text} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ color: plan.color, fontSize: 13, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>✓</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: highlight ? GRAY_900 : GRAY_600, fontWeight: highlight ? 600 : 400 }}>{text}</span>
                </li>
              ))}
              {plan.notIncluded.map(text => (
                <li key={text} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ color: GRAY_200, fontSize: 13, fontWeight: 700, flexShrink: 0 }}>✕</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: GRAY_200, textDecoration: "line-through" }}>{text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <button style={{
            width: "100%", padding: "14px",
            background: plan.popular ? ACCENT : "#fff",
            color: plan.popular ? "#fff" : GRAY_900,
            border: plan.popular ? "none" : `1.5px solid ${GRAY_200}`,
            borderRadius: 12, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15,
            cursor: "pointer",
            boxShadow: plan.popular ? `0 4px 20px ${ACCENT}40` : "none",
            transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; if (plan.popular) { e.currentTarget.style.background = "#C8232C"; } else { e.currentTarget.style.borderColor = plan.color; e.currentTarget.style.color = plan.color; } }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; if (plan.popular) { e.currentTarget.style.background = ACCENT; } else { e.currentTarget.style.borderColor = GRAY_200; e.currentTarget.style.color = GRAY_900; } }}
          >Empezar con {plan.name.split(" ")[1]} →</button>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: GRAY_400, textAlign: "center", marginTop: 10 }}>1 mes gratis · Sin tarjeta</p>
        </div>
      ))}
    </div>
  );
}

function ComparisonTable() {
  const Check = ({ color }) => (
    <div style={{ width: 24, height: 24, borderRadius: "50%", background: `${color}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
      <span style={{ color, fontSize: 12, fontWeight: 800 }}>✓</span>
    </div>
  );
  const Cross = () => (
    <span style={{ color: GRAY_200, fontSize: 16, display: "block", textAlign: "center" }}>—</span>
  );

  return (
    <section style={{ padding: "80px 2rem", background: GRAY_50 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: GRAY_900, fontWeight: 800, letterSpacing: "-1px", marginBottom: 12 }}>
            Comparativa de módulos
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: GRAY_600, maxWidth: 440, margin: "0 auto" }}>
            Consulta qué módulos están incluidos en cada plan.
          </p>
        </div>

        <div style={{ background: "#fff", border: `1px solid ${GRAY_200}`, borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 20px rgba(0,0,0,0.05)" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 120px 120px 120px", background: GRAY_50, borderBottom: `1px solid ${GRAY_200}`, padding: "16px 28px", gap: 8 }}>
            <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, fontWeight: 700, color: GRAY_400, letterSpacing: "1px", textTransform: "uppercase" }}>Módulo</span>
            {PLANS.map(p => (
              <div key={p.name} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 16, marginBottom: 2 }}>{p.emoji}</div>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, fontWeight: 700, color: p.popular ? ACCENT : GRAY_600 }}>{p.name.split(" ")[1]}</span>
              </div>
            ))}
          </div>

          {/* Rows */}
          {MODULES.map((m, i) => (
            <div key={m.name} style={{
              display: "grid", gridTemplateColumns: "1fr 120px 120px 120px",
              padding: "15px 28px", alignItems: "center", gap: 8,
              borderBottom: i < MODULES.length - 1 ? `1px solid ${GRAY_100}` : "none",
              transition: "background 0.15s",
            }}
              onMouseEnter={e => e.currentTarget.style.background = GRAY_50}
              onMouseLeave={e => e.currentTarget.style.background = "#fff"}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>{m.icon}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 500, color: GRAY_900 }}>{m.name}</span>
              </div>
              <div>{m.pianissimo ? <Check color="#059669" /> : <Cross />}</div>
              <div>{m.forte ? <Check color={ACCENT} /> : <Cross />}</div>
              <div>{m.fortissimo ? <Check color="#7C3AED" /> : <Cross />}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQSection() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding: "100px 2rem", background: "#fff" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.6rem, 3.5vw, 2.4rem)", color: GRAY_900, fontWeight: 800, letterSpacing: "-1px", marginBottom: 12 }}>
            Preguntas frecuentes
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: GRAY_600 }}>Todo lo que necesitas saber antes de contratar.</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{
              background: open === i ? "#fff" : GRAY_50,
              border: `1px solid ${open === i ? `${ACCENT}35` : GRAY_200}`,
              borderRadius: 14, overflow: "hidden", transition: "all 0.3s",
              boxShadow: open === i ? "0 4px 24px rgba(0,0,0,0.07)" : "none",
            }}>
              <button onClick={() => setOpen(open === i ? null : i)} style={{
                width: "100%", padding: "20px 24px", background: "none", border: "none",
                cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left",
              }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: GRAY_900 }}>{faq.q}</span>
                <span style={{
                  width: 28, height: 28, borderRadius: "50%",
                  background: open === i ? `${ACCENT}15` : GRAY_200,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: open === i ? ACCENT : GRAY_400, fontSize: 18, flexShrink: 0,
                  transition: "all 0.3s", transform: open === i ? "rotate(45deg)" : "rotate(0)",
                }}>+</span>
              </button>
              {open === i && (
                <div style={{ padding: "0 24px 20px" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14.5, color: GRAY_600, lineHeight: 1.7, margin: 0 }}>{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ padding: "80px 2rem", background: `linear-gradient(135deg, ${ACCENT} 0%, #C8232C 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 620, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fff", fontWeight: 800, letterSpacing: "-1px", marginBottom: 16, lineHeight: 1.1 }}>
          ¿No sabes qué plan elegir?
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.8)", marginBottom: 36 }}>
          Solicita una demo gratuita y te ayudamos a encontrar el plan perfecto para tu charanga.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button style={{
            background: "#fff", color: ACCENT, border: "none",
            borderRadius: 12, padding: "15px 36px",
            fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 15,
            cursor: "pointer", boxShadow: "0 6px 28px rgba(0,0,0,0.18)", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 10px 36px rgba(0,0,0,0.25)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,0.18)"; }}
          >Solicitar Demo gratuita →</button>
          <button style={{
            background: "transparent", color: "#fff",
            border: "1.5px solid rgba(255,255,255,0.4)", borderRadius: 12, padding: "15px 36px",
            fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15,
            cursor: "pointer", transition: "all 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)"; e.currentTarget.style.background = "rgba(255,255,255,0.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)"; e.currentTarget.style.background = "transparent"; }}
          >Empezar gratis 1 mes</button>
        </div>
      </div>
    </section>
  );
}



export default function Precios() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #fff; -webkit-font-smoothing: antialiased; }
      `}</style>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ background: `linear-gradient(180deg, #fff 60%, ${GRAY_50} 100%)`, padding: "100px 2rem 72px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#FEF3C7", border: "1px solid #FDE68A", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
            <span style={{ fontSize: 13 }}>🎉</span>
            <span style={{ color: "#B45309", fontSize: 13, fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>1 mes gratis · Sin tarjeta de crédito</span>
          </div>
          <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem, 5vw, 3.8rem)", color: GRAY_900, letterSpacing: "-2px", marginBottom: 18, lineHeight: 1.05 }}>
            Elige el plan de tu charanga
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: GRAY_600, maxWidth: 500, margin: "0 auto 64px", lineHeight: 1.7 }}>
            Tres planes diseñados para charangas de cualquier tamaño. Sin costes ocultos, sin contar músicos.
          </p>
          <PlanCards />
        </section>

        <ComparisonTable />
        <FAQSection />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
