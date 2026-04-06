import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";


const skills = [
  { name: "Java", level: 92, icon: "☕" },
  { name: "Spring Boot", level: 90, icon: "🌿" },
  { name: "Spring Security", level: 85, icon: "🔒" },
  { name: "Spring Data JPA", level: 83, icon: "🗄️" },
  { name: "JWT & OAuth2", level: 88, icon: "🔑" },
  { name: "Microservices", level: 82, icon: "⚙️" },
  { name: "Apache Kafka", level: 75, icon: "📨" },
  { name: "PostgreSQL", level: 80, icon: "🐘" },
  { name: "REST APIs", level: 90, icon: "🔗" },
  { name: "Docker", level: 78, icon: "🐳" },
  { name: "Kubernetes", level: 70, icon: "☸️" },
  { name: "Software Design", level: 85, icon: "🏗️" },
];

const securityPractices = [
  { icon: "🔐", title: "JWT & OAuth2", desc: "Stateless, token-based authentication with fine-grained authorization flows" },
  { icon: "🛡️", title: "RBAC", desc: "Role-Based Access Control ensuring least-privilege principles across services" },
  { icon: "🚫", title: "XSS / CSRF / SQLi", desc: "Defense-in-depth protection against the OWASP Top 10 vulnerabilities" },
  { icon: "⚡", title: "Secure API Design", desc: "Input validation, rate limiting, and encrypted transport for every endpoint" },
];

const projects = [
  {
    title: "Secure Banking System",
    tags: ["Microservices", "JWT", "OAuth2", "Spring Boot"],
    desc: "Enterprise-grade microservices banking platform featuring multi-layer JWT & OAuth2 authentication, RBAC enforcement, and hardened API architecture with audit logging.",
    link: "https://github.com/prajjwal-cs",
    accent: "#00e5ff",
  },
  {
    title: "Event-Driven Notification Service",
    tags: ["Apache Kafka", "Spring Boot", "PostgreSQL"],
    desc: "High-throughput event streaming pipeline using Apache Kafka for real-time notifications, backed by PostgreSQL for reliable event persistence and replay.",
    link: "https://github.com/prajjwal-cs",
    accent: "#69ff47",
  },
];

function TypewriterText({ text }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(iv);
    }, 55);
    return () => clearInterval(iv);
  }, [text]);
  return (
    <span>
      {displayed}
      <span className="terminal-cursor">|</span>
    </span>
  );
}

