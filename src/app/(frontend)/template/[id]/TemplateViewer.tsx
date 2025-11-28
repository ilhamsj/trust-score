'use client'

import React from 'react'
import DOMPurify from 'dompurify'

export default function TemplateViewer({ code }: { code: string }) {
  const sanitizedHtml = DOMPurify.sanitize(code)

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      suppressHydrationWarning={true}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}
