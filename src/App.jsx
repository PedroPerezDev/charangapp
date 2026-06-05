import { useState, useEffect, useRef } from "react";

const ACCENT = "#E8303A";
const ACCENT2 = "#F59E0B";
const GRAY_50 = "#F8F9FB";
const GRAY_100 = "#F1F3F6";
const GRAY_200 = "#E4E8EF";
const GRAY_400 = "#9BA3B0";
const GRAY_600 = "#4B5563";
const GRAY_900 = "#111827";

const NAV_LINKS = [
  { label: "Funcionalidades", href: "#funcionalidades" },
  { label: "Módulos", href: "#modulos" },
  { label: "Precios", href: "/precios" },
  { label: "FAQ", href: "#faq" },
];

const FEATURES = [
  { icon: "🎵", title: "Repertorio Digital", desc: "Partituras, audios de referencia y tonalidades siempre accesibles desde el móvil. Adiós a los PDFs perdidos por el grupo de WhatsApp." },
  { icon: "📅", title: "Gestión de Ensayos", desc: "Convocatorias automáticas, control de asistencia y reserva de sala. Todo el equipo siempre sincronizado." },
  { icon: "🎪", title: "Agenda de Actuaciones", desc: "Calendario de fiestas, horarios y contratos centralizados. Nunca más confusión sobre cuándo y dónde." },
  { icon: "👥", title: "Socios y Cuotas", desc: "Control de socios, familias, cobros y remesas bancarias. Gestión financiera sin complicaciones." },
  { icon: "📢", title: "Comunicación Oficial", desc: "Notificaciones push y emails masivos. Un canal único para que la información no se pierda." },
  { icon: "🎖️", title: "Historia y Tradición", desc: "Preserva la memoria de la charanga año a año. Fotos, crónicas e hitos que nunca se olvidan." },
  { icon: "🎟️", title: "Control de Accesos QR", desc: "Dinamiza la entrada a los eventos y evita errores en el control de asistencia con tickets QR." },
  { icon: "🔒", title: "Cumplimiento RGPD", desc: "Datos encriptados en nuestros servidores. Protege los datos sensibles de tus socios y evita problemas legales." },
];

const MODULES = [
  { icon: "🎺", name: "Repertorio", desc: "Partituras y audios de referencia" },
  { icon: "🥁", name: "Ensayos", desc: "Asistencia y reserva de sala" },
  { icon: "🎟️", name: "Eventos QR", desc: "Control de acceso por código" },
  { icon: "🗳️", name: "Votaciones", desc: "Democracia digital segura" },
  { icon: "🎰", name: "Lotería", desc: "Décimos y rifas sin papeles" },
  { icon: "📸", name: "Galería", desc: "Fotos y recuerdos centralizados" },
  { icon: "🏅", name: "Medallas", desc: "Gamificación y reconocimiento" },
  { icon: "🛍️", name: "Tienda", desc: "Merchandising oficial" },
  { icon: "📄", name: "Documentos", desc: "Actas, estatutos y más" },
];

const STEPS = [
  { n: "1", title: "Demo y Personalización", desc: "Nos reunimos contigo para ver las necesidades de tu charanga y ajustamos los módulos a vuestra forma de trabajar." },
  { n: "2", title: "Prueba Gratis 1 Mes", desc: "Disfruta de un mes completo sin compromiso para probar todas las funcionalidades con tu charanga real." },
  { n: "3", title: "Importamos tus Datos", desc: "Pásanos tu Excel o lista actual y nosotros nos encargamos de subir a todos los socios. Carga inicial incluida." },
  { n: "4", title: "¡Lanzamiento!", desc: "App disponible para toda la charanga. Enviamos las claves de acceso automáticamente a cada socio." },
];

