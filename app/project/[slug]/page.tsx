import { notFound } from 'next/navigation'
import { getAllProjectSlugs } from '@/lib/projects-data'
import { ProjectDetailView } from '@/components/project-detail'
import type { Metadata } from 'next'

// We import the raw data only for metadata (server-side)
import { getProjectBySlug } from '@/lib/projects-data'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) return { title: 'Project Not Found' }
  return {
    title: `${project.title} — Pandji Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params
  // Validate slug exists server-side, but pass only slug string to client
  const exists = getAllProjectSlugs().includes(slug)
  if (!exists) notFound()
  return <ProjectDetailView slug={slug} />
}
