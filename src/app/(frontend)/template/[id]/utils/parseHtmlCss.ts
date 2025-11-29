/**
 * Parses HTML with embedded <style> tags and separates them
 */
export function parseHtmlCss(html: string): { html: string; css: string } {
  if (!html) return { html: '', css: '' }

  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi
  const cssParts: string[] = []
  let cleanHtml = html
  let match

  while ((match = styleRegex.exec(html)) !== null) {
    cssParts.push(match[1].trim())
    cleanHtml = cleanHtml.replace(match[0], '')
  }

  return { html: cleanHtml.trim(), css: cssParts.join('\n\n').trim() }
}

