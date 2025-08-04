import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mordor',
    short_name: 'Mordor',
    description: 'Aplikacja na siłownię',
    start_url: '/home',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}