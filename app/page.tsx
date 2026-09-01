'use client';

import { ArrowRight, BrainCircuit, Check, CloudCog, Code2, Gamepad2, Layers3, Mail, MapPin, Menu, Phone, Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ChatWidget from '../src/ChatWidget';
import LeadForm from '../src/LeadForm';

export type Locale = 'en' | 'es';

const serviceIcons = [Code2, BrainCircuit, Gamepad2, Layers3];

const projects = [
  { title: 'Hell Cemetery', type: { en: 'Original survival horror game', es: 'Videojuego original de terror y supervivencia' }, image: '/assets/hell-cemetery.png', link: 'https://play.google.com/store/apps/details?id=com.ClubGamerZone.HellCemeteryMetroivania&hl=en&gl=US', wide: true },
  { title: 'Instruments of Faith', type: { en: 'Hardcore pixel-art metroidvania', es: 'Metroidvania hardcore en pixel art' }, image: '/assets/instruments-of-faith-v2.jpg', link: 'https://store.steampowered.com/app/1664390/The_Instruments_Of_Faith_Paduas_Destiny/?beta=0' },
  { title: 'The Goal Music', type: { en: 'Music and football game', es: 'Videojuego de música y fútbol' }, image: '/assets/goal-music-v2.jpg', link: 'https://play.google.com/store/search?q=the%20gol%20music&c=apps&hl=es' },
  { title: 'Verneverse', type: { en: 'Immersive multiplayer experience', es: 'Experiencia multijugador inmersiva' }, image: '/assets/verneverse.png', link: 'https://lobby-vernevese.vercel.app/' },
  { title: 'Animatch', type: { en: 'Pet-themed match-box puzzle', es: 'Rompecabezas de combinaciones con mascotas' }, image: '/assets/animatch-v2.webp', link: 'https://play.google.com/store/apps/details?id=com.ClubGamerZone.Animatch&hl=en' },
  { title: 'Golden Buddha', type: { en: 'Online casino game experience', es: 'Experiencia de juego para casino en línea' }, image: '/assets/golden-buddha.png', link: '#contact', unavailable: true },
  { title: 'Save the Pets', type: { en: 'Social-impact mobile game', es: 'Videojuego móvil de impacto social' }, image: '/assets/save-the-pets.png', link: 'https://linktr.ee/savethepets' },
  { title: 'Space Blast', type: { en: 'Arcade action game', es: 'Videojuego arcade de acción' }, image: '/assets/space-blast.png', link: 'https://play.google.com/store/apps/details?id=com.ClubGamerZone.SpaceBlast&hl=en' },
  { title: 'Word Crush — Languages', type: { en: 'Language-learning puzzle game', es: 'Rompecabezas para aprender idiomas' }, image: '/assets/word-crush.jpg', link: 'https://play.google.com/store/apps/details?id=com.SeeingHopeInc.WordCrushLanguages&hl=en' },
  { title: 'Veolia — Heavy Clues', type: { en: 'Enterprise training game', es: 'Videojuego de formación empresarial' }, image: '/assets/veolia.png', link: '#contact', unavailable: true },
];

const content = {
  en: {
    nav: { services: 'Services', work: 'Selected work', about: 'About', contact: 'Start a project', menuOpen: 'Open navigation', menuClose: 'Close navigation' },
    sideNote: 'Independent digital studio', worldwide: 'Barranquilla · Worldwide',
    hero: {
      eyebrow: 'Software, AI & interactive experiences', titleStart: 'We turn ambitious ideas into', titleEmphasis: 'working products.',
      lede: 'ClubGamerZone is a product development studio helping teams launch capable software, intelligent automation and memorable digital experiences.', primary: 'Tell us what you’re building', secondary: 'Explore our work', highlightsLabel: 'Company highlights',
      highlights: [['15+', 'years delivering technology'], ['2016', 'founded in Barranquilla'], ['End-to-end', 'strategy through launch']],
      core: 'BUILD / SHIP / EVOLVE', online: 'Systems online', product: 'Product', engineering: 'ENGINEERING', mode: 'Mode', building: 'BUILDING', cloud: 'CLOUD',
    },
    services: [
      ['Product engineering', 'Web, mobile and desktop software built around real business outcomes.'],
      ['AI integration', 'Useful AI agents, copilots and automations woven into your existing workflow.'],
      ['Games & interactive', 'Unity experiences, serious games and polished entertainment products.'],
      ['Platforms that scale', 'APIs, cloud systems and modernization work that stays maintainable.'],
    ],
    capabilitiesIntro: ['What we build', 'One partner for the whole product journey.', 'We combine product thinking, design and engineering so good ideas don’t get lost between agencies, freelancers and platforms.'],
    capabilities: [
      ['Web, mobile & desktop', 'Customer portals, internal tools, SaaS platforms and native experiences designed to feel effortless.', ['React', 'React Native', 'Modern web', 'Desktop']],
      ['AI agents & automation', 'Practical AI that searches knowledge, supports customers, accelerates teams and removes repetitive work.', ['AI agents', 'RAG', 'Workflow automation', 'Integrations']],
      ['Games & immersive media', 'From original entertainment to training simulations, we build interactive experiences people remember.', ['Unity', '2D / 3D', 'Mobile games', 'Serious games']],
      ['Cloud, APIs & modernization', 'Reliable backends, connected systems and thoughtful rebuilds that help your product grow without the drag.', ['Cloud', 'APIs', 'Architecture', 'Migration']],
    ],
    work: {
      kicker: 'Our product universe', title: 'Products made to be used, played and remembered.', copy: 'Our roots are in games. Today, that same craft powers software and interactive products across industries.', view: 'View project', ask: 'Ask about this project', viewLabel: 'View', askLabel: 'Ask about',
      released: 'Released & client work', moreTitle: 'More of what we’ve brought to life.', moreCopy: 'Original entertainment, mobile experiences, digital platforms and enterprise learning products.',
      categories: ['Original IP', 'Game', 'Platform', 'Game', 'Mobile', 'Mobile', 'Interactive', 'Mobile', 'Game', 'Enterprise training'],
      client: 'Client collaboration', clientCopy: 'An enterprise training experience that turns learning objectives into engaging interactive play.', quote: 'Serious goals deserve memorable experiences.',
    },
    process: {
      kicker: 'How we work', title: <>Clear thinking.<br />Visible progress.<br /><em>No mystery.</em></>, copy: 'You stay close to the work, see what is taking shape and know what comes next.',
      steps: [['Discover', 'We clarify the opportunity, users, constraints and the result that matters.'], ['Design', 'We make the experience tangible early, aligning product, technology and scope.'], ['Build', 'A senior team ships in visible increments with quality and maintainability built in.'], ['Launch & evolve', 'We release confidently, learn from real use and improve what creates value.']],
    },
    about: {
      kicker: 'About ClubGamerZone', title: 'Curiosity started it. Craft keeps it moving.', first: 'Founded in February 2016 by Jose Demoya, ClubGamerZone began as a video-game review platform and grew into a software and game development studio. From Barranquilla, Colombia, we collaborate with clients who want to turn a strong idea into a dependable product.', second: 'Our team brings more than 15 years of technology experience, balancing inventive thinking with the discipline required to ship.', values: ['Direct collaboration', 'Senior technical thinking', 'Built for long-term value'],
    },
    contact: { kicker: 'Start a conversation', title: 'Have an idea worth building?', copy: 'Tell us what you want to create, improve or automate. We’ll help you find the clearest path forward.', studio: 'Studio', studioValue: 'Barranquilla, Colombia — working worldwide', availability: 'Availability', availabilityValue: 'Monday–Saturday, 8:00–17:00' },
    footer: 'Software, AI & interactive products.', rights: 'All rights reserved.',
  },
  es: {
    nav: { services: 'Servicios', work: 'Proyectos', about: 'Nosotros', contact: 'Inicia un proyecto', menuOpen: 'Abrir navegación', menuClose: 'Cerrar navegación' },
    sideNote: 'Estudio digital independiente', worldwide: 'Barranquilla · Para todo el mundo',
    hero: {
      eyebrow: 'Software, IA y experiencias interactivas', titleStart: 'Convertimos ideas ambiciosas en', titleEmphasis: 'productos reales.',
      lede: 'ClubGamerZone es un estudio de desarrollo de productos que ayuda a equipos a lanzar software robusto, automatización inteligente y experiencias digitales memorables.', primary: 'Cuéntanos qué quieres construir', secondary: 'Explora nuestro trabajo', highlightsLabel: 'Aspectos destacados de la empresa',
      highlights: [['15+', 'años creando tecnología'], ['2016', 'fundada en Barranquilla'], ['Integral', 'de la estrategia al lanzamiento']],
      core: 'CREAR / LANZAR / EVOLUCIONAR', online: 'Sistemas activos', product: 'Producto', engineering: 'INGENIERÍA', mode: 'Modo', building: 'CREANDO', cloud: 'NUBE',
    },
    services: [
      ['Ingeniería de producto', 'Software web, móvil y de escritorio creado para generar resultados de negocio reales.'],
      ['Integración de IA', 'Agentes, copilotos y automatizaciones útiles integrados en tus procesos actuales.'],
      ['Videojuegos e interacción', 'Experiencias en Unity, juegos serios y productos de entretenimiento de alta calidad.'],
      ['Plataformas escalables', 'APIs, sistemas en la nube y modernización con una base fácil de mantener.'],
    ],
    capabilitiesIntro: ['Lo que construimos', 'Un solo aliado para todo el recorrido del producto.', 'Combinamos estrategia de producto, diseño e ingeniería para que las buenas ideas no se pierdan entre agencias, freelancers y plataformas.'],
    capabilities: [
      ['Web, móvil y escritorio', 'Portales para clientes, herramientas internas, plataformas SaaS y experiencias nativas diseñadas para sentirse sencillas.', ['React', 'React Native', 'Web moderna', 'Escritorio']],
      ['Agentes de IA y automatización', 'IA práctica que consulta conocimiento, atiende clientes, acelera equipos y elimina trabajo repetitivo.', ['Agentes de IA', 'RAG', 'Automatización', 'Integraciones']],
      ['Videojuegos y medios inmersivos', 'Desde entretenimiento original hasta simulaciones de formación: creamos experiencias que las personas recuerdan.', ['Unity', '2D / 3D', 'Juegos móviles', 'Juegos serios']],
      ['Nube, APIs y modernización', 'Backends confiables, sistemas conectados y reconstrucciones bien planeadas para que tu producto crezca sin fricción.', ['Nube', 'APIs', 'Arquitectura', 'Migración']],
    ],
    work: {
      kicker: 'Nuestro universo de productos', title: 'Productos creados para ser usados, jugados y recordados.', copy: 'Nuestras raíces están en los videojuegos. Hoy aplicamos esa misma creatividad al software y a productos interactivos para múltiples industrias.', view: 'Ver proyecto', ask: 'Preguntar por este proyecto', viewLabel: 'Ver', askLabel: 'Preguntar por',
      released: 'Lanzamientos y trabajo para clientes', moreTitle: 'Más productos que hemos hecho realidad.', moreCopy: 'Entretenimiento original, experiencias móviles, plataformas digitales y productos de formación empresarial.',
      categories: ['IP original', 'Videojuego', 'Plataforma', 'Videojuego', 'Móvil', 'Móvil', 'Interactivo', 'Móvil', 'Videojuego', 'Formación empresarial'],
      client: 'Colaboración con cliente', clientCopy: 'Una experiencia de formación empresarial que convierte objetivos de aprendizaje en una experiencia interactiva y atractiva.', quote: 'Los objetivos importantes merecen experiencias memorables.',
    },
    process: {
      kicker: 'Cómo trabajamos', title: <>Ideas claras.<br />Progreso visible.<br /><em>Sin misterios.</em></>, copy: 'Te mantienes cerca del trabajo, ves cómo toma forma y siempre sabes cuál es el siguiente paso.',
      steps: [['Descubrir', 'Definimos la oportunidad, los usuarios, las restricciones y el resultado que realmente importa.'], ['Diseñar', 'Hacemos tangible la experiencia desde temprano, alineando producto, tecnología y alcance.'], ['Construir', 'Un equipo sénior entrega avances visibles con calidad y mantenibilidad desde el inicio.'], ['Lanzar y evolucionar', 'Publicamos con confianza, aprendemos del uso real y mejoramos aquello que crea valor.']],
    },
    about: {
      kicker: 'Sobre ClubGamerZone', title: 'La curiosidad nos puso en marcha. La experiencia nos hace avanzar.', first: 'Fundada en febrero de 2016 por Jose Demoya, ClubGamerZone comenzó como una plataforma de reseñas de videojuegos y creció hasta convertirse en un estudio de desarrollo de software y videojuegos. Desde Barranquilla, Colombia, colaboramos con clientes que quieren convertir una buena idea en un producto confiable.', second: 'Nuestro equipo reúne más de 15 años de experiencia tecnológica, combinando pensamiento creativo con la disciplina necesaria para lanzar productos.', values: ['Colaboración directa', 'Criterio técnico sénior', 'Productos con valor duradero'],
    },
    contact: { kicker: 'Iniciemos una conversación', title: '¿Tienes una idea que vale la pena construir?', copy: 'Cuéntanos qué quieres crear, mejorar o automatizar. Te ayudaremos a encontrar el camino más claro para hacerlo realidad.', studio: 'Estudio', studioValue: 'Barranquilla, Colombia — trabajando para todo el mundo', availability: 'Horario', availabilityValue: 'Lunes a sábado, 8:00–17:00' },
    footer: 'Software, IA y productos interactivos.', rights: 'Todos los derechos reservados.',
  },
} as const;

export default function Home() {
  const [locale, setLocale] = useState<Locale>('en');
  const [menuOpen, setMenuOpen] = useState(false);
  const c = content[locale];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const saved = window.localStorage.getItem('cgz-language');
    const preferred = params.get('lang') || saved || (navigator.language.toLowerCase().startsWith('es') ? 'es' : 'en');
    if (preferred === 'es') setLocale('es');
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem('cgz-language', locale);
  }, [locale]);

  function chooseLocale(nextLocale: Locale) {
    setLocale(nextLocale);
    setMenuOpen(false);
    const url = new URL(window.location.href);
    if (nextLocale === 'es') url.searchParams.set('lang', 'es');
    else url.searchParams.delete('lang');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }

  const navLinks = [['#services', c.nav.services], ['#work', c.nav.work], ['#about', c.nav.about]] as const;

  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-grid" aria-hidden="true" /><div className="hero-atmosphere" aria-hidden="true"><i /><i /><i /></div><div className="hero-beam" aria-hidden="true" />
        <div className="hero-side-note" aria-hidden="true"><span>{c.sideNote}</span><i /> {c.worldwide}</div>
        <header className="site-header container">
          <a className="brand" href="#home" aria-label="ClubGamerZone home"><img src="/assets/logo.png" alt="ClubGamerZone" /></a>
          <nav className="primary-nav" aria-label={locale === 'es' ? 'Navegación principal' : 'Primary navigation'}>{navLinks.map(([href, label]) => <a href={href} key={href}>{label}</a>)}</nav>
          <div className="header-actions">
            <div className="language-switch" role="group" aria-label={locale === 'es' ? 'Seleccionar idioma' : 'Select language'}><button type="button" aria-pressed={locale === 'en'} onClick={() => chooseLocale('en')}>EN</button><button type="button" aria-pressed={locale === 'es'} onClick={() => chooseLocale('es')}>ES</button></div>
            <a className="header-cta" href="#contact">{c.nav.contact} <ArrowRight size={16} /></a>
            <button className="mobile-menu-button" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label={menuOpen ? c.nav.menuClose : c.nav.menuOpen} onClick={() => setMenuOpen(current => !current)}>{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
          </div>
          {menuOpen && <nav className="mobile-nav" id="mobile-navigation" aria-label={locale === 'es' ? 'Navegación móvil' : 'Mobile navigation'}>{navLinks.map(([href, label]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}<ArrowRight size={16} /></a>)}<a className="mobile-nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>{c.nav.contact}<ArrowRight size={16} /></a></nav>}
        </header>

        <div className="hero-content container"><p className="eyebrow"><span /> {c.hero.eyebrow}</p><h1>{c.hero.titleStart} <em>{c.hero.titleEmphasis}</em></h1><p className="hero-lede">{c.hero.lede}</p><div className="hero-actions"><a className="button button-primary" href="#contact">{c.hero.primary} <ArrowRight size={18} /></a><a className="button button-quiet" href="#work">{c.hero.secondary}</a></div><div className="proof-row" aria-label={c.hero.highlightsLabel}>{c.hero.highlights.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></div>

        <div className="hero-orbit" aria-hidden="true"><div className="orbit-halo" /><div className="orbit-ring ring-primary"><i /><i /><i /></div><div className="orbit-ring ring-secondary"><i /><i /></div><div className="orbit-sweep" /><div className="orbit-core"><span>CGZ</span><small>{c.hero.core}</small><b><i /> {c.hero.online}</b></div><div className="orbit-chip chip-one"><small>01</small> AI</div><div className="orbit-chip chip-two"><small>02</small> UNITY</div><div className="orbit-chip chip-three"><small>03</small> {c.hero.cloud}</div><div className="orbit-data data-one"><span>{c.hero.product}</span><strong>{c.hero.engineering}</strong></div><div className="orbit-data data-two"><span>{c.hero.mode}</span><strong>{c.hero.building}</strong></div></div>
      </section>

      <section className="services-band" id="services"><div className="container service-grid">{c.services.map(([title, copy], index) => { const Icon = serviceIcons[index]; return <article className="service-card" key={title}><Icon size={22} strokeWidth={1.7} /><h2>{title}</h2><p>{copy}</p></article>; })}</div></section>

      <section className="section capabilities"><div className="container"><div className="section-heading"><p className="kicker">{c.capabilitiesIntro[0]}</p><h2>{c.capabilitiesIntro[1]}</h2><p>{c.capabilitiesIntro[2]}</p></div><div className="capability-list">{c.capabilities.map(([title, copy, tags], index) => <article className="capability" key={title}><span className="cap-number">{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{copy}</p></div><div className="tag-list">{tags.map(tag => <span key={tag}>{tag}</span>)}</div><ArrowRight className="cap-arrow" size={22} /></article>)}</div></div></section>

      <section className="section work-section" id="work"><div className="container"><div className="section-heading light"><p className="kicker">{c.work.kicker}</p><h2>{c.work.title}</h2><p>{c.work.copy}</p></div><div className="project-grid">{projects.map(project => <a className={`project-card${project.wide ? ' project-wide' : ''}`} href={project.link} target={project.link.startsWith('http') ? '_blank' : undefined} rel={project.link.startsWith('http') ? 'noreferrer' : undefined} key={project.title} aria-label={`${project.unavailable ? c.work.askLabel : c.work.viewLabel} ${project.title}`}><img src={project.image} alt="" /><div className="project-shade" /><div className="project-copy"><span className="project-type">{project.type[locale]}</span><h3>{project.title}</h3><span className="project-action">{project.unavailable ? c.work.ask : c.work.view} <ArrowRight size={16} /></span></div></a>)}</div><div className="portfolio-index"><div className="portfolio-intro"><p className="kicker">{c.work.released}</p><h3>{c.work.moreTitle}</h3><p>{c.work.moreCopy}</p></div><div className="portfolio-list">{projects.map((project, index) => <a href={project.link} target={project.link.startsWith('http') ? '_blank' : undefined} rel={project.link.startsWith('http') ? 'noreferrer' : undefined} key={project.title}><span>{String(index + 1).padStart(2, '0')}</span><strong>{project.title}</strong><small>{c.work.categories[index]}</small><ArrowRight size={14} /></a>)}</div></div><div className="client-spotlight"><div className="client-monogram">V</div><div><span>{c.work.client}</span><h3>Veolia — Heavy Clues</h3><p>{c.work.clientCopy}</p></div><p className="client-quote">{c.work.quote}</p></div></div></section>

      <section className="section process-section"><div className="container process-layout"><div className="process-intro"><p className="kicker">{c.process.kicker}</p><h2>{c.process.title}</h2><p>{c.process.copy}</p></div><div className="steps">{c.process.steps.map(([title, copy], index) => <article className="step" key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

      <section className="section about-section" id="about"><div className="container about-layout"><div className="about-mark" aria-hidden="true"><span>CGZ</span><Sparkles size={30} /></div><div className="about-copy"><p className="kicker">{c.about.kicker}</p><h2>{c.about.title}</h2><p>{c.about.first}</p><p>{c.about.second}</p><div className="about-values">{c.about.values.map(value => <span key={value}><Check size={17} /> {value}</span>)}</div></div></div></section>

      <section className="contact-section" id="contact"><div className="contact-glow" aria-hidden="true" /><div className="container contact-layout"><div><p className="kicker">{c.contact.kicker}</p><h2>{c.contact.title}</h2><p>{c.contact.copy}</p><div className="contact-direct"><a href="mailto:admin@clubgamerzone.com"><Mail size={17}/> admin@clubgamerzone.com</a><a href="tel:+573012731004"><Phone size={17}/> +57 301 273 1004</a></div><aside className="contact-card"><div><MapPin size={19} /><span><small>{c.contact.studio}</small>{c.contact.studioValue}</span></div><div><CloudCog size={19} /><span><small>{c.contact.availability}</small>{c.contact.availabilityValue}</span></div></aside></div><LeadForm locale={locale} /></div></section>

      <footer><div className="container footer-inner"><img src="/assets/logo.png" alt="ClubGamerZone" /><p>{c.footer}</p><div className="socials"><a href="https://www.linkedin.com/company/clubgamerzonesoftware/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.instagram.com/clubgamerzone/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.youtube.com/c/clubgamerzone" target="_blank" rel="noreferrer">YouTube</a><a href="https://www.facebook.com/clubgamerzone/" target="_blank" rel="noreferrer">Facebook</a></div><small>© {new Date().getFullYear()} ClubGamerZone. {c.rights}</small></div></footer>
      <ChatWidget locale={locale} />
    </main>
  );
}
