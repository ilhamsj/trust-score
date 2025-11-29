import { getPayload } from 'payload'
import { notFound } from 'next/navigation'
import config from '@/payload/payload.config'
import TemplateEditor from './components/TemplateEditor'
import { parseHtmlCss } from './utils/parseHtmlCss'

type Props = {
  params: Promise<{ id: string }>
}

export default async function page(props: Props) {
  const { id } = await props.params
  const payload = await getPayload({ config })
  const template = await payload.findByID({ collection: 'templates', id })

  if (!template) notFound()

  let html = template.html || ''
  let css = template.css || ''

  // Parse combined HTML/CSS if needed
  if (html && !css && html.includes('<style')) {
    const parsed = parseHtmlCss(html)
    html = parsed.html
    css = parsed.css
  }

  return <TemplateEditor templateId={id} initialHtml={html} initialCss={css} />
}
