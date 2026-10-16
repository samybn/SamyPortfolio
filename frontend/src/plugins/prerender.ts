import fs from 'node:fs'
import path from 'node:path'
import type { Plugin } from 'vite'
import { PROJECTS_DATA, type ProjectDetail } from '../app/data/projectsData'

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function generateProjectSemanticHtml(p: ProjectDetail): string {
  const allImages = (p.images && p.images.length > 0)
    ? p.images
    : [p.col1img1, p.col1img2, p.col2img].filter(Boolean)

  return `
        <!-- Pre-rendered semantic project detail for search crawlers & instant FCP (hydrated by React) -->
        <a href="#main-content" class="skip-link">Passer au contenu principal</a>
        
        <header style="padding: 20px 24px; max-width: 1200px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center;">
          <nav aria-label="Navigation secondaire">
            <a href="/#projects" style="color: #00b4d8; text-decoration: none; font-size: 0.95rem; font-weight: 500; display: inline-flex; align-items: center; gap: 8px;">
              <span>←</span> Retour aux projets
            </a>
          </nav>
          <a href="/" style="color: #D7E2EA; text-decoration: none; font-weight: 700; font-size: 1rem;">Bouadloune Samy</a>
        </header>

        <main id="main-content" style="max-width: 1200px; margin: 0 auto; padding: 20px 24px 80px; color: #D7E2EA; font-family: 'Kanit', sans-serif;">
          <header style="margin-bottom: 40px;">
            <div style="display: flex; gap: 12px; align-items: center; margin-bottom: 16px;">
              <span style="color: #00b4d8; font-weight: 700; font-size: 1.25rem;">${p.number}</span>
              <span style="background: rgba(215,226,234,0.1); color: #D7E2EA; padding: 4px 12px; border-radius: 9999px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 600;">
                ${escapeHtml(p.category)}
              </span>
            </div>

            <h1 style="font-size: clamp(2.2rem, 5vw, 3.5rem); margin: 0 0 16px 0; color: #FFFFFF; font-weight: 800; line-height: 1.15;">
              ${escapeHtml(p.name)}
            </h1>

            <p style="font-size: clamp(1.1rem, 2vw, 1.35rem); opacity: 0.85; margin: 0 0 32px 0; line-height: 1.6; max-width: 800px;">
              ${escapeHtml(p.tagline)}
            </p>

            ${(p.liveUrl || p.githubUrl) ? `
            <div style="display: flex; gap: 16px; margin-top: 24px;">
              ${p.liveUrl ? `<a href="${p.liveUrl}" target="_blank" rel="noopener noreferrer" style="color: #00b4d8; font-weight: 500; text-decoration: none;">Voir le projet ↗</a>` : ''}
              ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" rel="noopener noreferrer" style="color: #00b4d8; font-weight: 500; text-decoration: none;">GitHub ↗</a>` : ''}
            </div>` : ''}
          </header>

          <section style="margin-bottom: 48px;">
            <h2 style="font-size: 1.75rem; border-bottom: 1px solid rgba(215,226,234,0.15); padding-bottom: 12px; color: #FFFFFF; margin-bottom: 16px;">
              À propos du projet
            </h2>
            <p style="opacity: 0.85; line-height: 1.8; font-size: 1.05rem;">
              ${escapeHtml(p.description)}
            </p>
            ${p.challenges ? `
            <div style="margin-top: 24px; padding: 20px; background: rgba(0, 180, 216, 0.06); border-left: 4px solid #00b4d8; border-radius: 0 12px 12px 0;">
              <strong style="color: #00b4d8; display: block; margin-bottom: 6px;">Défi &amp; Challenge technique</strong>
              <span style="opacity: 0.9; line-height: 1.7;">${escapeHtml(p.challenges)}</span>
            </div>` : ''}
          </section>

          <section style="margin-bottom: 48px;">
            <h2 style="font-size: 1.75rem; border-bottom: 1px solid rgba(215,226,234,0.15); padding-bottom: 12px; color: #FFFFFF; margin-bottom: 20px;">
              Fonctionnalités clés
            </h2>
            <ul style="opacity: 0.85; line-height: 1.9; font-size: 1.05rem; padding-left: 24px;">
              ${p.features.map(f => `<li style="margin-bottom: 8px;">${escapeHtml(f)}</li>`).join('')}
            </ul>
          </section>

          <section style="margin-bottom: 48px;">
            <h2 style="font-size: 1.75rem; border-bottom: 1px solid rgba(215,226,234,0.15); padding-bottom: 12px; color: #FFFFFF; margin-bottom: 20px;">
              Stack technique
            </h2>
            <div style="display: flex; flex-wrap: wrap; gap: 10px;">
              ${p.technologies.map(t => `
                <span style="background: rgba(0, 180, 216, 0.12); color: #90e0ef; border: 1px solid rgba(0, 180, 216, 0.25); padding: 6px 16px; border-radius: 9999px; font-size: 0.9rem; font-weight: 500;">
                  ${escapeHtml(t)}
                </span>
              `).join('')}
            </div>
          </section>

          <section style="margin-bottom: 64px;">
            <h2 style="font-size: 1.75rem; border-bottom: 1px solid rgba(215,226,234,0.15); padding-bottom: 12px; color: #FFFFFF; margin-bottom: 24px;">
              Aperçus du projet
            </h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px;">
              ${allImages.map((img, idx) => `
                <figure style="margin: 0; border-radius: 16px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); background: #141414;">
                  <img src="${img}" alt="${escapeAttr(p.name)} - Capture ${idx + 1}" loading="lazy" style="width: 100%; height: auto; display: block;" />
                </figure>
              `).join('')}
            </div>
          </section>

          <footer style="text-align: center; padding-top: 32px; border-top: 1px solid rgba(255,255,255,0.08);">
            <a href="/#projects" style="display: inline-block; background: #00b4d8; color: #0C0C0C; font-weight: 600; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-size: 0.95rem;">
              Explorer d'autres projets
            </a>
          </footer>
        </main>
  `
}

