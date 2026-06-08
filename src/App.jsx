import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const ACCENT = "#E8303A";
const ACCENT2 = "#F59E0B";
const GRAY_50 = "#F8F9FB";
const GRAY_200 = "#E4E8EF";
const GRAY_400 = "#9BA3B0";
const GRAY_600 = "#4B5563";
const GRAY_900 = "#111827";

const FEATURES = [
  { icon: "👥", title: "Gestión de Músicos", desc: "Alta, edición y baja de músicos con foto, teléfono e instrumentos. Marca músicos de confianza y gestiona su actividad fácilmente." },
  { icon: "🎪", title: "Actuaciones", desc: "Crea y edita actuaciones con fecha, lugar y músicos asignados. Distingue entre músicos fijos e invitados en cada fecha." },
  { icon: "💰", title: "Pagos y Cobros", desc: "Asigna importes individuales por actuación, gestiona pagos de desplazamiento y controla en tiempo real lo cobrado y lo pendiente." },
  { icon: "📊", title: "Estadísticas", desc: "Panel con gráficos de ingresos, ranking de músicos por actuaciones, calendario mensual y totales de recaudación." },
  { icon: "📱", title: "Portal del Músico", desc: "Cada músico tiene su propio acceso para ver su historial de actuaciones, cobros pendientes y total ganado en el año." },
  { icon: "📧", title: "Invitaciones por Email", desc: "Sistema de invitaciones seguras con tokens de un solo uso. Da acceso a admins y músicos sin complicaciones." },
  { icon: "🏢", title: "Multi-organización", desc: "Un mismo administrador puede gestionar varias charangas desde una sola cuenta. Ideal para gestores profesionales." },
  { icon: "🌓", title: "Tema Claro y Oscuro", desc: "Toda la aplicación soporta modo claro y oscuro. Cada músico elige el que prefiere desde su perfil." },
];

const STEPS = [
  { n: "1", title: "Solicita tu Demo", desc: "Nos reunimos contigo para conocer tu charanga y configurar la aplicación a vuestra medida." },
  { n: "2", title: "Prueba Gratis 1 Mes", desc: "Acceso completo durante 30 días. Sin tarjeta, sin compromiso, con todos los músicos que necesites." },
  { n: "3", title: "Importamos tus Datos", desc: "Pásanos tu lista y nosotros damos de alta a todos los músicos. Carga inicial incluida sin coste." },
  { n: "4", title: "¡Tu Charanga Lista!", desc: "Músicos con acceso a su portal, pagos bajo control y actuaciones organizadas desde el primer día." },
];

const FAQS = [
  { q: "¿Para qué tipo de charanga es Charangapp?", a: "Para cualquier charanga de fiestas patronales, independientemente del tamaño. Desde grupos de 10 músicos hasta organizaciones con más de 100." },
  { q: "¿Los músicos tienen que pagar algo?", a: "No. El portal del músico es completamente gratuito para ellos. Solo paga la directiva de la charanga." },
  { q: "¿Puedo gestionar varias charangas con una sola cuenta?", a: "Sí. Charangapp soporta multi-organización, por lo que puedes gestionar varias charangas desde el mismo acceso de administrador." },
  { q: "¿Cómo funciona el sistema de pagos?", a: "Puedes asignar un importe por defecto a cada actuación y ajustarlo individualmente por músico. También puedes registrar pagos de desplazamiento por vehículo de forma separada." },
  { q: "¿Es segura la aplicación?", a: "Sí. Usamos Supabase como base de datos con cifrado de datos y cumplimos la normativa RGPD. Las invitaciones usan tokens de un solo uso con 7 días de validez." },
  { q: "¿Puedo probarla antes de contratar?", a: "Sí, ofrecemos 1 mes de prueba gratuita con todas las funcionalidades activas y sin necesidad de tarjeta de crédito." },
];

