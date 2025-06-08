import { SitemapStream, streamToPromise } from 'sitemap'
import { createWriteStream } from 'fs'
import { resolve } from 'path'

const BASE_URL = 'https://gearpoint.wuaze.com/'

const staticPages = [
    '',
    'magazin',
    'despre',
    'contacte',
    'cos'
]

async function generateSitemap() {
    const sitemap = new SitemapStream({ hostname: BASE_URL })

    
    const writeStream = createWriteStream(resolve('dist', 'sitemap.xml'))

    
    sitemap.pipe(writeStream)

    
    staticPages.forEach(page => {
        sitemap.write({ url: `/${page}`, changefreq: 'weekly', priority: 0.8 })
    })

    
    sitemap.end()

    
    await streamToPromise(sitemap)  

    console.log('✅ Sitemap: dist/sitemap.xml')
}

generateSitemap().catch(console.error)