function generateHomeSemanticHtml(projects: ProjectDetail[]): string {
  return `
        <!-- Pre-rendered semantic fallback for search crawlers & accessibility (replaced dynamically by React) -->
        <a href="#main-content" class="skip-link">Passer au contenu principal</a>
        <header style="padding: 24px 20px; text-align: center;">
          <nav aria-label="Navigation principale">
            <a href="#hero" style="color: #D7E2EA; margin: 0 12px; text-decoration: none; font-weight: 500;">Accueil</a>
            <a href="#skills" style="color: #D7E2EA; margin: 0 12px; text-decoration: none; font-weight: 500;">Compétences</a>
            <a href="#projects" style="color: #D7E2EA; margin: 0 12px; text-decoration: none; font-weight: 500;">Projets</a>
            <a href="#contact" style="color: #D7E2EA; margin: 0 12px; text-decoration: none; font-weight: 500;">Contact</a>
          </nav>
        </header>

        <main id="main-content" style="max-width: 1000px; margin: 0 auto; padding: 20px 24px 80px; color: #D7E2EA; font-family: 'Kanit', sans-serif;">
          <section id="hero" style="text-align: center; margin-bottom: 70px;">
            <p style="text-transform: uppercase; letter-spacing: 0.25em; opacity: 0.6; font-size: 0.85rem; margin-bottom: 12px;">PORTFOLIO '26 · GÉNIE LOGICIEL</p>
            <h1 style="font-size: clamp(1.5rem, 5.2vw, 4.2rem); margin: 0 0 16px 0; font-weight: 800; color: #FFFFFF; line-height: 1.1; white-space: nowrap;">Bouadloune Samy</h1>
            <p style="font-size: clamp(1.2rem, 2.5vw, 1.5rem); opacity: 0.9; color: #90e0ef; margin: 0 0 20px 0;">Étudiant en Master spécialisé en Génie Logiciel · Développeur Full Stack</p>
            <p style="max-width: 680px; margin: 0 auto 32px; opacity: 0.75; line-height: 1.8; font-size: 1.05rem;">
              Passionné par l'ingénierie logicielle et le développement Full Stack, je conçois et développe des applications web, mobiles et distribuées modernes, performantes et scalables.
            </p>
            <div style="display: flex; gap: 16px; justify-content: center; flex-wrap: wrap;">
              <a href="#projects" style="background: #00b4d8; color: #0C0C0C; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: 600;">Découvrir mes projets</a>
              <a href="#contact" style="border: 1px solid rgba(215,226,234,0.3); color: #D7E2EA; padding: 12px 28px; border-radius: 9999px; text-decoration: none; font-weight: 500;">Me contacter</a>
            </div>
          </section>

          <section id="skills" style="margin-bottom: 70px;">
            <h2 style="font-size: 2rem; border-bottom: 1px solid rgba(215,226,234,0.15); padding-bottom: 12px; color: #FFFFFF; margin-bottom: 24px;">Stack Technique &amp; Compétences</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px;">
              <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
                <h3 style="color: #00b4d8; font-size: 1.15rem; margin-top: 0;">Backend &amp; Systèmes</h3>
                <p style="opacity: 0.8; line-height: 1.7; margin-bottom: 0;">Java, Spring Boot, Python, Node.js, Express, REST APIs, Microservices</p>
              </div>
              <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
                <h3 style="color: #00b4d8; font-size: 1.15rem; margin-top: 0;">Frontend &amp; UI</h3>
                <p style="opacity: 0.8; line-height: 1.7; margin-bottom: 0;">React, Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP, Responsive Design</p>
              </div>
              <div style="background: rgba(255,255,255,0.03); padding: 20px; border-radius: 12px; border: 1px solid rgba(255,255,255,0.08);">
                <h3 style="color: #00b4d8; font-size: 1.15rem; margin-top: 0;">Bases de Données &amp; DevOps</h3>
                <p style="opacity: 0.8; line-height: 1.7; margin-bottom: 0;">PostgreSQL, MySQL, Redis, Docker, Cloudflare Workers/KV, Linux, Git, CI/CD</p>
              </div>
            </div>
          </section>

          <section id="projects" style="margin-bottom: 70px;">
            <h2 style="font-size: 2rem; border-bottom: 1px solid rgba(215,226,234,0.15); padding-bottom: 12px; color: #FFFFFF; margin-bottom: 24px;">Projets Sélectionnés</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px;">
              ${projects.map(p => `
                <article style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; display: flex; flex-direction: column; justify-content: space-between;">
                  <div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
                      <span style="color: #00b4d8; font-weight: 700; font-size: 0.95rem;">${p.number}</span>
                      <span style="background: rgba(215,226,234,0.1); padding: 3px 10px; border-radius: 9999px; font-size: 0.75rem; text-transform: uppercase;">${escapeHtml(p.category)}</span>
                    </div>
                    <h3 style="font-size: 1.35rem; color: #FFFFFF; margin: 0 0 8px 0;">
                      <a href="/projects/${p.id}" style="color: #FFFFFF; text-decoration: none;">${escapeHtml(p.name)}</a>
                    </h3>
                    <p style="opacity: 0.75; line-height: 1.6; font-size: 0.95rem; margin: 0 0 16px 0;">${escapeHtml(p.tagline)}</p>
                    <div style="display: flex; flex-wrap: wrap; gap: 6px; margin-bottom: 16px;">
                      ${p.technologies.slice(0, 4).map(t => `<span style="background: rgba(0, 180, 216, 0.1); color: #90e0ef; padding: 3px 10px; border-radius: 9999px; font-size: 0.75rem;">${escapeHtml(t)}</span>`).join('')}
                    </div>
                  </div>
                  <div>
                    <a href="/projects/${p.id}" style="color: #00b4d8; text-decoration: none; font-size: 0.9rem; font-weight: 500;">Découvrir le projet →</a>
                  </div>
                </article>
              `).join('')}
            </div>
          </section>

          <section id="contact" style="margin-bottom: 40px; text-align: center; padding: 40px 24px; background: rgba(255,255,255,0.02); border-radius: 20px; border: 1px solid rgba(255,255,255,0.06);">
            <h2 style="font-size: 2rem; color: #FFFFFF; margin-top: 0;">Entrons en Contact</h2>
            <p style="opacity: 0.8; line-height: 1.8; max-width: 580px; margin: 0 auto 24px;">
              Vous avez une opportunité, un projet ou souhaitez simplement échanger ? N'hésitez pas à m'envoyer un message via le formulaire ou directement par email.
            </p>
            <p style="font-size: 1.1rem; color: #00b4d8; font-weight: 600; margin: 0;">
              Based in Algeria · Ouvert aux opportunités en Génie Logiciel
            </p>
          </section>
        </main>
  `
}

