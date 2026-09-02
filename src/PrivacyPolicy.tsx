import { ArrowLeft, ArrowRight, Globe2, Mail, ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';
import type { Locale } from '../app/page';

type PrivacySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

const privacyCopy: Record<Locale, {
  back: string;
  language: string;
  contact: string;
  eyebrow: string;
  title: string;
  intro: string;
  effective: string;
  summaryTitle: string;
  summary: string[];
  contents: string;
  sections: PrivacySection[];
  providersTitle: string;
  providersIntro: string;
  providers: [string, string][];
  productNotice: string;
  footer: string;
  rights: string;
}> = {
  en: {
    back: 'Back to ClubGamerZone', language: 'Select language', contact: 'Privacy contact', eyebrow: 'Privacy & data protection', title: 'Privacy Policy',
    intro: 'This policy explains how ClubGamerZone handles personal information across our websites, software, mobile and desktop applications, video games, AI-enabled features, customer support, project services and other digital products that link to it.',
    effective: 'Effective and last updated: September 2, 2026', summaryTitle: 'The short version',
    summary: ['We collect only the information needed to operate, improve, secure and support the service you use.', 'We do not sell personal information for money.', 'AI, advertising, analytics and platform services are used only when relevant to a particular product and may have their own privacy controls.', 'You may contact us to access, correct or delete your information, subject to applicable law.'],
    contents: 'In this policy', productNotice: 'A specific app, game, client project or feature may show an additional privacy notice. That notice supplements this policy and controls for that specific product if it describes a different or more detailed practice.',
    providersTitle: 'Service providers and platforms', providersIntro: 'Depending on the product you use, information may be processed by providers such as:',
    providers: [
      ['Netlify and cloud hosting providers', 'Website delivery, serverless functions, security and operational logs.'],
      ['OpenAI or another configured AI provider', 'Processing project questions, prompts, files or other content submitted to an AI-enabled feature.'],
      ['Google services, including Firebase, Analytics, Play and AdMob', 'App operation, authentication, diagnostics, analytics, distribution and advertising when enabled.'],
      ['Apple and other app or game stores', 'Distribution, purchases, subscriptions, store analytics and platform services.'],
      ['Meta and WhatsApp', 'Communications you choose to initiate through WhatsApp or other Meta services.'],
      ['Payment, email, support and development providers', 'Transactions, communications, customer service and reliable product operation.'],
    ],
    sections: [
      { id: 'who-we-are', title: '1. Who we are and what this policy covers', paragraphs: ['ClubGamerZone is an independent software and game development studio based in Barranquilla, Colombia, led by Jose Demoya. For personal information that we decide how and why to process, ClubGamerZone acts as the data controller or responsible party.', 'This policy covers ClubGamerZone-operated services that link to it. When we build or operate technology for a client and process information only on that client’s instructions, the client may be the controller and its own privacy notice applies.'] },
      { id: 'information', title: '2. Information we may collect', bullets: ['Information you provide: name, email address, phone or WhatsApp number, company, project requirements, support messages, account information, survey responses and files or content you choose to submit.', 'Transactions and commercial records: purchases, subscriptions, licenses and billing status. Payment-card details are normally handled by the relevant store or payment provider rather than ClubGamerZone.', 'Technical and usage information: IP address, device and browser type, operating system, app version, language, timestamps, referring pages, interactions, gameplay or feature events, diagnostics, crash reports and security logs.', 'Identifiers and advertising information: device or advertising identifiers, ad impressions and consent choices when a product uses advertising or measurement tools.', 'Approximate location derived from IP address. Precise location, contacts, photos, camera, microphone or similar device permissions are collected only when a product needs the feature, provides notice and requests permission.', 'AI content: prompts, messages, uploaded files and generated responses when you use an AI-enabled feature.', 'Information from platforms and partners: app stores, social sign-in providers, analytics systems, advertising partners and a client organization that gives you access to a service.'] },
      { id: 'uses', title: '3. How we use information', bullets: ['Provide, personalize and maintain websites, apps, games, accounts, licenses and requested features.', 'Respond to inquiries, prepare proposals, provide support and manage customer or client relationships.', 'Process transactions and administer subscriptions through the relevant platform.', 'Operate AI-enabled features and generate responses requested by the user.', 'Measure performance, understand feature use, diagnose crashes and improve products.', 'Display, measure and limit advertising where a product includes ads and applicable consent has been obtained.', 'Protect users, prevent fraud or abuse, enforce terms and maintain service security.', 'Comply with legal obligations, resolve disputes and protect our rights.', 'Send product or marketing communications where permitted. You may unsubscribe from promotional email at any time.'] },
      { id: 'legal-bases', title: '4. Authorization and legal bases', paragraphs: ['We process personal information with your authorization or consent where required, to perform a contract or take requested pre-contract steps, to comply with law, and for legitimate interests such as operating, securing and improving our services when those interests do not override your rights. You may withdraw consent for future processing when consent is the applicable basis.', 'In Colombia, our practices are intended to follow Law 1581 of 2012 and its implementing rules. Additional rights and legal bases may apply depending on where you live.'] },
      { id: 'ai', title: '5. Artificial intelligence', paragraphs: ['AI-enabled features may send the content you submit, limited conversation history and necessary technical context to OpenAI or another configured provider so the feature can respond. Do not submit confidential, highly sensitive or third-party personal information unless the feature specifically requests it and you are authorized to provide it.', 'AI output may be inaccurate. ClubGamerZone does not use the website inquiry assistant to make decisions that produce legal or similarly significant effects. A person confirms project scope, schedules, pricing and contractual decisions. Product-specific notices will explain any materially different AI use.'] },
      { id: 'cookies', title: '6. Cookies, local storage, analytics and advertising', paragraphs: ['The ClubGamerZone website currently uses local browser storage to remember your language preference. Hosting providers may process standard request and security logs. If analytics, advertising pixels or optional cookies are introduced, we will provide appropriate notice and consent controls where required.', 'Some apps and games may use analytics, crash reporting or advertising SDKs such as Google Firebase or AdMob. These tools may process device identifiers, usage events, diagnostics, approximate location and ad interactions. Available controls may include an in-app consent choice, device advertising settings, store settings or a product-specific opt-out. We do not sell personal information for money; certain advertising disclosures may nevertheless be treated as “sharing” or targeted advertising under some laws.'] },
      { id: 'sharing', title: '7. When information is shared', bullets: ['With service providers acting for us under appropriate instructions, safeguards or contractual terms.', 'With app stores, operating-system providers, advertising networks or platforms when needed to provide a feature you choose to use.', 'With a ClubGamerZone client when the service is supplied for that organization and the disclosure is part of the authorized service.', 'With authorities or other parties when reasonably necessary to comply with law, protect safety, investigate abuse or defend legal rights.', 'As part of a merger, financing, acquisition, reorganization or transfer of business assets, subject to appropriate confidentiality and notice requirements.'] },
      { id: 'transfers', title: '8. International processing', paragraphs: ['ClubGamerZone works from Colombia and uses providers that may process information in other countries. Those countries may have different data-protection laws. Where required, we use contracts, consent or other lawful safeguards for international transmission or transfer.'] },
      { id: 'retention', title: '9. Retention', paragraphs: ['We retain personal information only for as long as reasonably needed for the purpose described in this policy, including providing the service, maintaining necessary business and legal records, resolving disputes, preventing abuse and enforcing agreements. Retention varies by data type and product. We delete or anonymize information when it is no longer needed, unless a longer period is legally required.'] },
      { id: 'security', title: '10. Security', paragraphs: ['We use reasonable technical and organizational safeguards appropriate to the nature of the information, including access controls, service-provider controls and secure transport where supported. No internet or storage system is completely secure, so we cannot guarantee absolute security. Please use strong, unique passwords and protect your devices.'] },
      { id: 'rights', title: '11. Your privacy rights', paragraphs: ['Depending on applicable law, you may ask to know whether we process your information; access, update or correct it; request deletion; withdraw authorization; object to or restrict certain processing; request portability; obtain information about its use; or complain to the relevant authority. Colombian residents may also request proof of authorization and file a complaint with the Superintendence of Industry and Commerce after completing any required direct consultation or claim procedure.', 'Email admin@clubgamerzone.com with “Privacy request” in the subject. Describe your request and the product involved. We may verify your identity and authority before acting. We will respond within the periods required by applicable law. Authorized agents may submit requests where legally permitted. We will not discriminate against you for exercising a privacy right.'] },
      { id: 'children', title: '12. Children’s privacy', paragraphs: ['Unless a product-specific notice expressly says otherwise, our services are not directed to children under 13 and we do not knowingly collect their personal information without required parental authorization. If a ClubGamerZone product is designed for children or we learn that children’s information is involved, we will apply appropriate age, parental-consent, advertising, collection and deletion protections required by law. A parent or guardian may contact us about a child’s information.'] },
      { id: 'third-parties', title: '13. Third-party services and links', paragraphs: ['Our services may link to stores, social networks, payment services, client sites or other third parties. Their privacy practices are governed by their own notices. Opening WhatsApp from our inquiry form places the entered details into a message for you to review; Meta receives them only when you choose to continue or send through its service.'] },
      { id: 'changes', title: '14. Changes to this policy', paragraphs: ['We may update this policy when our products, providers or legal obligations change. We will publish the revised version here, update the date above and provide additional notice when a change is material and applicable law requires it.'] },
      { id: 'contact', title: '15. Contact us', paragraphs: ['ClubGamerZone / Jose Demoya · Barranquilla, Colombia · admin@clubgamerzone.com · +57 305 483 9092. Contact us with questions, consultations, claims, authorization withdrawals or requests concerning personal information.'] },
    ],
    footer: 'Software, AI & interactive products.', rights: 'All rights reserved.',
  },
  es: {
    back: 'Volver a ClubGamerZone', language: 'Seleccionar idioma', contact: 'Contacto de privacidad', eyebrow: 'Privacidad y protección de datos', title: 'Política de privacidad',
    intro: 'Esta política explica cómo ClubGamerZone trata la información personal en nuestros sitios web, software, aplicaciones móviles y de escritorio, videojuegos, funciones con IA, soporte al cliente, servicios de proyectos y otros productos digitales que enlacen a este documento.',
    effective: 'Vigente y actualizada por última vez: 2 de septiembre de 2026', summaryTitle: 'La versión breve',
    summary: ['Recopilamos únicamente la información necesaria para operar, mejorar, proteger y apoyar el servicio que utilizas.', 'No vendemos información personal a cambio de dinero.', 'La IA, publicidad, analítica y servicios de plataforma se usan solo cuando corresponden a un producto específico y pueden tener controles de privacidad propios.', 'Puedes contactarnos para conocer, actualizar, corregir o eliminar tu información, sujeto a la ley aplicable.'],
    contents: 'En esta política', productNotice: 'Una aplicación, videojuego, proyecto de cliente o función específica puede mostrar un aviso de privacidad adicional. Ese aviso complementa esta política y prevalece para ese producto cuando describe una práctica diferente o más detallada.',
    providersTitle: 'Proveedores y plataformas', providersIntro: 'Según el producto que utilices, la información puede ser tratada por proveedores como:',
    providers: [
      ['Netlify y proveedores de nube', 'Entrega del sitio, funciones serverless, seguridad y registros operativos.'],
      ['OpenAI u otro proveedor de IA configurado', 'Procesamiento de preguntas, instrucciones, archivos u otro contenido enviado a una función con IA.'],
      ['Servicios de Google, incluidos Firebase, Analytics, Play y AdMob', 'Operación, autenticación, diagnóstico, analítica, distribución y publicidad cuando estén habilitados.'],
      ['Apple y otras tiendas de aplicaciones o videojuegos', 'Distribución, compras, suscripciones, analítica de tienda y servicios de plataforma.'],
      ['Meta y WhatsApp', 'Comunicaciones que decidas iniciar mediante WhatsApp u otros servicios de Meta.'],
      ['Proveedores de pagos, correo, soporte y desarrollo', 'Transacciones, comunicaciones, atención al cliente y operación confiable de productos.'],
    ],
    sections: [
      { id: 'quienes-somos', title: '1. Quiénes somos y qué cubre esta política', paragraphs: ['ClubGamerZone es un estudio independiente de desarrollo de software y videojuegos ubicado en Barranquilla, Colombia, liderado por Jose Demoya. Respecto de la información personal sobre la cual decidimos cómo y para qué se trata, ClubGamerZone actúa como responsable del tratamiento.', 'Esta política cubre los servicios operados por ClubGamerZone que enlacen a ella. Cuando creamos u operamos tecnología para un cliente y tratamos información únicamente siguiendo sus instrucciones, ese cliente puede ser el responsable y aplicará su propio aviso de privacidad.'] },
      { id: 'informacion', title: '2. Información que podemos recopilar', bullets: ['Información que entregas: nombre, correo, teléfono o WhatsApp, empresa, requisitos del proyecto, mensajes de soporte, datos de cuenta, respuestas a encuestas y archivos o contenido que decidas enviar.', 'Registros comerciales y de transacciones: compras, suscripciones, licencias y estado de facturación. Los datos de tarjetas normalmente son tratados por la tienda o proveedor de pagos correspondiente y no por ClubGamerZone.', 'Información técnica y de uso: dirección IP, dispositivo y navegador, sistema operativo, versión de la aplicación, idioma, fechas, páginas de origen, interacciones, eventos de juego o funciones, diagnósticos, fallos y registros de seguridad.', 'Identificadores y publicidad: identificadores del dispositivo o publicitarios, impresiones y elecciones de consentimiento cuando un producto utiliza publicidad o medición.', 'Ubicación aproximada derivada de la IP. La ubicación precisa, contactos, fotos, cámara, micrófono o permisos similares solo se recopilan cuando una función los necesita, se informa al usuario y se solicita permiso.', 'Contenido de IA: instrucciones, mensajes, archivos cargados y respuestas generadas cuando utilizas una función con IA.', 'Información procedente de plataformas y aliados: tiendas de aplicaciones, proveedores de inicio de sesión, sistemas de analítica, aliados publicitarios o una organización cliente que te da acceso a un servicio.'] },
      { id: 'usos', title: '3. Cómo utilizamos la información', bullets: ['Proporcionar, personalizar y mantener sitios, aplicaciones, juegos, cuentas, licencias y funciones solicitadas.', 'Responder consultas, preparar propuestas, brindar soporte y gestionar relaciones con clientes.', 'Procesar transacciones y administrar suscripciones mediante la plataforma correspondiente.', 'Operar funciones con IA y generar las respuestas solicitadas por el usuario.', 'Medir rendimiento, comprender el uso, diagnosticar fallos y mejorar productos.', 'Mostrar, medir y limitar publicidad cuando un producto incluye anuncios y se ha obtenido el consentimiento aplicable.', 'Proteger a los usuarios, prevenir fraude o abuso, hacer cumplir términos y mantener la seguridad.', 'Cumplir obligaciones legales, resolver controversias y proteger nuestros derechos.', 'Enviar comunicaciones de producto o marketing cuando esté permitido. Puedes cancelar los correos promocionales en cualquier momento.'] },
      { id: 'bases-legales', title: '4. Autorización y bases legales', paragraphs: ['Tratamos información personal con tu autorización o consentimiento cuando sea requerido, para ejecutar un contrato o realizar gestiones precontractuales solicitadas, cumplir la ley y atender intereses legítimos como operar, proteger y mejorar los servicios cuando estos no prevalezcan sobre tus derechos. Puedes retirar el consentimiento para tratamientos futuros cuando esa sea la base aplicable.', 'En Colombia, nuestras prácticas buscan cumplir la Ley 1581 de 2012 y sus normas reglamentarias. Pueden aplicarse derechos y bases legales adicionales según tu lugar de residencia.'] },
      { id: 'ia', title: '5. Inteligencia artificial', paragraphs: ['Las funciones con IA pueden enviar el contenido que proporciones, un historial limitado de la conversación y el contexto técnico necesario a OpenAI u otro proveedor configurado para generar la respuesta. No envíes información confidencial, altamente sensible o datos personales de terceros, salvo que la función los solicite específicamente y tengas autorización para proporcionarlos.', 'Las respuestas de IA pueden ser inexactas. ClubGamerZone no utiliza el asistente de consultas del sitio para tomar decisiones con efectos legales o de importancia similar. Una persona confirma el alcance, tiempos, precios y decisiones contractuales. Los avisos específicos explicarán cualquier uso de IA materialmente diferente.'] },
      { id: 'cookies', title: '6. Cookies, almacenamiento local, analítica y publicidad', paragraphs: ['El sitio web de ClubGamerZone utiliza actualmente almacenamiento local del navegador para recordar tu idioma. Los proveedores de alojamiento pueden tratar registros estándar de solicitudes y seguridad. Si incorporamos analítica, píxeles publicitarios o cookies opcionales, ofreceremos el aviso y los controles de consentimiento que correspondan.', 'Algunas aplicaciones y videojuegos pueden utilizar SDK de analítica, diagnóstico o publicidad como Google Firebase o AdMob. Estas herramientas pueden tratar identificadores del dispositivo, eventos de uso, diagnósticos, ubicación aproximada e interacciones con anuncios. Los controles disponibles pueden incluir consentimiento dentro de la aplicación, ajustes publicitarios del dispositivo, opciones de la tienda o exclusión específica del producto. No vendemos información personal a cambio de dinero; algunas divulgaciones publicitarias podrían considerarse “compartir” información o publicidad dirigida bajo ciertas leyes.'] },
      { id: 'divulgacion', title: '7. Cuándo compartimos información', bullets: ['Con proveedores que trabajan para nosotros bajo instrucciones, salvaguardas o condiciones contractuales apropiadas.', 'Con tiendas, proveedores del sistema operativo, redes publicitarias o plataformas cuando sea necesario para ofrecer una función que decidas usar.', 'Con un cliente de ClubGamerZone cuando el servicio se proporciona para esa organización y la divulgación forma parte del servicio autorizado.', 'Con autoridades u otras partes cuando sea razonablemente necesario para cumplir la ley, proteger la seguridad, investigar abusos o defender derechos.', 'Como parte de una fusión, financiación, adquisición, reorganización o transferencia de activos, sujeta a confidencialidad y avisos apropiados.'] },
      { id: 'transferencias', title: '8. Tratamiento internacional', paragraphs: ['ClubGamerZone trabaja desde Colombia y utiliza proveedores que pueden tratar información en otros países, cuyas leyes pueden ser diferentes. Cuando sea necesario, utilizamos contratos, consentimiento u otras salvaguardas legales para la transmisión o transferencia internacional.'] },
      { id: 'conservacion', title: '9. Conservación', paragraphs: ['Conservamos la información solo durante el tiempo razonablemente necesario para la finalidad descrita, incluido prestar el servicio, mantener registros comerciales y legales, resolver controversias, prevenir abusos y hacer cumplir acuerdos. El período varía por producto y tipo de dato. Eliminamos o anonimizamos la información cuando deja de ser necesaria, salvo que la ley exija conservarla durante más tiempo.'] },
      { id: 'seguridad', title: '10. Seguridad', paragraphs: ['Utilizamos salvaguardas técnicas y organizacionales razonables según la naturaleza de la información, como controles de acceso, controles de proveedores y transporte seguro cuando está disponible. Ningún sistema de internet o almacenamiento es totalmente seguro, por lo que no podemos garantizar seguridad absoluta. Usa contraseñas fuertes y únicas y protege tus dispositivos.'] },
      { id: 'derechos', title: '11. Tus derechos de privacidad', paragraphs: ['Según la ley aplicable, puedes solicitar conocer si tratamos tus datos; acceder, actualizar o rectificarlos; pedir su eliminación; revocar la autorización; oponerte o limitar ciertos tratamientos; solicitar portabilidad; obtener información sobre el uso dado; o presentar una queja ante la autoridad competente. Los residentes de Colombia también pueden solicitar prueba de la autorización y presentar queja ante la Superintendencia de Industria y Comercio después de agotar el procedimiento directo de consulta o reclamo cuando corresponda.', 'Escribe a admin@clubgamerzone.com con el asunto “Solicitud de privacidad”. Describe la solicitud y el producto relacionado. Podemos verificar tu identidad y facultades antes de responder. Atenderemos dentro de los plazos legales. Los representantes autorizados pueden presentar solicitudes cuando la ley lo permita. No te discriminaremos por ejercer un derecho de privacidad.'] },
      { id: 'menores', title: '12. Privacidad de menores', paragraphs: ['Salvo que un aviso específico indique expresamente lo contrario, nuestros servicios no están dirigidos a menores de 13 años y no recopilamos conscientemente su información sin la autorización parental requerida. Si un producto de ClubGamerZone está diseñado para menores o conocemos que sus datos están involucrados, aplicaremos las protecciones de edad, consentimiento parental, publicidad, recopilación y eliminación exigidas por la ley. Un padre, madre o tutor puede contactarnos sobre la información de un menor.'] },
      { id: 'terceros', title: '13. Servicios y enlaces de terceros', paragraphs: ['Nuestros servicios pueden enlazar a tiendas, redes sociales, sistemas de pago, sitios de clientes u otros terceros. Sus prácticas se rigen por sus propios avisos. Al abrir WhatsApp desde nuestro formulario, los datos ingresados se colocan en un mensaje para que los revises; Meta los recibe solo cuando decides continuar o enviar mediante su servicio.'] },
      { id: 'cambios', title: '14. Cambios a esta política', paragraphs: ['Podemos actualizar esta política cuando cambien nuestros productos, proveedores u obligaciones legales. Publicaremos aquí la nueva versión, actualizaremos la fecha y daremos aviso adicional cuando el cambio sea material y la ley lo exija.'] },
      { id: 'contacto', title: '15. Contáctanos', paragraphs: ['ClubGamerZone / Jose Demoya · Barranquilla, Colombia · admin@clubgamerzone.com · +57 305 483 9092. Escríbenos para preguntas, consultas, reclamos, revocatorias de autorización o solicitudes relacionadas con información personal.'] },
    ],
    footer: 'Software, IA y productos interactivos.', rights: 'Todos los derechos reservados.',
  },
};

export default function PrivacyPolicy({ locale, chooseLocale }: { locale: Locale; chooseLocale: (locale: Locale) => void }) {
  const c = privacyCopy[locale];

  useEffect(() => {
    document.title = locale === 'es' ? 'Política de privacidad | ClubGamerZone' : 'Privacy Policy | ClubGamerZone';
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = locale === 'es' ? 'Política de privacidad de ClubGamerZone para sitios, software, aplicaciones, videojuegos y funciones con IA.' : 'ClubGamerZone privacy policy for websites, software, apps, games and AI-enabled features.';
  }, [locale]);

  return <main className="privacy-page">
    <div className="inner-header-shell">
      <header className="site-header container inner-site-header">
        <a className="brand" href="/" aria-label="ClubGamerZone home"><img src="/assets/logo.png" alt="ClubGamerZone" /></a>
        <a className="privacy-back" href="/"><ArrowLeft size={16} /> {c.back}</a>
        <div className="header-actions">
          <fieldset className="language-switch"><legend className="sr-only">{c.language}</legend><button type="button" aria-pressed={locale === 'en'} onClick={() => chooseLocale('en')}>EN</button><button type="button" aria-pressed={locale === 'es'} onClick={() => chooseLocale('es')}>ES</button></fieldset>
          <a className="header-cta" href="mailto:admin@clubgamerzone.com">{c.contact} <ArrowRight size={16} /></a>
        </div>
      </header>
    </div>

    <section className="privacy-hero"><div className="hero-grid" aria-hidden="true" /><div className="container privacy-hero-content"><p className="eyebrow"><span /> {c.eyebrow}</p><h1>{c.title}</h1><p>{c.intro}</p><small>{c.effective}</small></div></section>

    <section className="privacy-body"><div className="container privacy-layout">
      <aside className="privacy-sidebar">
        <div className="privacy-summary"><ShieldCheck size={25} /><h2>{c.summaryTitle}</h2><ul>{c.summary.map(item => <li key={item}>{item}</li>)}</ul></div>
        <nav aria-label={c.contents}><strong>{c.contents}</strong>{c.sections.map(section => <a href={`#${section.id}`} key={section.id}>{section.title}</a>)}</nav>
      </aside>

      <article className="privacy-document">
        <p className="privacy-product-notice"><Globe2 size={20} /> <span>{c.productNotice}</span></p>
        {c.sections.slice(0, 6).map(section => <PolicySection section={section} key={section.id} />)}
        <section className="privacy-section" id="providers"><h2>{c.providersTitle}</h2><p>{c.providersIntro}</p><div className="provider-grid">{c.providers.map(([name, purpose]) => <div key={name}><strong>{name}</strong><p>{purpose}</p></div>)}</div></section>
        {c.sections.slice(6).map(section => <PolicySection section={section} key={section.id} />)}
        <a className="privacy-email-card" href="mailto:admin@clubgamerzone.com?subject=Privacy%20request"><Mail size={22} /><span><small>{c.contact}</small><strong>admin@clubgamerzone.com</strong></span><ArrowRight size={18} /></a>
      </article>
    </div></section>

    <footer><div className="container footer-inner"><img src="/assets/logo.png" alt="ClubGamerZone" /><p>{c.footer}</p><div className="socials"><a href="/">{locale === 'es' ? 'Inicio' : 'Home'}</a><a href="/services">{locale === 'es' ? 'Servicios' : 'Services'}</a><a href="mailto:admin@clubgamerzone.com">{locale === 'es' ? 'Contacto' : 'Contact'}</a></div><small>© {new Date().getFullYear()} ClubGamerZone. {c.rights}</small></div></footer>
  </main>;
}

function PolicySection({ section }: { section: PrivacySection }) {
  return <section className="privacy-section" id={section.id}><h2>{section.title}</h2>{section.paragraphs?.map(paragraph => <p key={paragraph}>{paragraph}</p>)}{section.bullets && <ul>{section.bullets.map(item => <li key={item}>{item}</li>)}</ul>}</section>;
}
