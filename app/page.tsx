import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { AboutMe } from '@/components/about-me'
import { About } from '@/components/about'
import { Experience } from '@/components/experience'
import { Projects } from '@/components/projects'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'
import { PageWrapper } from '@/components/page-wrapper'

export default function Page() {
  return (
    <PageWrapper>
      <main className="min-h-screen">
        <SiteNav />
        <Hero />
        <AboutMe />
        <About />
        <Experience />
        <Projects />
        <Contact />
        <SiteFooter />
      </main>
    </PageWrapper>
  )
}
