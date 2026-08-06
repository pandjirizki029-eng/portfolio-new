import { SiteNav } from '@/components/site-nav'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Experience } from '@/components/experience'
import { Projects } from '@/components/projects'
import { Contact } from '@/components/contact'
import { SiteFooter } from '@/components/site-footer'

export default function Page() {
  return (
    <main className="min-h-screen">
      <SiteNav />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Contact />
      <SiteFooter />
    </main>
  )
}
