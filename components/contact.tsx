import { ArrowUpRight } from 'lucide-react'

const socials = [
  { label: 'GitHub', href: 'https://github.com/panji710' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Instagram', href: 'https://instagram.com' },
]

export function Contact() {
  return (
    <section id="contact">
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-32">
        <p className="font-mono text-sm uppercase tracking-widest text-primary">
          04 — Contact
        </p>

        <h2 className="mt-6 text-balance text-4xl font-bold leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
          Interested in collaborating
          <br />
          or building together?
        </h2>

        <a
          href="mailto:muhammadpandji@gmail.com"
          className="mt-10 inline-flex items-center gap-3 text-2xl font-bold tracking-tight underline decoration-primary decoration-2 underline-offset-8 transition-colors hover:text-primary sm:text-4xl"
        >
          muhammadpandji@gmail.com
          <ArrowUpRight className="text-primary" size={32} />
        </a>

        <ul className="mt-12 flex flex-wrap gap-6">
          {socials.map((social) => (
            <li key={social.label}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm uppercase tracking-wide text-muted-foreground transition-colors hover:text-foreground"
              >
                {social.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
