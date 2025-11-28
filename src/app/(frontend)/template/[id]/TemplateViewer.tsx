'use client'

import { useEffect, useState } from 'react'

export default function TemplateViewer({ code }: { code: string }) {
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    setHtml(code)
  }, [code])

  return (
    <div style={{ width: '100%', minHeight: '100vh' }} dangerouslySetInnerHTML={{ __html: html }} />
  )
}