const FAQS = [
  { q: "¿Sirve para cualquier tipo de charanga?", a: "Sí. Charangapp está pensada para charangas de fiestas patronales de cualquier tamaño, desde grupos de 20 personas hasta asociaciones con cientos de socios." },
  { q: "¿Es difícil de usar para los músicos mayores?", a: "Para nada. Si saben usar WhatsApp, saben usar Charangapp. Además, un familiar puede gestionar múltiples perfiles desde un solo móvil sin cerrar sesión." },
  { q: "¿Qué pasa con los datos de nuestros socios?", a: "Todos los datos están encriptados en nuestros servidores y cumplimos íntegramente la normativa RGPD. Tus socios están protegidos." },
  { q: "¿Tiene algún coste para el músico?", a: "No. La app para socios es completamente gratuita. Solo paga la directiva por la gestión administrativa." },
  { q: "¿Puedo probarla antes de contratar?", a: "Sí, ofrecemos 1 mes de prueba gratuita con todas las funcionalidades activas y sin necesidad de tarjeta de crédito." },
  { q: "¿Qué pasa si crecemos en número de socios?", a: "El precio se ajusta automáticamente al número de socios activos. Solo pagas por lo que usas, sin sorpresas." },
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

function Anim({ children, delay = 0, style = {}, className = "" }) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      ...style,
    }}>{children}</div>
  );
}

const Pill = ({ children, color = ACCENT }) => (
  <span style={{
    display: "inline-block",
    background: `${color}15`,
    color: color,
    fontFamily: "'Inter', sans-serif",
    fontWeight: 600, fontSize: 12,
    letterSpacing: "0.8px", textTransform: "uppercase",
    padding: "5px 14px", borderRadius: 100,
    border: `1px solid ${color}30`,
    marginBottom: 18,
  }}>{children}</span>
);

function Navbar() {
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
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 24 }}>🎺</span>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 20, color: GRAY_900, letterSpacing: "-0.5px" }}>
            Charang<span style={{ color: ACCENT }}>app</span>
          </span>
        </div>
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

