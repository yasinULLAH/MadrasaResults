importScripts('https://storage.googleapis.com/workbox-cdn/releases/7.0.0/workbox-sw.js');

if (workbox) {
    console.log(`Workbox is loaded.`);
    
    self.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'SKIP_WAITING') {
        console.log('Service Worker received SKIP_WAITING message, activating now.');
        self.skipWaiting();
      }
    });

    workbox.precaching.precacheAndRoute([
    {
        "url": "icon-72.png",
        "revision": "51ab3d567d07efe9483c1bb429743a1e"
    },
    {
        "url": "icon-96.png",
        "revision": "ee90faf161e01cbe6b7fc4a1f2159c2a"
    },
    {
        "url": "icon-128.png",
        "revision": "7f8736068a9daa62df9df4809e223d02"
    },
    {
        "url": "icon-144.png",
        "revision": "2f960867243b4e1c3cb661edc2af227a"
    },
    {
        "url": "icon-152.png",
        "revision": "4f14f60e60570dc800a506a78cc4348e"
    },
    {
        "url": "icon-192.png",
        "revision": "6b1ba484d8a13c812ff2bb6fa08f52a3"
    },
    {
        "url": "icon-384.png",
        "revision": "5cc8693e57abdbd4f0b4b34cc019b13c"
    },
    {
        "url": "icon-512.png",
        "revision": "e192c67d231ba14cabf2b9cdf5c65255"
    },
    {
        "url": "favicon.ico",
        "revision": "d2416fb5aa204341dc46c1d98f26c274"
    },
    {
        "url": ".gitattributes",
        "revision": "05bdb783ee6514c8c072e47680af8ff7"
    },
    {
        "url": ".gitignore",
        "revision": "d2c5968d33262f56a08751c3b4dad2d8"
    },
    {
        "url": "build pwa make html app offline and installable yasin best working re-run this for updates best for html only.pyw",
        "revision": "23ac1074e08741b425954fe977ec306c"
    },
    {
        "url": "client readme.md",
        "revision": "30d8b655ed6235a2e06a308cc96abdd2"
    },
    {
        "url": "FEATURES_REPORT.md",
        "revision": "52462fddbf2ad0b8bca46ea3b42e6c53"
    },
    {
        "url": "index.html",
        "revision": "e022564f01bfbd3e1e34a5f44f477edb"
    },
    {
        "url": "logo.png",
        "revision": "ab0290cafdf74db9c629f6d65fc45bee"
    },
    {
        "url": "main.js",
        "revision": "b35ae88c3ce29c916be2cd2c25733022"
    },
    {
        "url": "manifest.json",
        "revision": "f8c84f7b516deb377f43f677d117c6bf"
    },
    {
        "url": "offline.html",
        "revision": "e44c2a14d302044a1563011533ecb34c"
    },
    {
        "url": "package.json",
        "revision": "72378f272bbd80971bba71bac81480f3"
    },
    {
        "url": "pwa-register.js",
        "revision": "30562e4c2a2a3e07efc7cf94128baa1e"
    },
    {
        "url": "README.md",
        "revision": "b4e3d8f3b22d4c9b26d59cebf3d75db5"
    },
    {
        "url": "sw.js",
        "revision": "1b3fbfb6b86bd04581add2872aa478a5"
    },
    {
        "url": "xlsx.full.min.js",
        "revision": "84ff27b197f3b3fedc29a3a627b83c54"
    }
]);

    workbox.routing.registerRoute(
        ({request}) => request.destination === 'style' || request.destination === 'script',
        new workbox.strategies.StaleWhileRevalidate({ cacheName: 'asset-cache' })
    );

    workbox.routing.registerRoute(
        ({request}) => request.destination === 'image',
        new workbox.strategies.CacheFirst({
            cacheName: 'image-cache',
            plugins: [ new workbox.expiration.ExpirationPlugin({ maxEntries: 60, maxAgeSeconds: 30 * 24 * 60 * 60 }) ],
        })
    );

    workbox.routing.setCatchHandler(async ({event}) => {
        if (event.request.destination === 'document') {
            return await caches.match('offline.html') || Response.error();
        }
        return Response.error();
    });

} else {
    console.log(`Workbox failed to load.`);
}