export function prerenderPlugin(): Plugin {
  return {
    name: 'vite-plugin-prerender',
    apply: 'build',
    async closeBundle() {
      try {
        const distDir = path.resolve(process.cwd(), 'dist')
        const indexHtmlPath = path.join(distDir, 'index.html')

        if (!fs.existsSync(indexHtmlPath)) {
          console.warn('[prerender] dist/index.html not found, skipping SSG prerender.')
          return
        }

        const templateHtml = fs.readFileSync(indexHtmlPath, 'utf-8')

        // 1. Update dist/index.html with full home pre-rendered HTML
        const homeRootRegex = /<div id="root">([\s\S]*?)<\/div>/
        const homeHtml = templateHtml.replace(
          homeRootRegex,
          `<div id="root">${generateHomeSemanticHtml(PROJECTS_DATA)}</div>`
        )
        fs.writeFileSync(indexHtmlPath, homeHtml, 'utf-8')
        console.log('[prerender] ✓ dist/index.html updated with complete semantic home snapshot.')

        // 2. Generate pre-rendered static HTML for each project route
        for (const project of PROJECTS_DATA) {
          const projectTitle = `${project.name} — Bouadloune Samy | Portfolio Génie Logiciel`
          const projectDescription = project.tagline
          const projectUrl = `https://samy-bouadloune.pages.dev/projects/${project.id}`
          const projectImage = project.col1img1 || project.images?.[0] || 'https://samy-bouadloune.pages.dev/hero-bg.png'

          const projectSchema = {
            '@context': 'https://schema.org',
            '@type': 'SoftwareSourceCode',
            name: project.name,
            description: project.description,
            programmingLanguage: project.technologies,
            author: {
              '@type': 'Person',
              name: 'Bouadloune Samy',
              jobTitle: 'Développeur Full Stack & Génie Logiciel',
              url: 'https://samy-bouadloune.pages.dev',
            },
            url: projectUrl,
          }

          let pageHtml = templateHtml

          // Replace title
          pageHtml = pageHtml.replace(
            /<title>[\s\S]*?<\/title>/,
            `<title>${escapeHtml(projectTitle)}</title>`
          )

          // Replace description
          pageHtml = pageHtml.replace(
            /<meta name="description" content="[\s\S]*?" \/>/,
            `<meta name="description" content="${escapeAttr(projectDescription)}" />`
          )

          // Replace canonical
          pageHtml = pageHtml.replace(
            /<link rel="canonical" href="[\s\S]*?" \/>/,
            `<link rel="canonical" href="${projectUrl}" />`
          )

          // Replace OG tags
          pageHtml = pageHtml.replace(
            /<meta property="og:type" content="[\s\S]*?" \/>/,
            '<meta property="og:type" content="article" />'
          )
          pageHtml = pageHtml.replace(
            /<meta property="og:url" content="[\s\S]*?" \/>/,
            `<meta property="og:url" content="${projectUrl}" />`
          )
          pageHtml = pageHtml.replace(
            /<meta property="og:title" content="[\s\S]*?" \/>/,
            `<meta property="og:title" content="${escapeAttr(projectTitle)}" />`
          )
          pageHtml = pageHtml.replace(
            /<meta property="og:description" content="[\s\S]*?" \/>/,
            `<meta property="og:description" content="${escapeAttr(projectDescription)}" />`
          )
          pageHtml = pageHtml.replace(
            /<meta property="og:image" content="[\s\S]*?" \/>/,
            `<meta property="og:image" content="${escapeAttr(projectImage)}" />`
          )

          // Replace Twitter tags
          pageHtml = pageHtml.replace(
            /<meta name="twitter:title" content="[\s\S]*?" \/>/,
            `<meta name="twitter:title" content="${escapeAttr(projectTitle)}" />`
          )
          pageHtml = pageHtml.replace(
            /<meta name="twitter:description" content="[\s\S]*?" \/>/,
            `<meta name="twitter:description" content="${escapeAttr(projectDescription)}" />`
          )
          pageHtml = pageHtml.replace(
            /<meta name="twitter:image" content="[\s\S]*?" \/>/,
            `<meta name="twitter:image" content="${escapeAttr(projectImage)}" />`
          )

          // Replace Schema JSON-LD
          pageHtml = pageHtml.replace(
            /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
            `<script type="application/ld+json">\n${JSON.stringify(projectSchema, null, 2)}\n      </script>`
          )

          // Inject semantic project HTML into #root
          pageHtml = pageHtml.replace(
            homeRootRegex,
            `<div id="root">${generateProjectSemanticHtml(project)}</div>`
          )

          // Ensure output directory exists and write
          const projectDir = path.join(distDir, 'projects', project.id)
          fs.mkdirSync(projectDir, { recursive: true })
          fs.writeFileSync(path.join(projectDir, 'index.html'), pageHtml, 'utf-8')
        }

        console.log(`[prerender] ✓ Pre-rendered static HTML generated for all ${PROJECTS_DATA.length} project routes.`)

        // 3. Generate static 404.html
        let notFoundHtml = templateHtml
        notFoundHtml = notFoundHtml.replace(
          /<title>[\s\S]*?<\/title>/,
          '<title>404 — Page introuvable | Bouadloune Samy</title>'
        )
        notFoundHtml = notFoundHtml.replace(
          /<meta name="robots" content="[\s\S]*?" \/>/,
          '<meta name="robots" content="noindex, follow" />'
        )
        const notFoundRootHtml = `
        <a href="#main-content" class="skip-link">Passer au contenu principal</a>
        <main id="main-content" style="min-height: 80vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: #D7E2EA; font-family: 'Kanit', sans-serif; padding: 24px;">
          <h1 style="font-size: clamp(4rem, 10vw, 7rem); font-weight: 800; color: #00b4d8; margin: 0;">404</h1>
          <h2 style="font-size: clamp(1.5rem, 3vw, 2.2rem); margin: 12px 0 16px; color: #FFFFFF;">Page introuvable</h2>
          <p style="opacity: 0.75; max-width: 480px; margin: 0 auto 32px; line-height: 1.7;">
            La page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <a href="/" style="background: #00b4d8; color: #0C0C0C; font-weight: 600; padding: 12px 28px; border-radius: 9999px; text-decoration: none;">
            Retour à l'accueil
          </a>
        </main>`
        notFoundHtml = notFoundHtml.replace(homeRootRegex, `<div id="root">${notFoundRootHtml}</div>`)
        fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8')
        console.log('[prerender] ✓ dist/404.html generated.')

      } catch (err) {
        console.error('[prerender] Error during static pre-rendering:', err)
      }
    },
  }
}
