import {
  ArrowRight,
  BrainCircuit,
  Check,
  CloudCog,
  Code2,
  Gamepad2,
  Layers3,
  Mail,
  MapPin,
  Phone,
  Sparkles,
} from 'lucide-react';
import ChatWidget from '../src/ChatWidget';
import LeadForm from '../src/LeadForm';

const services = [
  { icon: Code2, title: 'Product engineering', copy: 'Web, mobile and desktop software built around real business outcomes.' },
  { icon: BrainCircuit, title: 'AI integration', copy: 'Useful AI agents, copilots and automations woven into your existing workflow.' },
  { icon: Gamepad2, title: 'Games & interactive', copy: 'Unity experiences, serious games and polished entertainment products.' },
  { icon: Layers3, title: 'Platforms that scale', copy: 'APIs, cloud systems and modernization work that stays maintainable.' },
];

const capabilities = [
  { number: '01', title: 'Web, mobile & desktop', copy: 'Customer portals, internal tools, SaaS platforms and native experiences designed to feel effortless.', tags: ['React', 'React Native', 'Modern web', 'Desktop'] },
  { number: '02', title: 'AI agents & automation', copy: 'Practical AI that searches knowledge, supports customers, accelerates teams and removes repetitive work.', tags: ['AI agents', 'RAG', 'Workflow automation', 'Integrations'] },
  { number: '03', title: 'Games & immersive media', copy: 'From original entertainment to training simulations, we build interactive experiences people remember.', tags: ['Unity', '2D / 3D', 'Mobile games', 'Serious games'] },
  { number: '04', title: 'Cloud, APIs & modernization', copy: 'Reliable backends, connected systems and thoughtful rebuilds that help your product grow without the drag.', tags: ['Cloud', 'APIs', 'Architecture', 'Migration'] },
];

const projects = [
  { title: 'Hell Cemetery', type: 'Original survival horror game', image: '/assets/hell-cemetery.png', link: 'https://play.google.com/store/apps/details?id=com.ClubGamerZone.HellCemeteryMetroivania&hl=en&gl=US', wide: true },
  { title: 'Instruments of Faith', type: 'Hardcore pixel-art metroidvania', image: '/assets/instruments-of-faith-v2.jpg', link: 'https://store.steampowered.com/app/1664390/The_Instruments_Of_Faith_Paduas_Destiny/?beta=0' },
  { title: 'The Goal Music', type: 'Music and football game', image: '/assets/goal-music-v2.jpg', link: 'https://play.google.com/store/search?q=the%20gol%20music&c=apps&hl=es' },
  { title: 'Verneverse', type: 'Immersive multiplayer experience', image: '/assets/verneverse.png', link: 'https://lobby-vernevese.vercel.app/' },
  { title: 'Animatch', type: 'Pet-themed match-box puzzle', image: '/assets/animatch-v2.webp', link: 'https://play.google.com/store/apps/details?id=com.ClubGamerZone.Animatch&hl=en' },
  { title: 'Golden Buddha', type: 'Online casino game experience', image: '/assets/golden-buddha.png', link: '#contact', unavailable: true },
  { title: 'Save the Pets', type: 'Social-impact mobile game', image: '/assets/save-the-pets.png', link: 'https://linktr.ee/savethepets' },
  { title: 'Space Blast', type: 'Arcade action game', image: '/assets/space-blast.png', link: 'https://play.google.com/store/apps/details?id=com.ClubGamerZone.SpaceBlast&hl=en' },
  { title: 'Word Crush — Languages', type: 'Language-learning puzzle game', image: '/assets/word-crush.jpg', link: 'https://play.google.com/store/apps/details?id=com.SeeingHopeInc.WordCrushLanguages&hl=en' },
  { title: 'Veolia — Heavy Clues', type: 'Enterprise training game', image: '/assets/veolia.png', link: '#contact', unavailable: true },
];