function SkillBar({ name, level, icon, delay }) {
  const [animate, setAnimate] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimate(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.5 }}
      className="skill-row"
    >
      <div className="skill-label">
        <span className="skill-icon">{icon}</span>
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{level}%</span>
      </div>
      <div className="skill-track">
        <motion.div
          className="skill-fill"
          initial={{ width: 0 }}
          animate={{ width: animate ? `${level}%` : 0 }}
          transition={{ duration: 1, delay: delay + 0.2, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

export default function App() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Saira+Stencil+One&family=JetBrains+Mono:wght@400;600&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

        :root {
          --bg: #050a0f;
          --surface: #0d1821;
          --surface2: #121f2e;
          --border: rgba(0,229,255,0.12);
          --cyan: #00e5ff;
          --green: #69ff47;
          --white: #e8f4f8;
          --muted: #7a9bb5;
          --font-display: 'Saira Stencil One', sans-serif;
          --font-mono: 'JetBrains Mono', monospace;
          --font-body: 'DM Sans', sans-serif;
        }

        html { scroll-behavior: smooth; }

        body {
          background: var(--bg);
          color: var(--white);
          font-family: var(--font-body);
          overflow-x: hidden;
        }

        /* SCROLLBAR */
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: var(--bg); }
        ::-webkit-scrollbar-thumb { background: var(--cyan); border-radius: 2px; }

        /* NAV */
        .nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 100;
          display: flex; justify-content: space-between; align-items: center;
          padding: 1.1rem 3rem;
          background: rgba(5,10,15,0.7);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border);
        }
        .nav-logo {
          font-family: var(--font-mono);
          font-size: 1rem;
          color: var(--cyan);
          letter-spacing: 0.05em;
        }
        .nav-links { display: flex; gap: 2rem; }
        .nav-links a {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--muted);
          text-decoration: none;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--cyan); }

        /* HERO */
        .hero-wrap {
          min-height: 100vh;
          display: flex; align-items: center;
          position: relative; overflow: hidden;
          padding: 0 3rem;
        }
        .hero-grid-bg {
          position: absolute; inset: 0;
          background-image:
            linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
        .hero-glow {
          position: absolute; top: -10%; right: -5%;
          width: 60vw; height: 60vw; max-width: 700px; max-height: 700px;
          background: radial-gradient(circle, rgba(0,229,255,0.07) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-inner { max-width: 860px; position: relative; z-index: 1; }
        .hero-tag {
          display: inline-block;
          font-family: var(--font-mono); font-size: 0.75rem;
          color: var(--cyan); border: 1px solid rgba(0,229,255,0.35);
          padding: 0.3rem 0.8rem; border-radius: 999px;
          letter-spacing: 0.12em; text-transform: uppercase;
          margin-bottom: 1.6rem;
        }
        .hero-name {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 6vw, 6.5rem);
          font-weight: 600;
          line-height: 1;
          letter-spacing: 0.04em;
          color: var(--white);
          margin-bottom: 0.4rem;
        }
        .hero-name span { color: var(--cyan); }
        .hero-role {
          font-family: var(--font-mono);
          font-size: clamp(0.9rem, 2vw, 1.15rem);
          color: var(--muted);
          margin-bottom: 1.8rem;
          letter-spacing: 0.04em;
        }
        .terminal-cursor {
          display: inline-block;
          color: var(--cyan);
          animation: blink 1s step-end infinite;
        }
        @keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }

        .hero-btns { display: flex; gap: 1rem; flex-wrap: wrap; margin-top: 0.5rem; }
        .btn-primary {
          font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.08em;
          background: var(--cyan); color: var(--bg);
          padding: 0.75rem 1.8rem; border-radius: 6px;
          text-decoration: none; font-weight: 600;
          transition: background 0.2s, transform 0.15s;
        }
        .btn-primary:hover { background: #33ebff; transform: translateY(-2px); }
        .btn-secondary {
          font-family: var(--font-mono); font-size: 0.8rem; letter-spacing: 0.08em;
          border: 1px solid var(--border); color: var(--muted);
          padding: 0.75rem 1.8rem; border-radius: 6px;
          text-decoration: none;
          transition: border-color 0.2s, color 0.2s, transform 0.15s;
        }
        .btn-secondary:hover { border-color: var(--cyan); color: var(--cyan); transform: translateY(-2px); }

        /* SECTION COMMON */
        section { padding: 6rem 3rem; }
        .section-inner { max-width: 960px; margin: 0 auto; }
        .section-label {
          font-family: var(--font-mono); font-size: 0.72rem;
          color: var(--cyan); letter-spacing: 0.18em; text-transform: uppercase;
          margin-bottom: 0.6rem;
        }
        .section-title {
          font-family: var(--font-display); font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 800; letter-spacing: -0.02em;
          margin-bottom: 2.5rem; line-height: 1.1;
        }

        /* ABOUT */
        .about-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;
          align-items: start;
        }
        @media (max-width: 720px) { .about-grid { grid-template-columns: 1fr; } }
        .about-text p {
          color: var(--muted); line-height: 1.9; font-size: 1rem; font-weight: 300;
          margin-bottom: 1rem;
        }
        .about-text p strong { color: var(--white); font-weight: 500; }
        .about-stats {
          display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;
        }
        .stat-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px; padding: 1.4rem;
          text-align: center;
          transition: border-color 0.2s, transform 0.2s;
        }
        .stat-card:hover { border-color: var(--cyan); transform: translateY(-3px); }
        .stat-num {
          font-family: var(--font-display); font-size: 2.4rem; font-weight: 800;
          color: var(--cyan); line-height: 1;
        }
        .stat-label { font-size: 0.78rem; color: var(--muted); margin-top: 0.3rem; letter-spacing: 0.05em; }

        /* SKILLS */
        .skills-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 0.9rem 3rem;
        }
        @media (max-width: 640px) { .skills-grid { grid-template-columns: 1fr; } }
        .skill-row { display: flex; flex-direction: column; gap: 0.4rem; }
        .skill-label { display: flex; align-items: center; gap: 0.5rem; }
        .skill-icon { font-size: 1rem; }
        .skill-name { font-size: 0.85rem; color: var(--white); flex: 1; }
        .skill-pct { font-family: var(--font-mono); font-size: 0.72rem; color: var(--cyan); }
        .skill-track {
          height: 4px; background: var(--surface2);
          border-radius: 2px; overflow: hidden;
        }
        .skill-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--cyan), var(--green));
          border-radius: 2px;
        }

        /* PROJECTS */
        .projects-list { display: flex; flex-direction: column; gap: 1.5rem; }
        .project-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px; padding: 2rem;
          transition: border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .project-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.4);
        }
        .project-header { display: flex; justify-content: space-between; align-items: flex-start; flex-wrap: wrap; gap: 1rem; margin-bottom: 0.8rem; }
        .project-title { font-family: var(--font-display); font-size: 1.3rem; font-weight: 700; }
        .project-tags { display: flex; gap: 0.5rem; flex-wrap: wrap; }
        .project-tag {
          font-family: var(--font-mono); font-size: 0.68rem;
          padding: 0.25rem 0.65rem; border-radius: 999px;
          letter-spacing: 0.06em;
        }
        .project-desc { color: var(--muted); line-height: 1.75; font-size: 0.92rem; margin-bottom: 1rem; font-weight: 300; }
        .project-link {
          font-family: var(--font-mono); font-size: 0.78rem;
          text-decoration: none; display: inline-flex; align-items: center; gap: 0.3rem;
          transition: gap 0.2s;
        }
        .project-link:hover { gap: 0.6rem; }

        /* SECURITY */
        .security-section { background: var(--surface); }
        .security-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem;
        }
        @media (max-width: 640px) { .security-grid { grid-template-columns: 1fr; } }
        .sec-card {
          background: var(--bg);
          border: 1px solid var(--border); border-radius: 12px; padding: 1.5rem;
          transition: border-color 0.2s, transform 0.2s;
        }
        .sec-card:hover { border-color: var(--cyan); transform: translateY(-3px); }
        .sec-icon { font-size: 1.8rem; margin-bottom: 0.7rem; }
        .sec-title { font-family: var(--font-display); font-size: 1rem; font-weight: 700; margin-bottom: 0.4rem; }
        .sec-desc { color: var(--muted); font-size: 0.84rem; line-height: 1.6; font-weight: 300; }

        /* CONTACT */
        .contact-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;
          align-items: start;
        }
        @media (max-width: 720px) { .contact-grid { grid-template-columns: 1fr; } }
        .contact-blurb { color: var(--muted); line-height: 1.85; font-weight: 300; margin-bottom: 1.5rem; }
        .contact-items { display: flex; flex-direction: column; gap: 1rem; }
        .contact-item {
          display: flex; align-items: center; gap: 0.8rem;
          color: var(--muted); font-size: 0.9rem;
          text-decoration: none; transition: color 0.2s;
        }
        .contact-item:hover { color: var(--cyan); }
        .contact-icon {
          width: 38px; height: 38px;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1rem; flex-shrink: 0;
          transition: border-color 0.2s;
        }
        .contact-item:hover .contact-icon { border-color: var(--cyan); }
        .contact-cta {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 16px; padding: 2rem;
        }
        .contact-cta p { color: var(--muted); font-size: 0.9rem; line-height: 1.7; margin-bottom: 1.2rem; font-weight: 300; }

        /* FOOTER */
        footer {
          border-top: 1px solid var(--border);
          padding: 2rem 3rem;
          display: flex; justify-content: space-between; align-items: center;
          font-family: var(--font-mono); font-size: 0.72rem; color: var(--muted);
        }
        footer span { color: var(--cyan); }
      `}</style>

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">PP://profile</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#security">Security</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero-wrap" ref={heroRef}>
        <div className="hero-grid-bg" />
        <div className="hero-glow" />
        <motion.div className="hero-inner" style={{ y: heroY, opacity: heroOpacity }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="hero-tag">Available for opportunities</div>
          </motion.div>
          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Prajjwal<br /><span>Pachauri</span>
          </motion.h1>
          <motion.p
            className="hero-role"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <TypewriterText text="Security Engineer & Backend Developer" />
          </motion.p>
          <motion.div
            className="hero-btns"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <a href="#projects" className="btn-primary">View Projects</a>
            <a href="#contact" className="btn-secondary">Let's Connect</a>
          </motion.div>
        </motion.div>
      </div>

      {/* ABOUT */}
      <section id="about" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <div className="section-label">// who I am</div>
          <h2 className="section-title">About Me</h2>
          <div className="about-grid">
            <motion.div
              className="about-text"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p>
                👋 I'm <strong>passionate about Java development</strong>, with a deep focus on <strong>Spring Boot</strong>, security engineering, and building systems that are robust by design — not as an afterthought.
              </p>
              <p>
                🔍 I'm a highly motivated Backend Developer with a <strong>strong foundation in Java</strong> and a keen interest in building secure, scalable applications. My enthusiasm for technology drives me to continually grow in this dynamic field.
              </p>
              <p>
                🛠️ Beyond code quality, I care deeply about <strong>architecture</strong>: clean service boundaries, event-driven designs with Kafka, and well-modelled data layers using Spring Data JPA. I love creating <strong>efficient, elegant solutions</strong> to complex backend problems.
              </p>
              <p>
                🌟 I'm committed to <strong>delivering high-quality code</strong>, collaborating effectively with cross-functional teams, and staying sharp on industry trends. A quick learner and problem-solver at heart — always ready for the next challenge.
              </p>
            </motion.div>
            <motion.div
              className="about-stats"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              {[
                { num: "1+", label: "Year Experience" },
                { num: "10+", label: "Projects Built" },
                { num: "12+", label: "Technologies" },
                { num: "100%", label: "Commitment" },
              ].map((s) => (
                <div className="stat-card" key={s.label}>
                  <div className="stat-num">{s.num}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ background: "var(--surface)" }}>
        <div className="section-inner">
          <div className="section-label">// tech stack</div>
          <h2 className="section-title">Skills & Technologies</h2>
          <div className="skills-grid">
            {skills.map((s, i) => (
              <SkillBar key={s.name} {...s} delay={i * 0.06} />
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <div className="section-label">// what I've built</div>
          <h2 className="section-title">Projects</h2>
          <div className="projects-list">
            {projects.map((p, i) => (
              <motion.div
                key={p.title}
                className="project-card"
                style={{ "--accent": p.accent }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ borderColor: p.accent }}
              >
                <div className="project-header">
                  <div className="project-title">{p.title}</div>
                  <div className="project-tags">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="project-tag"
                        style={{ background: `${p.accent}18`, color: p.accent, border: `1px solid ${p.accent}40` }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="project-desc">{p.desc}</p>
                <a href={p.link} className="project-link" style={{ color: p.accent }}>
                  View on GitHub <span>→</span>
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECURITY */}
      <section id="security" className="security-section">
        <div className="section-inner">
          <div className="section-label">// defense in depth</div>
          <h2 className="section-title">Security Practices</h2>
          <div className="security-grid">
            {securityPractices.map((s, i) => (
              <motion.div
                key={s.title}
                className="sec-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="sec-icon">{s.icon}</div>
                <div className="sec-title">{s.title}</div>
                <div className="sec-desc">{s.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ background: "var(--bg)" }}>
        <div className="section-inner">
          <div className="section-label">// let's talk</div>
          <h2 className="section-title">Get In Touch</h2>
          <div className="contact-grid">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <p className="contact-blurb">
                📫 I'm <strong style={{ color: "var(--white)" }}>open to networking, collaboration, and new opportunities</strong>. Whether you're a fellow tech enthusiast, an industry professional, or a potential client — let's explore how we can build something exceptional together.
              </p>
              <div className="contact-items">
                <a href="mailto:prajjwalpachauri725@gmail.com" className="contact-item">
                  <div className="contact-icon">📧</div>
                  prajjwalpachauri725@gmail.com
                </a>
                <a href="tel:+918273159427" className="contact-item">
                  <div className="contact-icon">📞</div>
                  +91 82731 59427
                </a>
                <a href="https://github.com/prajjwal-cs" target="_blank" rel="noreferrer" className="contact-item">
                  <div className="contact-icon">🐙</div>
                  github.com/prajjwal-cs
                </a>
                <a href="https://www.linkedin.com/in/prajjwal-pachauri-19c/" target="_blank" rel="noreferrer" className="contact-item">
                  <div className="contact-icon">💼</div>
                  linkedin.com/in/prajjwal-pachauri-19c
                </a>
              </div>
            </motion.div>
            <motion.div
              className="contact-cta"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="section-label" style={{ marginBottom: "0.8rem" }}>// quick message</div>
              <p>Looking for a dedicated Java & Spring Boot developer who brings security-first thinking to every line of code? Let's connect and see what we can build.</p>
              <a href="mailto:prajjwalpachauri725@gmail.com" className="btn-primary" style={{ display: "inline-block" }}>
                Send Email →
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <span>Prajjwal Pachauri</span>
        <div>© 2026 · Built with <span>React</span> + <span>Framer Motion</span></div>
        <div style={{ color: "var(--cyan)" }}>#JavaDeveloper #SpringBoot #Security</div>
      </footer>
    </>
  );
}