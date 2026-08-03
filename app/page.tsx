"use client";

import { EventBadgeSlot } from "./components/badge-slot";
import { LanguageToggle } from "./components/language-provider";
import { useLang } from "./components/language-provider";
import { ThemeToggle } from "./components/theme-toggle";
import {
  content,
  CV_PATH,
  EMAIL,
  GITHUB,
  LINKEDIN,
  PHONE_DISPLAY,
  PHONE_TEL,
} from "./content";

export default function Home() {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <>
      <header className="masthead" suppressHydrationWarning>
        <div className="shell masthead-inner">
          <a className="masthead-brand" href="#top">
            <span className="masthead-mark" aria-hidden="true">
              FI·26
            </span>
            Felix Ivander
          </a>

          <nav className="masthead-nav" aria-label={t.nav.aria}>
            <a className="masthead-link" href="#log">
              {t.nav.log}
            </a>
            <a className="masthead-link" href="#registry">
              {t.nav.registry}
            </a>
            <a className="masthead-link" href="#spec">
              {t.nav.spec}
            </a>
            <a className="masthead-link" href="#kontak">
              {t.nav.kontak}
            </a>
            <span className="status">
              <span className="status-dot" aria-hidden="true" />
              {t.nav.status}
            </span>
            <ThemeToggle />
            <LanguageToggle />
          </nav>
        </div>
      </header>

      <main id="top" className="shell" suppressHydrationWarning>
        <section className="hero">
          <div>
            <p className="hero-eyebrow">{t.hero.eyebrow}</p>
            <h1 className="hero-title">{t.hero.title}</h1>
            <p className="hero-sub">{t.hero.sub}</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={`mailto:${EMAIL}`}>
                {t.hero.email}
              </a>
              <a
                className="btn btn-ghost"
                href={LINKEDIN}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.hero.linkedin} <span className="arrow" aria-hidden="true">→</span>
              </a>
              <a
                className="btn btn-ghost"
                href={GITHUB}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t.hero.github} <span className="arrow" aria-hidden="true">→</span>
              </a>
              <a className="btn btn-text" href={CV_PATH} download>
                {t.hero.cv} <span className="arrow" aria-hidden="true">↓</span>
              </a>
            </div>
          </div>

          <div className="console" role="region" aria-label={t.console.aria}>
            <p className="console-cmd">
              <b>$</b> {t.console.cmd}
            </p>
            {t.console.lines.map((line, i) => (
              <p
                key={line.label}
                className="console-line"
                style={{ animationDelay: `${0.15 + i * 0.09}s` }}
              >
                <span className="console-label">{line.label}</span>
                <span
                  className={`console-val${line.hot ? " hot" : ""}${line.strong ? " strong" : ""}`}
                >
                  {line.value}
                </span>
              </p>
            ))}
            <p
              className="console-line"
              style={{ animationDelay: `${0.15 + t.console.lines.length * 0.09}s` }}
            >
              <span className="console-label">{t.console.exitLabel}</span>
              <span className="console-val">{t.console.exitValue}</span>
              <span className="cursor" aria-hidden="true" />
            </p>
          </div>
        </section>

        <section className="section" id="log" aria-labelledby="log-title">
          <p className="section-eyebrow">
            <b>LOG</b> — {t.log.eyebrow}
          </p>
          <h2 className="section-title" id="log-title">
            {t.log.title}
          </h2>

          <div className="log">
            {t.log.entries.map((entry) => (
              <article key={`${entry.role}-${entry.period}`} className="log-row">
                <p className="log-date">
                  <span className="log-dot" aria-hidden="true" />
                  {entry.period}
                </p>
                <div>
                  <h3 className="log-role">{entry.role}</h3>
                  <p className="log-org">{entry.org}</p>
                  <ul className="log-list">
                    {entry.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="registry" aria-labelledby="registry-title">
          <p className="section-eyebrow">
            <b>REGISTRY</b> — {t.registry.eyebrow}
          </p>
          <h2 className="section-title" id="registry-title">
            {t.registry.title}
          </h2>

          <div className="registry">
            {t.registry.entries.map((project) => (
              <article key={project.id} className="reg-card">
                <div className="reg-top">
                  <span className="reg-id">{project.id}</span>
                  <span className="reg-cat">{project.category}</span>
                </div>
                <h3 className="reg-title">{project.title}</h3>
                <p className="reg-desc">{project.description}</p>
                <div className="chips">
                  {project.tags.map((tag) => (
                    <span key={tag} className="chip">
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="research" aria-labelledby="research-title">
          <p className="section-eyebrow">
            <b>RESEARCH</b> — {t.research.eyebrow}
          </p>
          <h2 className="section-title" id="research-title">
            {t.research.title}
          </h2>

          <article className="research-card">
            <div>
              <p className="log-org">{t.research.cohort}</p>
              <h3 className="research-title">{t.research.name}</h3>
              <ul className="log-list">
                {t.research.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
            <div className="research-meta">
              <p className="meta-label">{t.research.methods}</p>
              <div className="chips">
                {["XGBoost", "Random Forest", "SHAP", "LLM Integration", "Python"].map(
                  (tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ),
                )}
              </div>
              <p className="meta-label">{t.research.dataset}</p>
              <p className="meta-value">{t.research.datasetValue}</p>
            </div>
          </article>
        </section>

        <section className="section" id="spec" aria-labelledby="spec-title">
          <p className="section-eyebrow">
            <b>SPEC</b> — {t.spec.eyebrow}
          </p>
          <h2 className="section-title" id="spec-title">
            {t.spec.title}
          </h2>

          <div className="spec">
            {t.spec.groups.map((group) => (
              <div key={group.name} className="spec-row">
                <p className="spec-name">{group.name}</p>
                <div className="spec-chips">
                  {group.techs.map((tech) => (
                    <span key={tech} className="chip">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="credentials" aria-labelledby="creds-title">
          <p className="section-eyebrow">
            <b>CREDENTIALS</b> — {t.credentials.eyebrow}
          </p>
          <h2 className="section-title" id="creds-title">
            {t.credentials.title}
          </h2>

          <div className="creds">
            {t.credentials.entries.map((cred) => (
              <article key={cred.title} className="cred">
                <p className="cred-eyebrow">{cred.eyebrow}</p>
                <h3 className="cred-title">{cred.title}</h3>
                <p className="cred-sub">{cred.sub}</p>
                <p className="cred-body">{cred.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section cta" id="kontak" aria-labelledby="cta-title">
          <div className="cta-grid">
            <div>
              <h2 className="cta-title" id="cta-title">
                {t.cta.title}
              </h2>
              <div className="cta-actions">
                <a className="btn btn-primary" href={`mailto:${EMAIL}`}>
                  {t.cta.email}
                </a>
                <a
                  className="btn btn-ghost"
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.cta.linkedin} <span className="arrow" aria-hidden="true">→</span>
                </a>
                <a
                  className="btn btn-ghost"
                  href={GITHUB}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t.cta.github} <span className="arrow" aria-hidden="true">→</span>
                </a>
                <a className="btn btn-text" href={CV_PATH} download>
                  {t.cta.cv} <span className="arrow" aria-hidden="true">↓</span>
                </a>
              </div>
              <p className="contact-meta">
                <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a> · <a href={`mailto:${EMAIL}`}>{EMAIL}</a> · Jakarta Timur, ID
              </p>
            </div>
            <EventBadgeSlot />
          </div>
        </section>
      </main>

      <footer className="footer shell" suppressHydrationWarning>
        <span>{t.footer.eof}</span>
        <span>{t.footer.updated}</span>
      </footer>
    </>
  );
}
