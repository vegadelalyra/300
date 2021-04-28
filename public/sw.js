;
// Asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_300',
      urlsToCache = [
          './',
          './300.css',
          './300.js',
          './favicon.png'
      ]

// Durante la fase de instalación, generalmente se almacenan en caché los activos estáticos      
self.addEventListener( 'install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then( cache => {
            return cache.addAll(urlsToCache)
            .then( () => self.skipWaiting() )
        })
        .catch( err => console.log('Cache register has failed', err) )
    )
})      


// Una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener( 'activate', e => {
    const cacheWhitelist = [CACHE_NAME]
    
    e.waitUntil(
        caches.keys()
        .then(cachesNames => {
            cacheNames.map(cacheName => {
                // Eliminamos lo que ya no se necesita en cache
                if (cacheWhitelist.indexOf(cacheName) === -1) {
                    return caches.delete(cacheName)
                }
            })
        })
        // Le indica al SW activar el cache actual
        .then( () => self.clients.claim() )
    )
})      


// Cuando el navegadador recupera una URL
self.addEventListener( 'fetch', e => {
    // Responder ya sea con el objeto en caché o continuar y buscar la URL real
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                // Recuperar del caché
                return res
            }

            // Recuperar de la petición a la URL
            return fetch(e.request)
        })
    )
})    