const portfolioIndex = [
  ['Hell Cemetery', 'Original IP'], ['Instruments of Faith', 'Game'], ['The Goal Music', 'Platform'],
  ['Golden Buddha', 'Game'], ['Save the Pets', 'Mobile'], ['Word Crush — Languages', 'Mobile'],
  ['Verneverse', 'Interactive'], ['Animatch', 'Mobile'], ['Space Blast', 'Game'], ['Veolia — Heavy Clues', 'Enterprise training'],
];

const steps = [
  ['Discover', 'We clarify the opportunity, users, constraints and the result that matters.'],
  ['Design', 'We make the experience tangible early, aligning product, technology and scope.'],
  ['Build', 'A senior team ships in visible increments with quality and maintainability built in.'],
  ['Launch & evolve', 'We release confidently, learn from real use and improve what creates value.'],
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="home">
        <div className="hero-grid" aria-hidden="true" />
        <header className="site-header container">
          <a className="brand" href="#home" aria-label="ClubGamerZone home"><img src="/assets/logo.png" alt="ClubGamerZone" /></a>
          <nav aria-label="Primary navigation"><a href="#services">Services</a><a href="#work">Selected work</a><a href="#about">About</a></nav>
          <a className="header-cta" href="#contact">Start a project <ArrowRight size={16} /></a>
        </header>

        <div className="hero-content container">
          <p className="eyebrow"><span /> Software, AI & interactive experiences</p>
          <h1>We turn ambitious ideas into <em>working products.</em></h1>
          <p className="hero-lede">ClubGamerZone is a product development studio helping teams launch capable software, intelligent automation and memorable digital experiences.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">Tell us what you’re building <ArrowRight size={18} /></a>
            <a className="button button-quiet" href="#work">Explore our work</a>
          </div>
          <div className="proof-row" aria-label="Company highlights"><div><strong>15+</strong><span>years delivering technology</span></div><div><strong>2016</strong><span>founded in Barranquilla</span></div><div><strong>End-to-end</strong><span>strategy through launch</span></div></div>
        </div>

        <div className="hero-orbit" aria-hidden="true"><div className="orbit-ring" /><div className="orbit-core"><span>CGZ</span><small>BUILD / SHIP / EVOLVE</small></div><div className="orbit-chip chip-one">AI</div><div className="orbit-chip chip-two">UNITY</div><div className="orbit-chip chip-three">CLOUD</div></div>
      </section>

      <section className="services-band" id="services"><div className="container service-grid">{services.map(({ icon: Icon, title, copy }) => <article className="service-card" key={title}><Icon size={22} strokeWidth={1.7} /><h2>{title}</h2><p>{copy}</p></article>)}</div></section>

      <section className="section capabilities"><div className="container"><div className="section-heading"><p className="kicker">What we build</p><h2>One partner for the whole product journey.</h2><p>We combine product thinking, design and engineering so good ideas don’t get lost between agencies, freelancers and platforms.</p></div><div className="capability-list">{capabilities.map((item) => <article className="capability" key={item.number}><span className="cap-number">{item.number}</span><div><h3>{item.title}</h3><p>{item.copy}</p></div><div className="tag-list">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div><ArrowRight className="cap-arrow" size={22} /></article>)}</div></div></section>

      <section className="section work-section" id="work"><div className="container"><div className="section-heading light"><p className="kicker">Our product universe</p><h2>Products made to be used, played and remembered.</h2><p>Our roots are in games. Today, that same craft powers software and interactive products across industries.</p></div><div className="project-grid">{projects.map(project => <a className={`project-card${project.wide ? ' project-wide' : ''}`} href={project.link} target={project.link.startsWith('http') ? '_blank' : undefined} rel={project.link.startsWith('http') ? 'noreferrer' : undefined} key={project.title} aria-label={`${project.unavailable ? 'Ask about' : 'View'} ${project.title}`}><img src={project.image} alt="" /><div className="project-shade" /><div className="project-copy"><span className="project-type">{project.type}</span><h3>{project.title}</h3><span className="project-action">{project.unavailable ? 'Ask about this project' : 'View project'} <ArrowRight size={16} /></span></div></a>)}</div><div className="portfolio-index"><div className="portfolio-intro"><p className="kicker">Released & client work</p><h3>More of what we’ve brought to life.</h3><p>Original entertainment, mobile experiences, digital platforms and enterprise learning products.</p></div><div className="portfolio-list">{portfolioIndex.map(([title,type],index)=>{const project=projects.find(item=>item.title===title)!;return <a href={project.link} target={project.link.startsWith('http')?'_blank':undefined} rel={project.link.startsWith('http')?'noreferrer':undefined} key={title}><span>{String(index+1).padStart(2,'0')}</span><strong>{title}</strong><small>{type}</small><ArrowRight size={14}/></a>})}</div></div><div className="client-spotlight"><div className="client-monogram">V</div><div><span>Client collaboration</span><h3>Veolia — Heavy Clues</h3><p>An enterprise training experience that turns learning objectives into engaging interactive play.</p></div><p className="client-quote">Serious goals deserve memorable experiences.</p></div></div></section>

      <section className="section process-section"><div className="container process-layout"><div className="process-intro"><p className="kicker">How we work</p><h2>Clear thinking.<br />Visible progress.<br /><em>No mystery.</em></h2><p>You stay close to the work, see what is taking shape and know what comes next.</p></div><div className="steps">{steps.map(([title, copy], index) => <article className="step" key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

      <section className="section about-section" id="about"><div className="container about-layout"><div className="about-mark" aria-hidden="true"><span>CGZ</span><Sparkles size={30} /></div><div className="about-copy"><p className="kicker">About ClubGamerZone</p><h2>Curiosity started it. Craft keeps it moving.</h2><p>Founded in February 2016 by Jose Demoya, ClubGamerZone began as a video-game review platform and grew into a software and game development studio. From Barranquilla, Colombia, we collaborate with clients who want to turn a strong idea into a dependable product.</p><p>Our team brings more than 15 years of technology experience, balancing inventive thinking with the discipline required to ship.</p><div className="about-values"><span><Check size={17} /> Direct collaboration</span><span><Check size={17} /> Senior technical thinking</span><span><Check size={17} /> Built for long-term value</span></div></div></div></section>

      <section className="contact-section" id="contact"><div className="contact-glow" aria-hidden="true" /><div className="container contact-layout"><div><p className="kicker">Start a conversation</p><h2>Have an idea worth building?</h2><p>Tell us what you want to create, improve or automate. We’ll help you find the clearest path forward.</p><div className="contact-direct"><a href="mailto:admin@clubgamerzone.com"><Mail size={17}/> admin@clubgamerzone.com</a><a href="tel:+573012731004"><Phone size={17}/> +57 301 273 1004</a></div><aside className="contact-card"><div><MapPin size={19} /><span><small>Studio</small>Barranquilla, Colombia — working worldwide</span></div><div><CloudCog size={19} /><span><small>Availability</small>Monday–Saturday, 8:00–17:00</span></div></aside></div><LeadForm /></div></section>

      <footer><div className="container footer-inner"><img src="/assets/logo.png" alt="ClubGamerZone" /><p>Software, AI & interactive products.</p><div className="socials"><a href="https://www.linkedin.com/company/clubgamerzonesoftware/" target="_blank" rel="noreferrer">LinkedIn</a><a href="https://www.instagram.com/clubgamerzone/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.youtube.com/c/clubgamerzone" target="_blank" rel="noreferrer">YouTube</a><a href="https://www.facebook.com/clubgamerzone/" target="_blank" rel="noreferrer">Facebook</a></div><small>© {new Date().getFullYear()} ClubGamerZone. All rights reserved.</small></div></footer>
      <ChatWidget />
    </main>
  );
}
