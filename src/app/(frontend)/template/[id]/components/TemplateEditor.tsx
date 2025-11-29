'use client'

import 'grapesjs/dist/css/grapes.min.css'

import { createStoreManager } from '../config/storeManager'
import { parseHtmlCss } from '../utils/parseHtmlCss'
import { useEffect, useRef, useState } from 'react'
import grapesjs, { Editor, EditorConfig } from 'grapesjs'
import plugin from 'grapesjs-preset-newsletter'

type TemplateEditorProps = {
  templateId: string
  initialHtml?: string
  initialCss?: string
}

export default function TemplateEditor({ templateId, initialHtml, initialCss }: TemplateEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const grapesjsRef = useRef<Editor | null>(null)
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (!editorRef.current) return

    const config: EditorConfig = {
      container: editorRef.current,
      plugins: [plugin],
      storageManager: createStoreManager(templateId),
      height: '100vh',
      width: '100%',
      noticeOnUnload: false,
      avoidDefaults: true,
    }

    const editor = grapesjs.init(config)

    editor.on('load', () => {
      let html = initialHtml || ''
      let css = initialCss || ''

      if (html && html.includes('<style') && !css) {
        const parsed = parseHtmlCss(html)
        html = parsed.html
        css = parsed.css
      }

      if (html) editor.setComponents(html)
      if (css) editor.setStyle(css)
    })

    const showMessage = (type: 'success' | 'error', text: string) => {
      setSaveMessage({ type, text })
      setTimeout(() => setSaveMessage(null), type === 'success' ? 2000 : 3000)
    }

    editor.on('storage:store', () => showMessage('success', 'Auto-saved'))
    editor.on('storage:error:store', () => showMessage('error', 'Auto-save failed'))


    grapesjsRef.current = editor

    return () => {
      editor.destroy()
      grapesjsRef.current = null
    }
  }, [templateId])

  return (
    <>
      {saveMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: 20,
            left: 20,
            zIndex: 1000,
            padding: '10px 20px',
            borderRadius: 4,
            backgroundColor: saveMessage.type === 'success' ? '#4caf50' : '#f44336',
            color: 'white',
            fontSize: 14,
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          }}
        >
          {saveMessage.text}
        </div>
      )}
      <div ref={editorRef} style={{ width: '100%', height: '100vh' }} />
    </>
  )
}