const PLANS = [
  {
    name: "Plan Pianissimo", emoji: "🎶", price: 9,
    limit: "Hasta 25 músicos", popular: false, color: "#059669",
    items: [
      "Hasta 25 músicos activos",
      "Gestión de actuaciones ilimitadas",
      "Control de pagos y cobros",
      "Portal del músico incluido",
      "Invitaciones por email",
      "Estadísticas básicas",
    ],
  },
  {
    name: "Plan Forte", emoji: "🎺", price: 19,
    limit: "Hasta 50 músicos", popular: true, color: ACCENT,
    items: [
      "Hasta 50 músicos activos",
      "Gestión de actuaciones ilimitadas",
      "Control de pagos y cobros",
      "Portal del músico incluido",
      "Invitaciones por email",
      "Estadísticas completas + gráficos",
      "Calendario de actuaciones",
      "Exportación de datos",
    ],
  },
  {
    name: "Plan Fortissimo", emoji: "🥁", price: 39,
    limit: "Músicos ilimitados", popular: false, color: "#7C3AED",
    items: [
      "Músicos ilimitados",
      "Gestión de actuaciones ilimitadas",
      "Control de pagos y cobros",
      "Portal del músico incluido",
      "Invitaciones por email",
      "Estadísticas completas + gráficos",
      "Calendario de actuaciones",
      "Exportación de datos",
      "Multi-organización",
      "Soporte prioritario WhatsApp",
    ],
  },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function Anim({ children, delay = 0, style = {} }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

const Pill = ({ children, color = ACCENT }) => (
  <span style={{
    display: "inline-block", background: `${color}15`, color,
    fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12,
    letterSpacing: "0.8px", textTransform: "uppercase",
    padding: "5px 14px", borderRadius: 100,
    border: `1px solid ${color}30`, marginBottom: 18,
  }}>{children}</span>
);

function Hero() {
  return (
    <section style={{
      background: `linear-gradient(180deg, #fff 60%, ${GRAY_50} 100%)`,
      padding: "140px 2rem 100px", textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)", width: 900, height: 400, background: `radial-gradient(ellipse, ${ACCENT}08 0%, transparent 70%)`, pointerEvents: "none" }} />
      <div style={{ maxWidth: 820, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <Anim>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: `${ACCENT2}15`, border: `1px solid ${ACCENT2}35`,
            borderRadius: 100, padding: "6px 16px", marginBottom: 32,
          }}>
            <span style={{ fontSize: 13 }}>🎉</span>
            <span style={{ color: "#B45309", fontSize: 13, fontFamily: "'Inter', sans-serif", fontWeight: 600 }}>1 mes gratis para las primeras charangas</span>
          </div>
        </Anim>
        <Anim delay={60}>
          <h1 style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800,
            fontSize: "clamp(2.6rem, 6vw, 4.5rem)", color: GRAY_900,
            lineHeight: 1.1, letterSpacing: "-2px", marginBottom: 24,
          }}>
            Gestiona tu charanga<br />como un{" "}
            <span style={{ color: ACCENT, position: "relative" }}>
              profesional
              <svg style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 6, overflow: "visible" }} viewBox="0 0 200 6" preserveAspectRatio="none">
                <path d="M0,5 Q50,0 100,4 Q150,8 200,3" stroke={ACCENT} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
              </svg>
            </span>
          </h1>
        </Anim>
        <Anim delay={120}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
            color: GRAY_600, lineHeight: 1.75, maxWidth: 580, margin: "0 auto 44px",
          }}>
            Músicos, actuaciones y pagos en un solo lugar. Con portal propio para cada músico y control total para la directiva.
          </p>
        </Anim>
        <Anim delay={180}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
            <button style={{
              background: ACCENT, color: "#fff", border: "none",
              borderRadius: 12, padding: "15px 36px",
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15,
              cursor: "pointer", boxShadow: `0 6px 28px ${ACCENT}40`, transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "#C8232C"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = `0 10px 36px ${ACCENT}55`; }}
              onMouseLeave={e => { e.currentTarget.style.background = ACCENT; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = `0 6px 28px ${ACCENT}40`; }}
            >Solicitar acceso gratuito →</button>
            <button style={{
              background: "#fff", color: GRAY_900,
              border: `1.5px solid ${GRAY_200}`, borderRadius: 12, padding: "15px 36px",
              fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 15,
              cursor: "pointer", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.color = ACCENT; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = GRAY_200; e.currentTarget.style.color = GRAY_900; }}
            >Ver precios</button>
          </div>
        </Anim>
        <Anim delay={240}>
          <div style={{ display: "flex", gap: 36, justifyContent: "center", flexWrap: "wrap" }}>
            {[["👥", "Músicos y pagos"], ["📊", "Estadísticas"], ["📱", "Portal del músico"], ["🔒", "RGPD"]].map(([icon, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 14 }}>{icon}</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: GRAY_600, fontWeight: 500 }}>{label}</span>
              </div>
            ))}
          </div>
        </Anim>
      </div>
    </section>
  );
}

