'use client'

import { useEffect, useRef, useState } from 'react'
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import 'grapesjs-preset-newsletter'

// Type declaration for GrapesJS Editor
type GrapesJSEditor = {
  setComponents: (components: string) => void
  getHtml: () => string
  getCss: () => string | undefined
  destroy: () => void
}

export default function TemplateEditor({ code, templateId }: { code: string; templateId: string }) {
  const editorRef = useRef<HTMLDivElement>(null)
  const grapesjsRef = useRef<GrapesJSEditor | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  useEffect(() => {
    if (!editorRef.current) return

    // Initialize GrapesJS editor with newsletter preset
    const editor = grapesjs.init({
      container: editorRef.current,
      plugins: ['gjs-preset-newsletter'],
      pluginsOpts: {
        'gjs-preset-newsletter': {
          modalTitleImport: 'Import template',
        },
      },
      storageManager: false, // We'll handle saving manually
      height: '100vh',
      width: '100%',
    })

    // Load the existing HTML code
    editor.setComponents(code)

    grapesjsRef.current = editor

    // Cleanup on unmount
    return () => {
      if (grapesjsRef.current) {
        grapesjsRef.current.destroy()
        grapesjsRef.current = null
      }
    }
  }, [code])

  const handleSave = async () => {
    if (!grapesjsRef.current) return

    setIsSaving(true)
    setSaveMessage(null)

    try {
      // Get the HTML and CSS from the editor
      const html = grapesjsRef.current.getHtml()
      const css = grapesjsRef.current.getCss() || ''
      
      // Combine HTML and CSS
      const fullCode = `<style>${css}</style>${html}`

      // Update the template in Payload CMS
      const response = await fetch(`/api/templates/${templateId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: fullCode,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to save template')
      }

      setSaveMessage({ type: 'success', text: 'Template saved successfully!' })
      
      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage(null)
      }, 3000)
    } catch (error) {
      console.error('Error saving template:', error)
      setSaveMessage({ type: 'error', text: 'Failed to save template. Please try again.' })
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <div
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignItems: 'flex-end',
        }}
      >
        {saveMessage && (
          <div
            style={{
              padding: '10px 20px',
              borderRadius: '4px',
              backgroundColor: saveMessage.type === 'success' ? '#4caf50' : '#f44336',
              color: 'white',
              fontSize: '14px',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            {saveMessage.text}
          </div>
        )}
        <button
          onClick={handleSave}
          disabled={isSaving}
          style={{
            padding: '12px 24px',
            backgroundColor: '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: isSaving ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            opacity: isSaving ? 0.6 : 1,
          }}
        >
          {isSaving ? 'Saving...' : 'Save Template'}
        </button>
      </div>

      <div ref={editorRef} />
    </div>
  )
}
