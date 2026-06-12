import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ACCENT = "#E8303A";
const GRAY_50 = "#F8F9FB";
const GRAY_200 = "#E4E8EF";
const GRAY_400 = "#9BA3B0";
const GRAY_600 = "#4B5563";
const GRAY_900 = "#111827";

const CONTACT_INFO = [
  {
    icon: "📧",
    title: "Email",
    value: "info@charangapp.com",
    href: "mailto:info@charangapp.com",
    desc: "Te respondemos en menos de 24h",
  },
  {
    icon: "🎺",
    title: "Demo gratuita",
    value: "Solicita tu demo",
    href: "#demo",
    desc: "Te mostramos la app adaptada a tu charanga",
  },
  {
    icon: "⏰",
    title: "Horario de atención",
    value: "Lun — Vie, 9:00 — 18:00",
    href: null,
    desc: "Hora peninsular española",
  },
];

const FAQS = [
  { q: "¿Cuánto tarda la respuesta?", a: "Respondemos todos los emails en menos de 24 horas en días laborables." },
  { q: "¿La demo es gratuita?", a: "Sí, completamente. Te mostramos la app en una videollamada y la adaptamos a las necesidades de tu charanga sin ningún compromiso." },
  { q: "¿Puedo probar la app antes de hablar con vosotros?", a: "Sí, puedes solicitar acceso de prueba directamente desde la página de precios. Tienes 1 mes gratis sin tarjeta." },
];