function WhatIs() {
  return (
    <section id="funcionalidades" style={{ padding: "100px 2rem", background: GRAY_50 }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <Anim style={{ textAlign: "center", marginBottom: 64 }}>
          <Pill>¿Qué es Charangapp?</Pill>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: GRAY_900, fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16 }}>
            Dos entornos, una solución
          </h2>
          <p style={{ color: GRAY_600, fontFamily: "'Inter', sans-serif", fontSize: 17, maxWidth: 480, margin: "0 auto" }}>
            Panel web para la directiva y portal propio para cada músico, conectados en tiempo real.
          </p>
        </Anim>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {[
            {
              badge: "Panel Web", badgeColor: ACCENT, icon: "💻",
              title: "Para la Directiva",
              desc: "Control total de la charanga desde el navegador.",
              items: ["Alta y gestión de músicos con foto e instrumentos", "Creación y gestión de actuaciones", "Asignación de pagos individuales por actuación", "Control de cobros pendientes y cobrados", "Estadísticas, gráficos y ranking de músicos", "Invitaciones por email con tokens seguros"],
            },
            {
              badge: "Portal del Músico", badgeColor: "#059669", icon: "📱",
              title: "Para los Músicos",
              desc: "Cada músico tiene su propio acceso personal.",
              items: ["Login con usuario y contraseña propios", "Historial completo de actuaciones", "Ver cobros pendientes y cobrados", "Total ganado en el año y total histórico", "Modo claro y oscuro a su gusto", "Acceso desde móvil y ordenador"],
            },
          ].map(({ badge, badgeColor, icon, title, desc, items }) => (
            <Anim key={title}>
              <div style={{
                background: "#fff", borderRadius: 20, border: `1px solid ${GRAY_200}`,
                padding: "40px 36px", boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
                transition: "all 0.3s", height: "100%",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 20px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <span style={{ fontSize: 28 }}>{icon}</span>
                  <span style={{ background: `${badgeColor}12`, color: badgeColor, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "1.5px", textTransform: "uppercase", padding: "4px 12px", borderRadius: 100, border: `1px solid ${badgeColor}25` }}>{badge}</span>
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 24, color: GRAY_900, marginBottom: 10, letterSpacing: "-0.5px" }}>{title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: GRAY_400, marginBottom: 24, lineHeight: 1.65 }}>{desc}</p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {items.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: `${badgeColor}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: badgeColor, flexShrink: 0, fontWeight: 800 }}>✓</span>
                      <span style={{ color: GRAY_600, fontFamily: "'Inter', sans-serif", fontSize: 14 }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Anim>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section style={{ padding: "100px 2rem", background: "#fff" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <Anim style={{ textAlign: "center", marginBottom: 64 }}>
          <Pill color="#059669">Funcionalidades</Pill>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: GRAY_900, fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16 }}>
            Todo lo que necesita tu charanga
          </h2>
          <p style={{ color: GRAY_600, fontFamily: "'Inter', sans-serif", fontSize: 17, maxWidth: 520, margin: "0 auto" }}>
            Diseñado específicamente para charangas. Sin funciones de más, sin lo que te falta.
          </p>
        </Anim>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <Anim key={f.title} delay={i * 50}>
              <div style={{
                background: "#fff", border: `1px solid ${GRAY_200}`,
                borderRadius: 16, padding: "28px 24px", transition: "all 0.25s",
                boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${ACCENT}40`; e.currentTarget.style.boxShadow = `0 6px 32px rgba(0,0,0,0.09)`; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = GRAY_200; e.currentTarget.style.boxShadow = "0 1px 8px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, color: GRAY_900, marginBottom: 8 }}>{f.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: GRAY_400, lineHeight: 1.65, margin: 0 }}>{f.desc}</p>
              </div>
            </Anim>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section style={{ padding: "100px 2rem", background: GRAY_50 }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Anim style={{ textAlign: "center", marginBottom: 72 }}>
          <Pill color={ACCENT}>Cómo funciona</Pill>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: GRAY_900, fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16 }}>
            Digitaliza tu charanga en 4 pasos
          </h2>
          <p style={{ color: GRAY_600, fontFamily: "'Inter', sans-serif", fontSize: 17, maxWidth: 460, margin: "0 auto" }}>
            Sin curva de aprendizaje. Si sabes usar el móvil, sabes usar Charangapp.
          </p>
        </Anim>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 16 }}>
          {STEPS.map((s, i) => (
            <Anim key={s.n} delay={i * 70}>
              <div style={{
                display: "flex", gap: 20, alignItems: "flex-start",
                background: "#fff", border: `1px solid ${GRAY_200}`,
                borderRadius: 16, padding: "28px 24px",
                boxShadow: "0 1px 8px rgba(0,0,0,0.04)", transition: "all 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 36px rgba(0,0,0,0.09)"; e.currentTarget.style.borderColor = `${ACCENT}35`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 8px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = GRAY_200; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ACCENT}12`, color: ACCENT, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{s.n}</div>
                <div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 16, color: GRAY_900, marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: GRAY_400, lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            </Anim>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="precios" style={{ padding: "100px 2rem", background: "#fff" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <Anim style={{ textAlign: "center", marginBottom: 72 }}>
          <Pill color="#059669">Precios</Pill>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: GRAY_900, fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16 }}>
            Elige el plan de tu charanga
          </h2>
          <p style={{ color: GRAY_600, fontFamily: "'Inter', sans-serif", fontSize: 17, maxWidth: 460, margin: "0 auto" }}>
            Tres planes para charangas de cualquier tamaño. Sin costes ocultos.
          </p>
        </Anim>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, marginBottom: 40 }}>
          {PLANS.map((plan, idx) => (
            <Anim key={plan.name} delay={idx * 80}>
              <div style={{
                background: "#fff",
                border: plan.popular ? `2px solid ${ACCENT}` : `1px solid ${GRAY_200}`,
                borderRadius: 20, padding: "40px 32px",
                boxShadow: plan.popular ? `0 8px 48px ${ACCENT}18` : "0 2px 16px rgba(0,0,0,0.05)",
                position: "relative", transition: "all 0.3s", display: "flex", flexDirection: "column",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = plan.popular ? `0 16px 56px ${ACCENT}28` : "0 10px 40px rgba(0,0,0,0.10)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = plan.popular ? `0 8px 48px ${ACCENT}18` : "0 2px 16px rgba(0,0,0,0.05)"; }}
              >
                {plan.popular && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: ACCENT, color: "#fff", fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 11, letterSpacing: "1px", textTransform: "uppercase", padding: "5px 18px", borderRadius: 100, whiteSpace: "nowrap" }}>⭐ Más Popular</div>}
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <span style={{ fontSize: 26 }}>{plan.emoji}</span>
                  <div>
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 17, color: GRAY_900, letterSpacing: "-0.3px", marginBottom: 2 }}>{plan.name}</h3>
                    <span style={{ background: `${plan.color}12`, color: plan.color, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 11, padding: "2px 10px", borderRadius: 100, border: `1px solid ${plan.color}25` }}>👥 {plan.limit}</span>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 2, margin: "20px 0 4px" }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 52, fontWeight: 800, color: plan.popular ? ACCENT : GRAY_900, letterSpacing: "-2.5px", lineHeight: 1 }}>{plan.price}€</span>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: GRAY_400, marginLeft: 4 }}>/mes</span>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: GRAY_400, marginBottom: 24 }}>+ IVA · Sin permanencia</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 28px", display: "flex", flexDirection: "column", gap: 11, flex: 1 }}>
                  {plan.items.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ color: plan.color, fontSize: 13, fontWeight: 700, flexShrink: 0 }}>✓</span>
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: GRAY_600 }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <button style={{ width: "100%", padding: "14px", background: plan.popular ? ACCENT : "#fff", color: plan.popular ? "#fff" : GRAY_900, border: plan.popular ? "none" : `1.5px solid ${GRAY_200}`, borderRadius: 12, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: plan.popular ? `0 4px 20px ${ACCENT}40` : "none", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; if (plan.popular) { e.currentTarget.style.background = "#C8232C"; } else { e.currentTarget.style.borderColor = plan.color; e.currentTarget.style.color = plan.color; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; if (plan.popular) { e.currentTarget.style.background = ACCENT; } else { e.currentTarget.style.borderColor = GRAY_200; e.currentTarget.style.color = GRAY_900; } }}
                >Empezar con {plan.name.split(" ")[1]} →</button>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: GRAY_400, textAlign: "center", marginTop: 10 }}>1 mes gratis · Sin tarjeta</p>
              </div>
            </Anim>
          ))}
        </div>
        <Anim style={{ textAlign: "center" }}>
          <a href="/precios" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: ACCENT, fontWeight: 600, textDecoration: "none", borderBottom: `1px solid ${ACCENT}40`, paddingBottom: 2 }}>
            Ver comparativa completa de planes →
          </a>
        </Anim>
      </div>
    </section>
  );
}

function FAQ() {
  const [open, setOpen] = useState(null);
  return (
    <section id="faq" style={{ padding: "100px 2rem", background: GRAY_50 }}>
      <div style={{ maxWidth: 740, margin: "0 auto" }}>
        <Anim style={{ textAlign: "center", marginBottom: 64 }}>
          <Pill>Preguntas Frecuentes</Pill>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: GRAY_900, fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16 }}>Resolvemos tus dudas</h2>
          <p style={{ color: GRAY_600, fontFamily: "'Inter', sans-serif", fontSize: 17, maxWidth: 420, margin: "0 auto" }}>Las preguntas más habituales de las directivas de charangas.</p>
        </Anim>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((faq, i) => (
            <Anim key={i} delay={i * 40}>
              <div style={{ background: open === i ? "#fff" : GRAY_50, border: `1px solid ${open === i ? `${ACCENT}35` : GRAY_200}`, borderRadius: 14, overflow: "hidden", transition: "all 0.3s", boxShadow: open === i ? `0 4px 24px rgba(0,0,0,0.07)` : "none" }}>
                <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", padding: "20px 24px", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, textAlign: "left" }}>
                  <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: GRAY_900 }}>{faq.q}</span>
                  <span style={{ width: 28, height: 28, borderRadius: "50%", background: open === i ? `${ACCENT}15` : GRAY_200, display: "flex", alignItems: "center", justifyContent: "center", color: open === i ? ACCENT : GRAY_400, fontSize: 18, flexShrink: 0, transition: "all 0.3s", transform: open === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                </button>
                {open === i && <div style={{ padding: "0 24px 20px" }}><p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14.5, color: GRAY_600, lineHeight: 1.7, margin: 0 }}>{faq.a}</p></div>}
              </div>
            </Anim>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{ padding: "100px 2rem", background: `linear-gradient(135deg, ${ACCENT} 0%, #C8232C 100%)`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -120, left: -60, width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
      <Anim style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <img src="/logo.png" alt="Charangapp" style={{ height: 48, filter: "brightness(0) invert(1)" }} />
        </div>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#fff", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 18, lineHeight: 1.1 }}>
          Empieza la próxima temporada con todo bajo control
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.8)", marginBottom: 40, lineHeight: 1.65 }}>
          Sin papeles, sin Excel, sin grupos de WhatsApp caóticos. Tu charanga merece una herramienta a su altura.
        </p>
        <button style={{ background: "#fff", color: ACCENT, border: "none", borderRadius: 14, padding: "18px 48px", fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 16, cursor: "pointer", boxShadow: "0 8px 40px rgba(0,0,0,0.2)", transition: "all 0.2s" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 50px rgba(0,0,0,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.2)"; }}
        >Solicitar acceso gratuito →</button>
        <div style={{ display: "flex", gap: 28, justifyContent: "center", marginTop: 36, flexWrap: "wrap" }}>
          {["1 mes gratis", "Sin tarjeta", "Cancelación inmediata"].map(t => (
            <span key={t} style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.65)", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>✓</span> {t}
            </span>
          ))}
        </div>
      </Anim>
    </section>
  );
}

export default function App() {
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
        <Hero />
        <WhatIs />
        <Features />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
