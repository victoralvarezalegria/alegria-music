"use client";
import { useLanguage } from "@/contexts/LanguageContext";
import { openConsentSettings } from "@/lib/consent";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Privacy policy (2026-09-17). English and Spanish; other site languages read the English text.
// Describes exactly what this site does: contact / masterclass / waitlist forms and Calendly
// bookings written to ActiveCampaign and the site's own database, ActiveCampaign site tracking
// and first-party attribution (both consent-gated), YouTube/Vimeo/Loom embeds, Vercel hosting.
const UPDATED = "17 September 2026";

export default function PrivacyContent() {
  const { lang } = useLanguage();
  const es = lang === "es";
  return (
    <>
    <Header />
    <main className="max-w-3xl mx-auto px-6 py-16 text-foreground" style={{ fontFamily: "var(--font-body)" }}>
      <h1 className="text-4xl mb-2" style={{ fontFamily: "var(--font-heading)" }}>
        {es ? "Política de privacidad" : "Privacy Policy"}
      </h1>
      <p className="text-sm text-muted-foreground mb-10">{es ? "Última actualización: " : "Last updated: "}{UPDATED}</p>

      {es ? (
        <div className="space-y-8 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl mb-2">1. Responsable del tratamiento</h2>
            <p>Alegría Global LLC (Helsinki, Finlandia), operada por Víctor Álvarez Alegría, es la responsable de los datos personales que se recogen en alegriamusic.net. Contacto: <a className="underline" href="mailto:victoralvarezalegria@gmail.com">victoralvarezalegria@gmail.com</a>.</p>
          </section>
          <section>
            <h2 className="text-xl mb-2">2. Qué datos recogemos</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Datos que nos das:</strong> nombre, correo electrónico, teléfono y lo que escribas en los formularios de contacto, de la masterclass, de la lista de espera y al reservar una llamada.</li>
              <li><strong>Datos de reserva:</strong> cuando reservas una llamada a través de Calendly, Calendly nos comunica tu nombre, correo, la hora elegida y tus respuestas.</li>
              <li><strong>Datos recogidos automáticamente (solo con tu consentimiento):</strong> páginas visitadas, vídeos reproducidos, clics en enlaces, la campaña o el enlace por el que llegaste, tipo de dispositivo y navegador, dirección IP aproximada.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl mb-2">3. Para qué los usamos y con qué base legal</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Responder a tus mensajes y gestionar tu reserva (ejecución del contrato o medidas precontractuales).</li>
              <li>Enviarte la masterclass, la grabación y correos sobre clases y programas (tu consentimiento; puedes darte de baja en cada correo).</li>
              <li>Saber qué anuncio, enlace o correo trae a los alumnos y medir el sitio (tu consentimiento a las cookies).</li>
              <li>Mantener el sitio seguro y funcionando (interés legítimo).</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl mb-2">4. Cookies y seguimiento</h2>
            <p>Las cookies esenciales (idioma, tu elección de cookies) funcionan siempre. Con tu consentimiento cargamos además el seguimiento de sitio de ActiveCampaign y nuestra atribución propia (una cookie con un identificador aleatorio). Si tu navegador envía la señal Global Privacy Control, tratamos tu visita como si hubieras rechazado las cookies. Puedes cambiar tu elección en cualquier momento:{" "}
              <button type="button" className="underline" onClick={openConsentSettings}>configuración de cookies</button>.
            </p>
            <p className="mt-2">Los vídeos incrustados de YouTube, Vimeo y Loom pueden establecer sus propias cookies cuando los reproduces, según las políticas de esos servicios.</p>
          </section>
          <section>
            <h2 className="text-xl mb-2">5. Con quién compartimos los datos</h2>
            <p>Solo con los proveedores que hacen funcionar el sitio, y únicamente para eso: ActiveCampaign (correo y CRM), Calendly (reservas), Vercel (alojamiento), Supabase (base de datos), YouTube, Vimeo y Loom (vídeo). Algunos están en Estados Unidos; las transferencias se amparan en las cláusulas contractuales tipo de la Comisión Europea o en el Marco de Privacidad de Datos UE-EE. UU. No vendemos tus datos.</p>
          </section>
          <section>
            <h2 className="text-xl mb-2">6. Conservación</h2>
            <p>Conservamos tus datos de contacto mientras exista la relación o hasta que te des de baja, y los datos de seguimiento durante un máximo de 24 meses.</p>
          </section>
          <section>
            <h2 className="text-xl mb-2">7. Tus derechos</h2>
            <p>Puedes acceder a tus datos, corregirlos, borrarlos, limitar u oponerte a su tratamiento, pedir su portabilidad y retirar tu consentimiento en cualquier momento escribiendo a <a className="underline" href="mailto:victoralvarezalegria@gmail.com">victoralvarezalegria@gmail.com</a>. También puedes reclamar ante la autoridad de protección de datos de tu país (en Finlandia, la Oficina del Defensor de Protección de Datos).</p>
          </section>
          <section>
            <h2 className="text-xl mb-2">8. Menores</h2>
            <p>El sitio no se dirige a menores de 16 años y no recogemos sus datos a sabiendas.</p>
          </section>
          <section>
            <h2 className="text-xl mb-2">9. Cambios</h2>
            <p>Si cambiamos esta política, actualizaremos la fecha de arriba.</p>
          </section>
        </div>
      ) : (
        <div className="space-y-8 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl mb-2">1. Who is responsible</h2>
            <p>Alegría Global LLC (Helsinki, Finland), operated by Víctor Álvarez Alegría, is the controller of the personal data collected on alegriamusic.net. Contact: <a className="underline" href="mailto:victoralvarezalegria@gmail.com">victoralvarezalegria@gmail.com</a>.</p>
          </section>
          <section>
            <h2 className="text-xl mb-2">2. What we collect</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Data you give us:</strong> your name, email, phone number and whatever you write in the contact, masterclass, waitlist and call-booking forms.</li>
              <li><strong>Booking data:</strong> when you book a call through Calendly, Calendly passes us your name, email, the time you chose and your answers.</li>
              <li><strong>Data collected automatically (only with your consent):</strong> pages visited, videos played, link clicks, the campaign or link that brought you here, device and browser type, approximate IP address.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl mb-2">3. Why we use it and on what legal basis</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>To answer your messages and handle your booking (performance of a contract, or steps you ask for before one).</li>
              <li>To send you the masterclass, the replay and emails about lessons and programs (your consent; every email has an unsubscribe link).</li>
              <li>To learn which ad, link or email brings students, and to measure the site (your cookie consent).</li>
              <li>To keep the site secure and working (legitimate interest).</li>
            </ul>
          </section>
          <section>
            <h2 className="text-xl mb-2">4. Cookies and tracking</h2>
            <p>Essential cookies (language, your cookie choice) always work. With your consent we also load ActiveCampaign site tracking and our own first-party attribution (a cookie holding a random identifier). If your browser sends the Global Privacy Control signal we treat your visit as if you had rejected cookies. You can change your choice at any time:{" "}
              <button type="button" className="underline" onClick={openConsentSettings}>cookie settings</button>.
            </p>
            <p className="mt-2">Embedded YouTube, Vimeo and Loom videos may set their own cookies when you play them, under those services&apos; policies.</p>
          </section>
          <section>
            <h2 className="text-xl mb-2">5. Who we share it with</h2>
            <p>Only the providers that run the site, and only for that: ActiveCampaign (email and CRM), Calendly (bookings), Vercel (hosting), Supabase (database), YouTube, Vimeo and Loom (video). Some are in the United States; transfers rely on the European Commission&apos;s standard contractual clauses or the EU-US Data Privacy Framework. We do not sell your data.</p>
          </section>
          <section>
            <h2 className="text-xl mb-2">6. Retention</h2>
            <p>We keep your contact data for as long as the relationship lasts or until you unsubscribe, and tracking data for at most 24 months.</p>
          </section>
          <section>
            <h2 className="text-xl mb-2">7. Your rights</h2>
            <p>You can access, correct or delete your data, restrict or object to its processing, ask for a copy in a portable format, and withdraw consent at any time by writing to <a className="underline" href="mailto:victoralvarezalegria@gmail.com">victoralvarezalegria@gmail.com</a>. You can also complain to your national data protection authority (in Finland, the Office of the Data Protection Ombudsman).</p>
          </section>
          <section>
            <h2 className="text-xl mb-2">8. Children</h2>
            <p>The site is not aimed at people under 16 and we do not knowingly collect their data.</p>
          </section>
          <section>
            <h2 className="text-xl mb-2">9. Changes</h2>
            <p>If this policy changes, the date at the top changes with it.</p>
          </section>
        </div>
      )}
    </main>
    <Footer />
    </>
  );
}
