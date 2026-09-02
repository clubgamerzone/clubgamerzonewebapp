'use client';

import { ArrowLeft, ArrowRight, BrainCircuit, BriefcaseBusiness, Check, CloudCog, Code2, Gamepad2, Layers3, Mail, MapPin, Menu, Phone, ShieldCheck, Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ChatWidget from '../src/ChatWidget';
import LeadForm from '../src/LeadForm';
import PrivacyPolicy from '../src/PrivacyPolicy';

export type Locale = 'en' | 'es';

const serviceIcons = [BrainCircuit, Code2, Layers3, Gamepad2, BriefcaseBusiness];

type ProjectCategory = 'all' | 'ai' | 'business' | 'mobile' | 'web' | 'games' | 'enterprise';
type Project = {
  title: string;
  category: Exclude<ProjectCategory, 'all'>;
  featured?: boolean;
  type: Record<Locale, string>;
  summary?: Record<Locale, string>;
  image?: string;
  imageFit?: 'contain' | 'cover';
  visual?: 'purge';
  link: string;
  unavailable?: boolean;
  wide?: boolean;
};

const projects: Project[] = [
  { title: 'Currículo Claro — CV Enhancer', category: 'ai', featured: true, type: { en: 'Reviewable bilingual AI workflow', es: 'Flujo bilingüe de IA con revisión' }, summary: { en: 'Imports PDF and DOCX résumés, improves them with AI, and keeps every suggested change under the professional’s control.', es: 'Importa hojas de vida en PDF y DOCX, las mejora con IA y mantiene cada cambio sugerido bajo el control del profesional.' }, image: '/assets/curriculo-claro.png', link: '#contact', unavailable: true, wide: true },
  { title: 'Organify', category: 'mobile', featured: true, type: { en: 'AI-assisted personal finance app', es: 'Aplicación de finanzas con asistencia de IA' }, summary: { en: 'A bilingual React Native product for expenses, income, goals, receipts, reminders, and voice-assisted entries.', es: 'Un producto bilingüe en React Native para gastos, ingresos, metas, recibos, recordatorios y registros por voz.' }, image: '/assets/organify.png', imageFit: 'contain', link: 'https://play.google.com/store/apps/dev?hl=en_US&id=8858279390209480103' },
  { title: 'Data Purging Software', category: 'business', featured: true, type: { en: 'Private desktop automation project', es: 'Proyecto privado de automatización de escritorio' }, summary: { en: 'A safeguarded, review-first workflow for managing data cleanup without treating destructive actions casually.', es: 'Un flujo protegido y basado en revisión para gestionar la depuración de datos sin tomar acciones destructivas a la ligera.' }, link: '#contact', unavailable: true, visual: 'purge' },
  { title: 'Veolia — Heavy Clues', category: 'enterprise', featured: true, type: { en: 'Enterprise training experience', es: 'Experiencia de formación empresarial' }, summary: { en: 'A client collaboration that turns learning objectives into memorable interactive play.', es: 'Una colaboración con cliente que convierte objetivos de aprendizaje en una experiencia interactiva memorable.' }, image: '/assets/veolia.png', link: '#contact', unavailable: true },
  { title: 'Hell Cemetery', category: 'games', featured: true, type: { en: 'Original survival horror game', es: 'Videojuego original de terror y supervivencia' }, summary: { en: 'Original IP combining atmospheric world-building, systems design, and cross-platform game production.', es: 'Propiedad intelectual original que combina ambientación, diseño de sistemas y producción multiplataforma.' }, image: '/assets/hell-cemetery.png', link: 'https://play.google.com/store/apps/details?id=com.ClubGamerZone.HellCemeteryMetroivania&hl=en&gl=US' },
  { title: 'Instruments of Faith', category: 'games', featured: true, type: { en: 'Hardcore pixel-art metroidvania', es: 'Metroidvania hardcore en pixel art' }, summary: { en: 'A commercial Unity title shaped through gameplay systems, level design, art direction, and launch execution.', es: 'Un título comercial en Unity desarrollado mediante sistemas de juego, diseño de niveles, dirección artística y lanzamiento.' }, image: '/assets/instruments-of-faith-v2.jpg', link: 'https://store.steampowered.com/app/1664390/The_Instruments_Of_Faith_Paduas_Destiny/?beta=0' },
  { title: 'ClubGamerZone Inquiry Assistant', category: 'ai', type: { en: 'AI customer-inquiry integration', es: 'Integración de IA para consultas de clientes' }, summary: { en: 'A bilingual, brand-aware AI conversation layer connected to a serverless production workflow.', es: 'Una capa bilingüe de conversación con IA, alineada con la marca y conectada a un flujo serverless.' }, link: '#contact', unavailable: true },
  { title: 'The Goal Music', category: 'games', type: { en: 'Music and football game', es: 'Videojuego de música y fútbol' }, image: '/assets/goal-music-v2.jpg', link: 'https://play.google.com/store/search?q=the%20gol%20music&c=apps&hl=es' },
  { title: 'Verneverse', category: 'web', type: { en: 'Immersive multiplayer experience', es: 'Experiencia multijugador inmersiva' }, image: '/assets/verneverse.png', link: 'https://lobby-vernevese.vercel.app/' },
  { title: 'Animatch', category: 'games', type: { en: 'Pet-themed match-box puzzle', es: 'Rompecabezas de combinaciones con mascotas' }, image: '/assets/animatch-v2.webp', link: 'https://play.google.com/store/apps/details?id=com.ClubGamerZone.Animatch&hl=en' },
  { title: 'Golden Buddha', category: 'games', type: { en: 'Online casino game experience', es: 'Experiencia de juego para casino en línea' }, image: '/assets/golden-buddha.png', link: '#contact', unavailable: true },
  { title: 'Save the Pets', category: 'games', type: { en: 'Social-impact mobile game', es: 'Videojuego móvil de impacto social' }, image: '/assets/save-the-pets.png', link: 'https://linktr.ee/savethepets' },
  { title: 'Space Blast', category: 'games', type: { en: 'Arcade action game', es: 'Videojuego arcade de acción' }, image: '/assets/space-blast.png', link: 'https://play.google.com/store/apps/details?id=com.ClubGamerZone.SpaceBlast&hl=en' },
  { title: 'Word Crush — Languages', category: 'games', type: { en: 'Language-learning puzzle game', es: 'Rompecabezas para aprender idiomas' }, image: '/assets/word-crush.jpg', link: 'https://play.google.com/store/apps/details?id=com.SeeingHopeInc.WordCrushLanguages&hl=en' },
];

const content = {
  en: {
    nav: { home: 'Home', services: 'Services', work: 'Work', about: 'About', insights: 'Insights', contact: 'Start a project', menuOpen: 'Open navigation', menuClose: 'Close navigation' },
    sideNote: 'Independent digital studio', worldwide: 'Barranquilla · Worldwide',
    hero: {
      eyebrow: 'Software, AI & interactive experiences', titleStart: 'We turn ambitious ideas into', titleEmphasis: 'working products.',
      lede: 'ClubGamerZone is a product development studio helping teams launch capable software, intelligent automation and memorable digital experiences.', primary: 'Tell us what you’re building', secondary: 'Explore our work', highlightsLabel: 'Company highlights',
      highlights: [['15+', 'years delivering technology'], ['2016', 'founded in Barranquilla'], ['End-to-end', 'strategy through launch']],
      core: 'BUILD / SHIP / EVOLVE', online: 'Systems online', product: 'Product', engineering: 'ENGINEERING', mode: 'Mode', building: 'BUILDING', cloud: 'CLOUD',
    },
    services: [
      ['AI integration', 'Useful assistants, document intelligence and automations woven into your workflow.'],
      ['Custom software', 'SaaS, business applications, internal tools, APIs and desktop products.'],
      ['Web & mobile', 'Websites, portals and cloud-connected React and React Native products.'],
      ['Games & interactive', 'Unity games, training experiences, simulations and prototypes.'],
      ['Product leadership', 'Discovery, roadmaps, technical planning, coordination and accountable delivery.'],
    ],
    capabilitiesIntro: ['What we build', 'One partner for the whole product journey.', 'We combine product thinking, design and engineering so good ideas don’t get lost between agencies, freelancers and platforms.'],
    capabilities: [
      ['Web, mobile & desktop', 'Customer portals, internal tools, SaaS platforms and native experiences designed to feel effortless.', ['React', 'React Native', 'Modern web', 'Desktop']],
      ['AI agents & automation', 'Practical AI that searches knowledge, supports customers, accelerates teams and removes repetitive work.', ['AI agents', 'RAG', 'Workflow automation', 'Integrations']],
      ['Games & immersive media', 'From original entertainment to training simulations, we build interactive experiences people remember.', ['Unity', '2D / 3D', 'Mobile games', 'Serious games']],
      ['Cloud, APIs & modernization', 'Reliable backends, connected systems and thoughtful rebuilds that help your product grow without the drag.', ['Cloud', 'APIs', 'Architecture', 'Migration']],
    ],
    work: {
      kicker: 'Selected work', title: 'Software, AI, mobile products and interactive experiences.', copy: 'A focused selection that shows our range beyond games—from business software and AI workflows to mobile products and enterprise learning.', view: 'View project', ask: 'Request a walkthrough', viewLabel: 'View', askLabel: 'Ask about',
      released: 'Project archive', moreTitle: 'More work across our product universe.', moreCopy: 'Explore additional releases and experiments by discipline.',
      filters: [['all', 'All'], ['ai', 'AI & Automation'], ['business', 'Business Software'], ['mobile', 'Web & Mobile'], ['games', 'Games & Interactive'], ['enterprise', 'Enterprise & Client Work']],
      noResults: 'No featured case studies are available in this category yet.',
      client: 'Client collaboration', clientCopy: 'An enterprise training experience that turns learning objectives into engaging interactive play.', quote: 'Serious goals deserve memorable experiences.',
    },
    process: {
      kicker: 'How we deliver', title: <>Clear thinking.<br />Visible progress.<br /><em>Accountable leadership.</em></>, copy: 'Product and project leadership is built into the engagement. You stay close to the work, see what is taking shape, understand risks and always know what comes next.',
      steps: [['Discover', 'We clarify the opportunity, users, constraints and the result that matters.'], ['Design', 'We make the experience tangible early, aligning product, technology and scope.'], ['Build', 'A senior team ships in visible increments with quality and maintainability built in.'], ['Launch & evolve', 'We release confidently, learn from real use and improve what creates value.']],
    },
    about: {
      kicker: 'About ClubGamerZone', title: 'Curiosity started it. Craft keeps it moving.', first: 'Founded in February 2016 by Jose Demoya, ClubGamerZone began as a video-game review platform and grew into a software and game development studio. From Barranquilla, Colombia, we collaborate with clients who want to turn a strong idea into a dependable product.', second: 'Our team brings more than 15 years of technology experience, balancing inventive thinking with the discipline required to ship.', values: ['Direct collaboration', 'Senior technical thinking', 'Built for long-term value'],
    },
    insights: { kicker: 'Insights', title: 'Experience we share, not just claim.', copy: 'Selected practical writing from our work in cloud delivery, mobile engineering and product development.', articles: [['Deploying a .NET backend to Azure with CI/CD', 'Cloud engineering', 'https://clubgamerzone.com/lesson-8-deploying-your-net-backend-in-azure-free-tier-with-ci-cd/'], ['Building a React Native app with Firebase', 'Mobile engineering', 'https://clubgamerzone.com/how-to-build-a-react-native-app-part-1-setting-up-your-environment/']] },
    servicesPage: {
      eyebrow: 'Services', title: 'A senior product partner from first question to working release.', copy: 'Hire us to discover, design, build and evolve software, AI systems, digital products and interactive experiences—with one accountable team throughout.', back: 'Back to home', cta: 'Discuss your project', included: 'What we can deliver', leadershipKicker: 'Product & project leadership', leadershipTitle: 'Direction and accountability are part of the build.', leadershipCopy: 'We turn ambiguity into a practical roadmap, coordinate technical decisions, surface risks early and keep delivery moving in visible increments.', leadershipPoints: ['Product discovery and requirements', 'Roadmaps and technical planning', 'Team and stakeholder coordination', 'Risk, scope and delivery management', 'Launch support and continuous improvement'],
      details: [
        ['AI Integration & Automation', 'Put AI to work inside real operations—not as a disconnected demo.', ['Customer-service assistants and chatbots', 'Document processing and structured extraction', 'Internal knowledge search and RAG', 'Workflow automation and AI integrations']],
        ['Custom Software Development', 'Purpose-built systems that match how your business actually works.', ['SaaS products and business applications', 'Internal tools and desktop software', 'APIs and system integrations', 'Modernization and migration']],
        ['Web & Mobile Applications', 'Fast, accessible customer experiences connected to dependable cloud services.', ['Marketing websites and portals', 'React and React Native applications', 'Firebase and cloud-connected products', 'Responsive UX and ongoing evolution']],
        ['Games & Interactive Experiences', 'Commercial entertainment and serious experiences built with game-development craft.', ['Unity development', 'Mobile and browser games', 'Educational and training games', 'Prototypes, simulations and multiplayer']],
        ['Product & Project Leadership', 'Senior guidance that connects business goals, people and technology.', ['Discovery and roadmap definition', 'Technical planning and architecture', 'Team coordination and risk management', 'Incremental delivery and launch support']],
      ],
    },
    contact: { kicker: 'Start a conversation', title: 'Have an idea worth building?', copy: 'Tell us what you want to create, improve or automate. We’ll help you find the clearest path forward.', studio: 'Studio', studioValue: 'Barranquilla, Colombia — working worldwide', availability: 'Availability', availabilityValue: 'Monday–Saturday, 8:00–17:00' },
    footer: 'Software, AI & interactive products.', rights: 'All rights reserved.',
  },
  es: {
    nav: { home: 'Inicio', services: 'Servicios', work: 'Proyectos', about: 'Nosotros', insights: 'Ideas', contact: 'Inicia un proyecto', menuOpen: 'Abrir navegación', menuClose: 'Cerrar navegación' },
    sideNote: 'Estudio digital independiente', worldwide: 'Barranquilla · Para todo el mundo',
    hero: {
      eyebrow: 'Software, IA y experiencias interactivas', titleStart: 'Convertimos ideas ambiciosas en', titleEmphasis: 'productos reales.',
      lede: 'ClubGamerZone es un estudio de desarrollo de productos que ayuda a equipos a lanzar software robusto, automatización inteligente y experiencias digitales memorables.', primary: 'Cuéntanos qué quieres construir', secondary: 'Explora nuestro trabajo', highlightsLabel: 'Aspectos destacados de la empresa',
      highlights: [['15+', 'años creando tecnología'], ['2016', 'fundada en Barranquilla'], ['Integral', 'de la estrategia al lanzamiento']],
      core: 'CREAR / LANZAR / EVOLUCIONAR', online: 'Sistemas activos', product: 'Producto', engineering: 'INGENIERÍA', mode: 'Modo', building: 'CREANDO', cloud: 'NUBE',
    },
    services: [
      ['Integración de IA', 'Asistentes, inteligencia documental y automatizaciones integradas en tus procesos.'],
      ['Software a la medida', 'SaaS, aplicaciones empresariales, herramientas internas, APIs y escritorio.'],
      ['Web y móvil', 'Sitios, portales y productos conectados a la nube con React y React Native.'],
      ['Videojuegos e interacción', 'Juegos en Unity, formación, simulaciones y prototipos.'],
      ['Liderazgo de producto', 'Descubrimiento, roadmaps, planeación, coordinación y entregas responsables.'],
    ],
    capabilitiesIntro: ['Lo que construimos', 'Un solo aliado para todo el recorrido del producto.', 'Combinamos estrategia de producto, diseño e ingeniería para que las buenas ideas no se pierdan entre agencias, freelancers y plataformas.'],
    capabilities: [
      ['Web, móvil y escritorio', 'Portales para clientes, herramientas internas, plataformas SaaS y experiencias nativas diseñadas para sentirse sencillas.', ['React', 'React Native', 'Web moderna', 'Escritorio']],
      ['Agentes de IA y automatización', 'IA práctica que consulta conocimiento, atiende clientes, acelera equipos y elimina trabajo repetitivo.', ['Agentes de IA', 'RAG', 'Automatización', 'Integraciones']],
      ['Videojuegos y medios inmersivos', 'Desde entretenimiento original hasta simulaciones de formación: creamos experiencias que las personas recuerdan.', ['Unity', '2D / 3D', 'Juegos móviles', 'Juegos serios']],
      ['Nube, APIs y modernización', 'Backends confiables, sistemas conectados y reconstrucciones bien planeadas para que tu producto crezca sin fricción.', ['Nube', 'APIs', 'Arquitectura', 'Migración']],
    ],
    work: {
      kicker: 'Proyectos seleccionados', title: 'Software, IA, productos móviles y experiencias interactivas.', copy: 'Una selección enfocada que demuestra nuestro alcance más allá de los videojuegos: software empresarial, flujos de IA, productos móviles y formación corporativa.', view: 'Ver proyecto', ask: 'Solicitar demostración', viewLabel: 'Ver', askLabel: 'Preguntar por',
      released: 'Archivo de proyectos', moreTitle: 'Más trabajo de nuestro universo de productos.', moreCopy: 'Explora lanzamientos y experimentos adicionales por disciplina.',
      filters: [['all', 'Todos'], ['ai', 'IA y automatización'], ['business', 'Software empresarial'], ['mobile', 'Web y móvil'], ['games', 'Juegos e interacción'], ['enterprise', 'Empresas y clientes']],
      noResults: 'Todavía no hay casos destacados disponibles en esta categoría.',
      client: 'Colaboración con cliente', clientCopy: 'Una experiencia de formación empresarial que convierte objetivos de aprendizaje en una experiencia interactiva y atractiva.', quote: 'Los objetivos importantes merecen experiencias memorables.',
    },
    process: {
      kicker: 'Cómo entregamos', title: <>Ideas claras.<br />Progreso visible.<br /><em>Liderazgo responsable.</em></>, copy: 'El liderazgo de producto y proyecto está incluido. Te mantienes cerca del trabajo, conoces los riesgos, ves cómo toma forma y siempre sabes cuál es el siguiente paso.',
      steps: [['Descubrir', 'Definimos la oportunidad, los usuarios, las restricciones y el resultado que realmente importa.'], ['Diseñar', 'Hacemos tangible la experiencia desde temprano, alineando producto, tecnología y alcance.'], ['Construir', 'Un equipo sénior entrega avances visibles con calidad y mantenibilidad desde el inicio.'], ['Lanzar y evolucionar', 'Publicamos con confianza, aprendemos del uso real y mejoramos aquello que crea valor.']],
    },
    about: {
      kicker: 'Sobre ClubGamerZone', title: 'La curiosidad nos puso en marcha. La experiencia nos hace avanzar.', first: 'Fundada en febrero de 2016 por Jose Demoya, ClubGamerZone comenzó como una plataforma de reseñas de videojuegos y creció hasta convertirse en un estudio de desarrollo de software y videojuegos. Desde Barranquilla, Colombia, colaboramos con clientes que quieren convertir una buena idea en un producto confiable.', second: 'Nuestro equipo reúne más de 15 años de experiencia tecnológica, combinando pensamiento creativo con la disciplina necesaria para lanzar productos.', values: ['Colaboración directa', 'Criterio técnico sénior', 'Productos con valor duradero'],
    },
    insights: { kicker: 'Ideas y experiencia', title: 'Experiencia que compartimos, no solo afirmamos.', copy: 'Contenido práctico seleccionado de nuestro trabajo en nube, desarrollo móvil y productos digitales.', articles: [['Despliegue de un backend .NET en Azure con CI/CD', 'Ingeniería en la nube', 'https://clubgamerzone.com/lesson-8-deploying-your-net-backend-in-azure-free-tier-with-ci-cd/'], ['Cómo crear una aplicación React Native con Firebase', 'Ingeniería móvil', 'https://clubgamerzone.com/how-to-build-a-react-native-app-part-1-setting-up-your-environment/']] },
    servicesPage: {
      eyebrow: 'Servicios', title: 'Un aliado sénior de producto desde la primera pregunta hasta el lanzamiento.', copy: 'Contrátanos para descubrir, diseñar, construir y evolucionar software, sistemas de IA, productos digitales y experiencias interactivas con un solo equipo responsable.', back: 'Volver al inicio', cta: 'Conversemos sobre tu proyecto', included: 'Lo que podemos entregar', leadershipKicker: 'Liderazgo de producto y proyecto', leadershipTitle: 'La dirección y la responsabilidad son parte del desarrollo.', leadershipCopy: 'Convertimos la ambigüedad en un roadmap práctico, coordinamos decisiones técnicas, hacemos visibles los riesgos y mantenemos el avance en entregas claras.', leadershipPoints: ['Descubrimiento y requisitos de producto', 'Roadmaps y planeación técnica', 'Coordinación de equipos e interesados', 'Gestión de riesgos, alcance y entregas', 'Apoyo en lanzamiento y mejora continua'],
      details: [
        ['Integración de IA y automatización', 'Ponemos la IA a trabajar dentro de operaciones reales, no como una demostración aislada.', ['Asistentes y chatbots de atención', 'Procesamiento y extracción de documentos', 'Búsqueda interna de conocimiento y RAG', 'Automatización de flujos e integraciones']],
        ['Desarrollo de software a la medida', 'Sistemas creados para la manera en que realmente funciona tu empresa.', ['Productos SaaS y aplicaciones empresariales', 'Herramientas internas y software de escritorio', 'APIs e integraciones de sistemas', 'Modernización y migración']],
        ['Aplicaciones web y móviles', 'Experiencias rápidas y accesibles conectadas a servicios confiables en la nube.', ['Sitios de marketing y portales', 'Aplicaciones React y React Native', 'Productos conectados con Firebase y la nube', 'UX responsive y evolución continua']],
        ['Videojuegos y experiencias interactivas', 'Entretenimiento comercial y experiencias serias creadas con oficio de desarrollo de videojuegos.', ['Desarrollo en Unity', 'Juegos móviles y de navegador', 'Juegos educativos y de formación', 'Prototipos, simulaciones y multijugador']],
        ['Liderazgo de producto y proyecto', 'Guía sénior que conecta objetivos de negocio, personas y tecnología.', ['Descubrimiento y definición de roadmap', 'Planeación técnica y arquitectura', 'Coordinación de equipo y gestión de riesgos', 'Entrega incremental y apoyo al lanzamiento']],
      ],
    },
    contact: { kicker: 'Iniciemos una conversación', title: '¿Tienes una idea que vale la pena construir?', copy: 'Cuéntanos qué quieres crear, mejorar o automatizar. Te ayudaremos a encontrar el camino más claro para hacerlo realidad.', studio: 'Estudio', studioValue: 'Barranquilla, Colombia — trabajando para todo el mundo', availability: 'Horario', availabilityValue: 'Lunes a sábado, 8:00–17:00' },
    footer: 'Software, IA y productos interactivos.', rights: 'Todos los derechos reservados.',
  },
} as const;

function SiteHeader({ locale, chooseLocale, inner = false }: { locale: Locale; chooseLocale: (locale: Locale) => void; inner?: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const c = content[locale];
  const navLinks = inner
    ? [['/', c.nav.home], ['/#work', c.nav.work], ['/#about', c.nav.about], ['/#insights', c.nav.insights]] as const
    : [['/services', c.nav.services], ['#work', c.nav.work], ['#about', c.nav.about], ['#insights', c.nav.insights]] as const;

  function changeLocale(nextLocale: Locale) {
    chooseLocale(nextLocale);
    setMenuOpen(false);
  }

  return (
    <header className={`site-header container${inner ? ' inner-site-header' : ''}`}>
      <a className="brand" href="/" aria-label="ClubGamerZone home"><img src="/assets/logo.png" alt="ClubGamerZone" /></a>
      <nav className="primary-nav" aria-label={locale === 'es' ? 'Navegación principal' : 'Primary navigation'}>{navLinks.map(([href, label]) => <a href={href} key={href}>{label}</a>)}</nav>
      <div className="header-actions">
        <fieldset className="language-switch"><legend className="sr-only">{locale === 'es' ? 'Seleccionar idioma' : 'Select language'}</legend><button type="button" aria-pressed={locale === 'en'} onClick={() => changeLocale('en')}>EN</button><button type="button" aria-pressed={locale === 'es'} onClick={() => changeLocale('es')}>ES</button></fieldset>
        <a className="header-cta" href="/#contact">{c.nav.contact} <ArrowRight size={16} /></a>
        <button className="mobile-menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? c.nav.menuClose : c.nav.menuOpen} onClick={() => setMenuOpen(current => !current)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
      </div>
      {menuOpen && <nav className="mobile-nav" id="mobile-navigation" aria-label={locale === 'es' ? 'Navegación móvil' : 'Mobile navigation'}>{navLinks.map(([href, label]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}<ArrowRight size={16} /></a>)}<a className="mobile-nav-cta" href="/#contact" onClick={() => setMenuOpen(false)}>{c.nav.contact}<ArrowRight size={16} /></a></nav>}
    </header>
  );
}

function ServicesPage({ locale, chooseLocale }: { locale: Locale; chooseLocale: (locale: Locale) => void }) {
  const c = content[locale];
  return (
    <main className="services-page">
      <div className="inner-header-shell"><SiteHeader locale={locale} chooseLocale={chooseLocale} inner /></div>
      <section className="services-page-hero"><div className="hero-grid" aria-hidden="true" /><div className="container services-page-hero-content"><a className="back-link" href="/"><ArrowLeft size={16} /> {c.servicesPage.back}</a><p className="eyebrow"><span /> {c.servicesPage.eyebrow}</p><h1>{c.servicesPage.title}</h1><p>{c.servicesPage.copy}</p><a className="button button-primary" href="/#contact">{c.servicesPage.cta} <ArrowRight size={18} /></a></div></section>
      <section className="section service-detail-section"><div className="container"><div className="section-heading"><p className="kicker">{c.servicesPage.included}</p><h2>{c.capabilitiesIntro[1]}</h2><p>{c.capabilitiesIntro[2]}</p></div><div className="service-detail-grid">{c.servicesPage.details.map(([title, copy, items], index) => { const Icon = serviceIcons[index]; return <article className="service-detail-card" key={title}><div className="service-detail-icon"><Icon size={24} /></div><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{copy}</p><ul>{items.map(item => <li key={item}><Check size={15} /> {item}</li>)}</ul></article>; })}</div></div></section>
      <section className="section leadership-section"><div className="container leadership-layout"><div><p className="kicker">{c.servicesPage.leadershipKicker}</p><h2>{c.servicesPage.leadershipTitle}</h2><p>{c.servicesPage.leadershipCopy}</p><a className="button button-primary" href="/#contact">{c.servicesPage.cta} <ArrowRight size={18} /></a></div><div className="leadership-points">{c.servicesPage.leadershipPoints.map((point, index) => <div key={point}><span>{String(index + 1).padStart(2, '0')}</span><strong>{point}</strong></div>)}</div></div></section>
      <footer><div className="container footer-inner"><img src="/assets/logo.png" alt="ClubGamerZone" /><p>{c.footer}</p><div className="socials"><a href="https://www.linkedin.com/company/clubgamerzonesoftware/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.instagram.com/clubgamerzone/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.youtube.com/c/clubgamerzone" target="_blank" rel="noreferrer">YouTube</a><a href="/privacy-policy">{locale === 'es' ? 'Privacidad' : 'Privacy'}</a></div><small>© {new Date().getFullYear()} ClubGamerZone. {c.rights}</small></div></footer>
      <ChatWidget locale={locale} />
    </main>
  );
}

export default function Home() {
  const [locale, setLocale] = useState<Locale>(() => {
    if (typeof window === 'undefined') return 'en';
    const params = new URLSearchParams(window.location.search);
    const preferred = params.get('lang') || window.localStorage.getItem('cgz-language') || (navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en');
    return preferred === 'es' ? 'es' : 'en';
  });
  const [workFilter, setWorkFilter] = useState<ProjectCategory>('all');
  const c = content[locale];

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem('cgz-language', locale);
  }, [locale]);

  function chooseLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    const url = new URL(window.location.href);
    if (nextLocale === 'es') url.searchParams.set('lang', 'es');
    else url.searchParams.delete('lang');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }

  if (window.location.pathname.replace(/\/+$/, '') === '/services') return <ServicesPage locale={locale} chooseLocale={chooseLocale} />;
  if (window.location.pathname.replace(/\/+$/, '') === '/privacy-policy') return <PrivacyPolicy locale={locale} chooseLocale={chooseLocale} />;

  const featuredProjects = projects.filter(project => project.featured && (workFilter === 'all' || project.category === workFilter || (workFilter === 'mobile' && project.category === 'web')));
  const archiveProjects = projects.filter(project => !project.featured && (workFilter === 'all' || project.category === workFilter || (workFilter === 'mobile' && project.category === 'web')));

  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-grid" aria-hidden="true" /><div className="hero-atmosphere" aria-hidden="true"><i /><i /><i /></div><div className="hero-beam" aria-hidden="true" />
        <div className="hero-side-note" aria-hidden="true"><span>{c.sideNote}</span><i /> {c.worldwide}</div>
        <SiteHeader locale={locale} chooseLocale={chooseLocale} />

        <div className="hero-content container"><p className="eyebrow"><span /> {c.hero.eyebrow}</p><h1>{c.hero.titleStart} <em>{c.hero.titleEmphasis}</em></h1><p className="hero-lede">{c.hero.lede}</p><div className="hero-actions"><a className="button button-primary" href="#contact">{c.hero.primary} <ArrowRight size={18} /></a><a className="button button-quiet" href="#work">{c.hero.secondary}</a></div><div className="proof-row" aria-label={c.hero.highlightsLabel}>{c.hero.highlights.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div>

        <div className="hero-orbit" aria-hidden="true"><div className="orbit-halo" /><div className="orbit-ring ring-primary"><i /><i /><i /></div><div className="orbit-ring ring-secondary"><i /><i /></div><div className="orbit-sweep" /><div className="orbit-core"><span>CGZ</span><small>{c.hero.core}</small><b><i /> {c.hero.online}</b></div><div className="orbit-chip chip-one"><small>01</small> AI</div><div className="orbit-chip chip-two"><small>02</small> UNITY</div><div className="orbit-chip chip-three"><small>03</small> {c.hero.cloud}</div><div className="orbit-data data-one"><span>{c.hero.product}</span><strong>{c.hero.engineering}</strong></div><div className="orbit-data data-two"><span>{c.hero.mode}</span><strong>{c.hero.building}</strong></div></div>
      </section>

      <section className="services-band" id="services"><div className="container service-grid">{c.services.map(([title, copy], index) => { const Icon = serviceIcons[index]; return <a className="service-card" href="/services" key={title}><Icon size={22} strokeWidth={1.7} /><h2>{title}</h2><p>{copy}</p><span>{c.nav.services} <ArrowRight size={14} /></span></a>; })}</div></section>

      <section className="section capabilities"><div className="container"><div className="section-heading"><p className="kicker">{c.capabilitiesIntro[0]}</p><h2>{c.capabilitiesIntro[1]}</h2><p>{c.capabilitiesIntro[2]}</p></div><div className="capability-list">{c.capabilities.map(([title, copy, tags], index) => <article className="capability" key={title}><span className="cap-number">{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{copy}</p></div><div className="tag-list">{tags.map(tag => <span key={tag}>{tag}</span>)}</div><ArrowRight className="cap-arrow" size={22} /></article>)}</div></div></section>

      <section className="section work-section" id="work"><div className="container"><div className="section-heading light"><p className="kicker">{c.work.kicker}</p><h2>{c.work.title}</h2><p>{c.work.copy}</p></div><fieldset className="work-filters"><legend className="sr-only">{locale === 'es' ? 'Filtrar proyectos' : 'Filter projects'}</legend>{c.work.filters.map(([id, label]) => <button type="button" key={id} className={workFilter === id ? 'active' : ''} aria-pressed={workFilter === id} onClick={() => setWorkFilter(id as ProjectCategory)}>{label}</button>)}</fieldset>{featuredProjects.length ? <div className="project-grid">{featuredProjects.map(project => <a className={`project-card${project.wide ? ' project-wide' : ''}${project.imageFit === 'contain' ? ' project-logo' : ''}`} href={project.link} target={project.link.startsWith('http') ? '_blank' : undefined} rel={project.link.startsWith('http') ? 'noreferrer' : undefined} key={project.title} aria-label={`${project.unavailable ? c.work.askLabel : c.work.viewLabel} ${project.title}`}>{project.image ? <img src={project.image} alt="" /> : <div className="project-abstract" aria-hidden="true"><ShieldCheck size={72} /><span>SAFE / REVIEW / CONTROL</span></div>}<div className="project-shade" /><div className="project-copy"><span className="project-type">{project.type[locale]}</span><h3>{project.title}</h3>{project.summary && <p>{project.summary[locale]}</p>}<span className="project-action">{project.unavailable ? c.work.ask : c.work.view} <ArrowRight size={16} /></span></div></a>)}</div> : <p className="work-empty">{c.work.noResults}</p>}{archiveProjects.length > 0 && <div className="portfolio-index"><div className="portfolio-intro"><p className="kicker">{c.work.released}</p><h3>{c.work.moreTitle}</h3><p>{c.work.moreCopy}</p></div><div className="portfolio-list">{archiveProjects.map((project, index) => <a href={project.link} target={project.link.startsWith('http') ? '_blank' : undefined} rel={project.link.startsWith('http') ? 'noreferrer' : undefined} key={project.title}><span>{String(index + 1).padStart(2, '0')}</span><strong>{project.title}</strong><small>{project.type[locale]}</small><ArrowRight size={14} /></a>)}</div></div>}{(workFilter === 'all' || workFilter === 'enterprise') && <div className="client-spotlight"><div className="client-monogram">V</div><div><span>{c.work.client}</span><h3>Veolia — Heavy Clues</h3><p>{c.work.clientCopy}</p></div><p className="client-quote">{c.work.quote}</p></div>}</div></section>

      <section className="section process-section"><div className="container process-layout"><div className="process-intro"><p className="kicker">{c.process.kicker}</p><h2>{c.process.title}</h2><p>{c.process.copy}</p></div><div className="steps">{c.process.steps.map(([title, copy], index) => <article className="step" key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

      <section className="section about-section" id="about"><div className="container about-layout"><div className="about-mark" aria-hidden="true"><span>CGZ</span><Sparkles size={30} /></div><div className="about-copy"><p className="kicker">{c.about.kicker}</p><h2>{c.about.title}</h2><p>{c.about.first}</p><p>{c.about.second}</p><div className="about-values">{c.about.values.map(value => <span key={value}><Check size={17} /> {value}</span>)}</div></div></div></section>

      <section className="section insights-section" id="insights"><div className="container"><div className="section-heading"><p className="kicker">{c.insights.kicker}</p><h2>{c.insights.title}</h2><p>{c.insights.copy}</p></div><div className="insights-grid">{c.insights.articles.map(([title, category, link], index) => <a href={link} target="_blank" rel="noreferrer" key={title}><span>{String(index + 1).padStart(2, '0')}</span><small>{category}</small><h3>{title}</h3><ArrowRight size={20} /></a>)}</div></div></section>

      <section className="contact-section" id="contact"><div className="contact-glow" aria-hidden="true" /><div className="container contact-layout"><div><p className="kicker">{c.contact.kicker}</p><h2>{c.contact.title}</h2><p>{c.contact.copy}</p><div className="contact-direct"><a href="mailto:admin@clubgamerzone.com"><Mail size={17}/> admin@clubgamerzone.com</a><a href="tel:+573054839092"><Phone size={17}/> +57 305 483 9092</a></div><aside className="contact-card"><div><MapPin size={19} /><span><small>{c.contact.studio}</small>{c.contact.studioValue}</span></div><div><CloudCog size={19} /><span><small>{c.contact.availability}</small>{c.contact.availabilityValue}</span></div></aside></div><LeadForm locale={locale} /></div></section>

      <footer><div className="container footer-inner"><img src="/assets/logo.png" alt="ClubGamerZone" /><p>{c.footer}</p><div className="socials"><a href="https://www.linkedin.com/company/clubgamerzonesoftware/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.instagram.com/clubgamerzone/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.youtube.com/c/clubgamerzone" target="_blank" rel="noreferrer">YouTube</a><a href="/privacy-policy">{locale === 'es' ? 'Privacidad' : 'Privacy'}</a></div><small>© {new Date().getFullYear()} ClubGamerZone. {c.rights}</small></div></footer>
      <ChatWidget locale={locale} />
    </main>
  );
}

