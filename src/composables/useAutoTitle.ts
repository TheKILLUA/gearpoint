export function useAutoTitle() {
    const siteTitle = import.meta.env.VITE_SITE_TITLE || 'Site'
    const path = window.location.pathname

    const match = path.match(/^\/([^\/]+)\/?/)

    const pageName = match?.[1] || 'Pagina'

    const capitalized =
        pageName.charAt(0).toUpperCase() + pageName.slice(1).toLowerCase()

    if (path === '/' || pageName === 'index') {
        let description = import.meta.env.VITE_SITE_DESCRIPTION || '';

        if (description !== '') {
            description = '- ' + description;
        }

        document.title = `${siteTitle} ${description}`

        return
    }

    document.title = `${siteTitle} - ${capitalized}`
}