function Hero() {
  return (
    <section style={{
      background: `linear-gradient(180deg, #fff 60%, ${GRAY_50} 100%)`,
      padding: "140px 2rem 100px", textAlign: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* subtle background shapes */}
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
            La solución de gestión<br />para tu{" "}
            <span style={{ color: ACCENT, position: "relative" }}>
              Charanga
              <svg style={{ position: "absolute", bottom: -4, left: 0, width: "100%", height: 6, overflow: "visible" }} viewBox="0 0 200 6" preserveAspectRatio="none">
                <path d="M0,5 Q50,0 100,4 Q150,8 200,3" stroke={ACCENT} strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.5" />
              </svg>
            </span>
          </h1>
        </Anim>

        <Anim delay={120}>
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: "clamp(1rem, 2.2vw, 1.15rem)",
            color: GRAY_600, lineHeight: 1.75, maxWidth: 560, margin: "0 auto 44px",
          }}>
            Charangapp centraliza la organización, elimina el caos de WhatsApp y conecta la directiva con los músicos. Orden, control y tranquilidad.
          </p>
        </Anim>

        <Anim delay={180}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 56 }}>
            <button style={{
              background: ACCENT, color: "#fff", border: "none",
              borderRadius: 12, padding: "15px 36px",
              fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15,
              cursor: "pointer", boxShadow: `0 6px 28px ${ACCENT}40`,
              transition: "all 0.2s",
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
            {[["✓", "App y Web"], ["✓", "Gestión Integral"], ["✓", "Comunicación bidireccional"], ["✓", "RGPD"]].map(([icon, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: ACCENT, fontWeight: 700, fontSize: 14 }}>{icon}</span>
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
            Panel web para la directiva y app móvil para los músicos, conectados en tiempo real.
          </p>
        </Anim>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {[
            {
              badge: "Panel Web", badgeColor: ACCENT, icon: "💻",
              title: "Para la Directiva",
              desc: "El panel de administración. Donde la directiva decide y gestiona el día a día.",
              items: ["Control de socios y familias", "Gestión de cobros, remesas y pagos", "Agenda de actuaciones y ensayos", "Comunicación por push y email", "Gestión del repertorio musical", "Informes y analíticas de participación"],
            },
            {
              badge: "iOS / Android", badgeColor: "#059669", icon: "📱",
              title: "Para los Músicos",
              desc: "Una sola app para todos los socios. Las fiestas en la palma de la mano.",
              items: ["Repertorio siempre disponible", "Convocatorias de ensayo", "Calendario de actuaciones", "Noticias y comunicados oficiales", "Descarga de entradas y tickets QR", "Gestión familiar multi-perfil"],
            },
          ].map(({ badge, badgeColor, icon, title, desc, items }) => (
            <Anim key={title}>
              <div style={{
                background: "#fff", borderRadius: 20,
                border: `1px solid ${GRAY_200}`,
                padding: "40px 36px",
                boxShadow: "0 2px 20px rgba(0,0,0,0.05)",
                transition: "all 0.3s",
                height: "100%",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.1)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 20px rgba(0,0,0,0.05)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
                  <span style={{ fontSize: 28 }}>{icon}</span>
                  <span style={{
                    background: `${badgeColor}12`, color: badgeColor,
                    fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 11,
                    letterSpacing: "1.5px", textTransform: "uppercase",
                    padding: "4px 12px", borderRadius: 100,
                    border: `1px solid ${badgeColor}25`,
                  }}>{badge}</span>
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
            ¿Por qué elegir Charangapp?
          </h2>
          <p style={{ color: GRAY_600, fontFamily: "'Inter', sans-serif", fontSize: 17, maxWidth: 520, margin: "0 auto" }}>
            Mucho más que una app. Es la herramienta definitiva para gestionar tu charanga como una organización profesional.
          </p>
        </Anim>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {FEATURES.map((f, i) => (
            <Anim key={f.title} delay={i * 50}>
              <div style={{
                background: "#fff", border: `1px solid ${GRAY_200}`,
                borderRadius: 16, padding: "28px 24px",
                transition: "all 0.25s",
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

function Modules() {
  return (
    <section id="modulos" style={{ padding: "100px 2rem", background: GRAY_50 }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <Anim style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#fff", border: `1px solid ${GRAY_200}`, borderRadius: 100, padding: "5px 16px 5px 10px", marginBottom: 20 }}>
            <span style={{ background: ACCENT, color: "#fff", fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 100, fontFamily: "'Inter', sans-serif" }}>NUEVO</span>
            <span style={{ color: GRAY_600, fontSize: 13, fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>2 módulos gratis al contratar</span>
          </div>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: GRAY_900, fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16 }}>
            Adapta Charangapp a tu charanga
          </h2>
          <p style={{ color: GRAY_600, fontFamily: "'Inter', sans-serif", fontSize: 17, maxWidth: 480, margin: "0 auto" }}>
            Cada módulo suma las funciones que necesitas. Activa solo lo que usáis.
          </p>
        </Anim>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
          {MODULES.map((m, i) => (
            <Anim key={m.name} delay={i * 40}>
              <div style={{
                background: "#fff", border: `1px solid ${GRAY_200}`,
                borderRadius: 16, padding: "24px 20px",
                transition: "all 0.25s",
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${ACCENT}40`; e.currentTarget.style.boxShadow = "0 6px 28px rgba(0,0,0,0.09)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = GRAY_200; e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ fontSize: 26, marginBottom: 10 }}>{m.icon}</div>
                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 15, color: GRAY_900, marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12.5, color: GRAY_400, lineHeight: 1.5 }}>{m.desc}</div>
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
    <section style={{ padding: "100px 2rem", background: "#fff" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <Anim style={{ textAlign: "center", marginBottom: 72 }}>
          <Pill color={ACCENT}>Cómo funciona</Pill>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: GRAY_900, fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16 }}>
            Digitaliza tu charanga en 4 pasos
          </h2>
          <p style={{ color: GRAY_600, fontFamily: "'Inter', sans-serif", fontSize: 17, maxWidth: 460, margin: "0 auto" }}>
            Hemos simplificado el proceso para que no te suponga ningún esfuerzo extra.
          </p>
        </Anim>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(380px, 1fr))", gap: 16 }}>
          {STEPS.map((s, i) => (
            <Anim key={s.n} delay={i * 70}>
              <div style={{
                display: "flex", gap: 20, alignItems: "flex-start",
                background: "#fff", border: `1px solid ${GRAY_200}`,
                borderRadius: 16, padding: "28px 24px",
                boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                transition: "all 0.25s",
              }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 36px rgba(0,0,0,0.09)"; e.currentTarget.style.borderColor = `${ACCENT}35`; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 1px 8px rgba(0,0,0,0.04)"; e.currentTarget.style.borderColor = GRAY_200; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: `${ACCENT}12`, color: ACCENT,
                  fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 18,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>{s.n}</div>
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
  const PLANS = [
    {
      name: "Plan Pianissimo", emoji: "🎶", price: 9,
      limit: "Hasta 25 músicos", popular: false, color: "#059669",
      items: ["App móvil (iOS y Android)", "Panel de administración", "Gestión de socios y cuotas", "Comunicación push y email", "1 mes gratis sin tarjeta"],
    },
    {
      name: "Plan Forte", emoji: "🎺", price: 19,
      limit: "Hasta 50 músicos", popular: true, color: "#E8303A",
      items: ["Todo lo del Pianissimo", "Repertorio digital incluido", "Gestión de ensayos incluida", "1 módulo a elegir gratis", "Soporte por email"],
    },
    {
      name: "Plan Fortissimo", emoji: "🥁", price: 39,
      limit: "Músicos ilimitados", popular: false, color: "#7C3AED",
      items: ["Todo lo del Forte", "Tickets QR para eventos", "Todos los módulos incluidos", "Soporte prioritario WhatsApp", "App personalizada"],
    },
  ];

  return (
    <section id="precios" style={{ padding: "100px 2rem", background: GRAY_50 }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <Anim style={{ textAlign: "center", marginBottom: 72 }}>
          <Pill color="#059669">Precios</Pill>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: GRAY_900, fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16 }}>
            Elige el plan de tu charanga
          </h2>
          <p style={{ color: GRAY_600, fontFamily: "'Inter', sans-serif", fontSize: 17, maxWidth: 460, margin: "0 auto" }}>
            Tres planes para charangas de cualquier tamaño. Sin costes ocultos, sin contar músicos.
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
                position: "relative", transition: "all 0.3s",
                display: "flex", flexDirection: "column",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = plan.popular ? `0 16px 56px ${ACCENT}28` : "0 10px 40px rgba(0,0,0,0.10)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = plan.popular ? `0 8px 48px ${ACCENT}18` : "0 2px 16px rgba(0,0,0,0.05)"; }}
              >
                {plan.popular && (
                  <div style={{
                    position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                    background: ACCENT, color: "#fff", fontFamily: "'Inter', sans-serif",
                    fontWeight: 700, fontSize: 11, letterSpacing: "1px", textTransform: "uppercase",
                    padding: "5px 18px", borderRadius: 100, whiteSpace: "nowrap",
                  }}>⭐ Más Popular</div>
                )}
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
                <button style={{
                  width: "100%", padding: "14px",
                  background: plan.popular ? ACCENT : "#fff",
                  color: plan.popular ? "#fff" : GRAY_900,
                  border: plan.popular ? "none" : `1.5px solid ${GRAY_200}`,
                  borderRadius: 12, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15,
                  cursor: "pointer", boxShadow: plan.popular ? `0 4px 20px ${ACCENT}40` : "none",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-1px)"; if (plan.popular) { e.currentTarget.style.background = "#C8232C"; } else { e.currentTarget.style.borderColor = plan.color; e.currentTarget.style.color = plan.color; } }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; if (plan.popular) { e.currentTarget.style.background = ACCENT; } else { e.currentTarget.style.borderColor = GRAY_200; e.currentTarget.style.color = GRAY_900; } }}
                >Empezar con {plan.name.split(" ")[1]} →</button>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: GRAY_400, textAlign: "center", marginTop: 10 }}>1 mes gratis · Sin tarjeta</p>
              </div>
            </Anim>
          ))}
        </div>
        <Anim style={{ textAlign: "center" }}>
          <a href="/precios" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: ACCENT, fontWeight: 600, textDecoration: "none", borderBottom: `1px solid ${ACCENT}40`, paddingBottom: 2, transition: "border-color 0.2s" }}>
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
    <section id="faq" style={{ padding: "100px 2rem", background: "#fff" }}>
      <div style={{ maxWidth: 740, margin: "0 auto" }}>
        <Anim style={{ textAlign: "center", marginBottom: 64 }}>
          <Pill>Preguntas Frecuentes</Pill>
          <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: GRAY_900, fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 16 }}>
            Resolvemos tus dudas
          </h2>
          <p style={{ color: GRAY_600, fontFamily: "'Inter', sans-serif", fontSize: 17, maxWidth: 420, margin: "0 auto" }}>
            Las preguntas más habituales de las directivas de charangas.
          </p>
        </Anim>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((faq, i) => (
            <Anim key={i} delay={i * 40}>
              <div style={{
                background: open === i ? "#fff" : GRAY_50,
                border: `1px solid ${open === i ? `${ACCENT}35` : GRAY_200}`,
                borderRadius: 14, overflow: "hidden", transition: "all 0.3s",
                boxShadow: open === i ? `0 4px 24px rgba(0,0,0,0.07)` : "none",
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
            </Anim>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section style={{
      padding: "100px 2rem",
      background: `linear-gradient(135deg, ${ACCENT} 0%, #C8232C 100%)`,
      position: "relative", overflow: "hidden",
    }}>
      <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, borderRadius: "50%", background: "rgba(255,255,255,0.06)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -120, left: -60, width: 500, height: 500, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
      <Anim style={{ maxWidth: 680, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <span style={{ fontSize: 48, display: "block", marginBottom: 24 }}>🎺</span>
        <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: "clamp(2rem, 5vw, 3.2rem)", color: "#fff", fontWeight: 800, letterSpacing: "-1.5px", marginBottom: 18, lineHeight: 1.1 }}>
          Únete a las Charangas Fundadoras
        </h2>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: "rgba(255,255,255,0.8)", marginBottom: 16, lineHeight: 1.65 }}>
          Solo disponible en 2026. Oferta exclusiva: <strong style={{ color: "#fff" }}>tarifa plana de 490€ el primer año</strong> y 50% de descuento de por vida a partir del segundo.
        </p>
        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.6)", marginBottom: 40 }}>Plazas limitadas · Prioridad por orden de registro</p>
        <button style={{
          background: "#fff", color: ACCENT, border: "none",
          borderRadius: 14, padding: "18px 48px",
          fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: 16,
          cursor: "pointer", boxShadow: "0 8px 40px rgba(0,0,0,0.2)",
          transition: "all 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 14px 50px rgba(0,0,0,0.3)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.2)"; }}
        >Quiero ser Charanga Fundadora →</button>
        <div style={{ display: "flex", gap: 28, justifyContent: "center", marginTop: 36, flexWrap: "wrap" }}>
          {["Sin tarjeta necesaria", "Gestión personalizada", "Cancelación inmediata"].map(t => (
            <span key={t} style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: "rgba(255,255,255,0.65)", display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ color: "rgba(255,255,255,0.5)" }}>✓</span> {t}
            </span>
          ))}
        </div>
      </Anim>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: GRAY_900, padding: "56px 2rem 40px" }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 40, marginBottom: 48 }}>
          <div style={{ maxWidth: 280 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>🎺</span>
              <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 20, color: "#fff", letterSpacing: "-0.5px" }}>
                Charang<span style={{ color: ACCENT }}>app</span>
              </span>
            </div>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.65, margin: 0 }}>La plataforma para la gestión de charangas de fiestas patronales.</p>
          </div>
          <div style={{ display: "flex", gap: 64, flexWrap: "wrap" }}>
            {[
              { title: "Producto", links: ["Funcionalidades", "Módulos", "Precios", "Demo"] },
              { title: "Contacto", links: ["Email", "Instagram", "WhatsApp"] },
              { title: "Legal", links: ["Privacidad", "Términos", "Cookies"] },
            ].map(col => (
              <div key={col.title}>
                <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 13, color: "#fff", marginBottom: 16, letterSpacing: "0.3px" }}>{col.title}</h4>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.links.map(l => (
                    <li key={l}><a href="#" style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: "rgba(255,255,255,0.4)", textDecoration: "none", transition: "color 0.2s" }}
                      onMouseEnter={e => e.target.style.color = "#fff"}
                      onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.4)"}
                    >{l}</a></li>
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
        <Modules />
        <HowItWorks />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
