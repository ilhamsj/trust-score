import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload/payload.config'
import React from 'react'
import TemplateViewer from './TemplateViewer'

type Props = {
  params: Promise<{
    id: string
  }>
}

export default async function page(props: Props) {
  const { id } = await props.params
  const payload = await getPayload({ config })
  const template = await payload.findByID({ collection: 'templates', id })

  if (!template) notFound()
  if (template.code === null) notFound()

  return <TemplateViewer code={template.code} />
}