export default function Contacto() {
  const [tipo, setTipo] = useState("demo");
  const [form, setForm] = useState({ nombre: "", charanga: "", email: "", musicos: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.nombre || !form.email) {
      setError("Por favor rellena al menos tu nombre y email.");
      return;
    }
    setError("");
    setEnviando(true);
    // Simulación de envío — aquí conectarás con el PHP de Resend
    await new Promise(r => setTimeout(r, 1200));
    setEnviando(false);
    setEnviado(true);
  };

  const inputStyle = {
    width: "100%", padding: "13px 16px",
    background: "#fff", border: `1.5px solid ${GRAY_200}`,
    borderRadius: 10, fontFamily: "'Inter', sans-serif", fontSize: 15,
    color: GRAY_900, outline: "none", transition: "border-color 0.2s",
    boxSizing: "border-box",
  };

  const labelStyle = {
    fontFamily: "'Inter', sans-serif", fontWeight: 600,
    fontSize: 13, color: GRAY_600, marginBottom: 6, display: "block",
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #fff; -webkit-font-smoothing: antialiased; }
        input:focus, textarea:focus, select:focus { border-color: ${ACCENT} !important; box-shadow: 0 0 0 3px ${ACCENT}15; }
        input::placeholder, textarea::placeholder { color: ${GRAY_400}; }
      `}</style>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{
          background: `linear-gradient(180deg, #fff 60%, ${GRAY_50} 100%)`,
          padding: "120px 2rem 80px", textAlign: "center",
          position: "relative", overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: 80, left: "50%", transform: "translateX(-50%)", width: 800, height: 300, background: `radial-gradient(ellipse, ${ACCENT}08 0%, transparent 70%)`, pointerEvents: "none" }} />
          <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
            <h1 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: GRAY_900, letterSpacing: "-2px", marginBottom: 18, lineHeight: 1.1 }}>
              Hablemos de tu<br />
              <span style={{ color: ACCENT }}>charanga</span>
            </h1>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: GRAY_600, lineHeight: 1.7 }}>
              ¿Tienes dudas, quieres una demo o simplemente quieres saber más?<br />Estamos aquí para ayudarte.
            </p>
          </div>
        </section>

        {/* Main content */}
        <section style={{ padding: "80px 2rem", background: GRAY_50 }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 48, alignItems: "start" }}>

            {/* Left — Contact info */}
            <div>
              <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 24, color: GRAY_900, letterSpacing: "-0.5px", marginBottom: 8 }}>Información de contacto</h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: GRAY_400, marginBottom: 36, lineHeight: 1.65 }}>
                Elige la forma que más te convenga para ponerte en contacto con nosotros.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 48 }}>
                {CONTACT_INFO.map(item => (
                  <div key={item.title} style={{
                    background: "#fff", border: `1px solid ${GRAY_200}`,
                    borderRadius: 16, padding: "24px 24px",
                    display: "flex", gap: 16, alignItems: "flex-start",
                    boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
                    transition: "all 0.25s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${ACCENT}40`; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = GRAY_200; e.currentTarget.style.boxShadow = "0 1px 8px rgba(0,0,0,0.04)"; e.currentTarget.style.transform = "translateY(0)"; }}
                  >
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: `${ACCENT}10`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 14, color: GRAY_900, marginBottom: 4 }}>{item.title}</div>
                      {item.href ? (
                        <a href={item.href} style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: ACCENT, fontWeight: 600, textDecoration: "none" }}>{item.value}</a>
                      ) : (
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: GRAY_900, fontWeight: 500 }}>{item.value}</div>
                      )}
                      <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: GRAY_400, marginTop: 2 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FAQ rápido */}
              <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: 18, color: GRAY_900, marginBottom: 16 }}>Preguntas rápidas</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {FAQS.map((faq, i) => (
                  <div key={i} style={{
                    background: openFaq === i ? "#fff" : GRAY_50,
                    border: `1px solid ${openFaq === i ? `${ACCENT}35` : GRAY_200}`,
                    borderRadius: 12, overflow: "hidden", transition: "all 0.3s",
                  }}>
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} style={{
                      width: "100%", padding: "16px 18px", background: "none", border: "none",
                      cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, textAlign: "left",
                    }}>
                      <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 600, fontSize: 14, color: GRAY_900 }}>{faq.q}</span>
                      <span style={{ color: openFaq === i ? ACCENT : GRAY_400, fontSize: 18, flexShrink: 0, transition: "transform 0.3s", transform: openFaq === i ? "rotate(45deg)" : "rotate(0)" }}>+</span>
                    </button>
                    {openFaq === i && (
                      <div style={{ padding: "0 18px 16px" }}>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13.5, color: GRAY_600, lineHeight: 1.65, margin: 0 }}>{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div style={{ background: "#fff", border: `1px solid ${GRAY_200}`, borderRadius: 20, padding: "40px 36px", boxShadow: "0 4px 32px rgba(0,0,0,0.07)" }}>
              {enviado ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ fontSize: 56, marginBottom: 20 }}>🎺</div>
                  <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: 24, color: GRAY_900, marginBottom: 12 }}>¡Mensaje enviado!</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: GRAY_600, lineHeight: 1.65 }}>
                    Gracias por contactarnos. Te responderemos en menos de 24 horas en el email que nos has proporcionado.
                  </p>
                  <button onClick={() => { setEnviado(false); setForm({ nombre: "", charanga: "", email: "", musicos: "", mensaje: "" }); }}
                    style={{ marginTop: 28, background: ACCENT, color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
                    Enviar otro mensaje
                  </button>
                </div>
              ) : (
                <>
                  {/* Tipo selector */}
                  <div style={{ display: "flex", gap: 8, marginBottom: 28, background: GRAY_50, borderRadius: 12, padding: 4 }}>
                    {[["demo", "🎯 Solicitar Demo"], ["contacto", "✉️ Contacto General"]].map(([val, label]) => (
                      <button key={val} onClick={() => setTipo(val)} style={{
                        flex: 1, padding: "10px", border: "none", borderRadius: 9,
                        background: tipo === val ? "#fff" : "transparent",
                        color: tipo === val ? GRAY_900 : GRAY_400,
                        fontFamily: "'Inter', sans-serif", fontWeight: tipo === val ? 700 : 500, fontSize: 13,
                        cursor: "pointer", transition: "all 0.2s",
                        boxShadow: tipo === val ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
                      }}>{label}</button>
                    ))}
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                      <div>
                        <label style={labelStyle}>Nombre *</label>
                        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" style={inputStyle}
                          onFocus={e => e.target.style.borderColor = ACCENT}
                          onBlur={e => e.target.style.borderColor = GRAY_200} />
                      </div>
                      <div>
                        <label style={labelStyle}>Email *</label>
                        <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" style={inputStyle}
                          onFocus={e => e.target.style.borderColor = ACCENT}
                          onBlur={e => e.target.style.borderColor = GRAY_200} />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Nombre de la charanga</label>
                      <input name="charanga" value={form.charanga} onChange={handleChange} placeholder="Ej: Charanga Los Alegres" style={inputStyle}
                        onFocus={e => e.target.style.borderColor = ACCENT}
                        onBlur={e => e.target.style.borderColor = GRAY_200} />
                    </div>

                    {tipo === "demo" && (
                      <div>
                        <label style={labelStyle}>Número aproximado de músicos</label>
                        <select name="musicos" value={form.musicos} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer" }}>
                          <option value="">Selecciona un rango</option>
                          <option value="menos25">Menos de 25 músicos</option>
                          <option value="25-50">Entre 25 y 50 músicos</option>
                          <option value="mas50">Más de 50 músicos</option>
                        </select>
                      </div>
                    )}

                    <div>
                      <label style={labelStyle}>{tipo === "demo" ? "¿Alguna pregunta o comentario?" : "Mensaje *"}</label>
                      <textarea name="mensaje" value={form.mensaje} onChange={handleChange}
                        placeholder={tipo === "demo" ? "Cuéntanos algo sobre tu charanga o qué necesitas..." : "Escribe tu mensaje aquí..."}
                        rows={4} style={{ ...inputStyle, resize: "vertical", minHeight: 110 }}
                        onFocus={e => e.target.style.borderColor = ACCENT}
                        onBlur={e => e.target.style.borderColor = GRAY_200} />
                    </div>

                    {error && <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: ACCENT, fontWeight: 500 }}>{error}</p>}

                    <button onClick={handleSubmit} disabled={enviando} style={{
                      width: "100%", padding: "15px",
                      background: enviando ? GRAY_200 : ACCENT,
                      color: enviando ? GRAY_400 : "#fff",
                      border: "none", borderRadius: 12,
                      fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 15,
                      cursor: enviando ? "not-allowed" : "pointer",
                      boxShadow: enviando ? "none" : `0 4px 20px ${ACCENT}40`,
                      transition: "all 0.2s",
                    }}
                      onMouseEnter={e => { if (!enviando) { e.currentTarget.style.background = "#C8232C"; e.currentTarget.style.transform = "translateY(-1px)"; } }}
                      onMouseLeave={e => { if (!enviando) { e.currentTarget.style.background = ACCENT; e.currentTarget.style.transform = "translateY(0)"; } }}
                    >
                      {enviando ? "Enviando..." : tipo === "demo" ? "Solicitar Demo gratuita →" : "Enviar mensaje →"}
                    </button>

                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: GRAY_400, textAlign: "center" }}>
                      Al enviar aceptas nuestra <a href="/privacidad" style={{ color: ACCENT, textDecoration: "none" }}>política de privacidad</a>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
