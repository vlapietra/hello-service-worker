
const VERSION = 'v3';

let getCacheName = () => `app-cache-${VERSION}`;

self.addEventListener('install', event => event.waitUntil(installServiceWorker()));


async function installServiceWorker() {

    log("Service Worker installation started ");

    const cache = await caches.open(getCacheName());

    return cache.addAll([
        '/',
        'carousel.css',
        'http://getbootstrap.com/dist/css/bootstrap.min.css',
        'https://code.jquery.com/jquery-3.2.1.slim.min.js',
        'http://getbootstrap.com/assets/js/vendor/popper.min.js',
        'http://getbootstrap.com/dist/js/bootstrap.min.js',
        'http://getbootstrap.com/assets/js/vendor/holder.min.js'
    ]);
}



self.addEventListener('activate', () => activateSW());

async function activateSW() {

    log('Service Worker activated');

    const cacheKeys = await caches.keys();

    cacheKeys.forEach(cacheKey => {
        if (cacheKey !== getCacheName() ) {
            caches.delete(cacheKey);
        }
    });
}


// handling service worker installation
self.addEventListener('fetch', event => {
    log("HTTP call intercepted - " + event.request.url);
    return event.respondWith(fetch(event.request.url));
});


// each logging line will be prepended with the service worker version
function log(message) {
    console.log(VERSION, message);
}
