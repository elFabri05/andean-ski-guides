import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://andeanskiguides.com'

  // Main pages with language alternatives
  const languages = ['en', 'es', 'de']

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}?lang=en`,
          es: `${baseUrl}?lang=es`,
          de: `${baseUrl}?lang=de`,
        },
      },
    },
  ]

  return routes
}
