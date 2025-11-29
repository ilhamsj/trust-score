import { StorageManagerConfig, ProjectData, Editor } from "grapesjs"

/**
 * Creates a storage manager configuration for GrapesJS editor
 * that integrates with Payload CMS API for saving/loading templates
 * 
 * @param templateId - The ID of the template being edited
 * @returns StorageManagerConfig configured for remote storage
 */
export const createStoreManager = (templateId: string): StorageManagerConfig => {
  return {
    type: 'remote',
    autosave: true,
    autoload: false, // Disabled - we load initial data from server-side
    stepsBeforeSave: 1,
    options: {
      remote: {
        urlStore: `/api/templates/${templateId}`,
        contentTypeJson: true,
        credentials: 'include',
        onStore: (data: ProjectData, editor: Editor): ProjectData => {
          const html = editor.getHtml()
          const css = editor.getCss() || ''
          return {
            html,
            css,
            projectData: data,
          }
        },
        fetchOptions: (opts: RequestInit): RequestInit => {
          // Use PATCH for updates
          if (opts.method === 'POST' || opts.method === 'PUT') {
            return { ...opts, method: 'PATCH' }
          }
          return opts
        },
      },
    },
  }
}