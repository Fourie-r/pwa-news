importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');


if (workbox) {
    console.log(`Yay! Workbox is loaded 🎉`);
  } else {
    console.log(`Boo! Workbox didn't load 😬`);
  }

const staticAssests = [
    './',
    './styles.css',
    './app.js',
    './fallback.json',
    './images/fetch-dog.jpg'
];

workbox.precaching.precacheAndRoute(staticAssests);

workbox.routing.registerRoute(
    new RegExp('https://newsapi.org/'),
    workbox.strategies.networkFirst()
  );


workbox.routing.registerRoute(/.*\.(png|jpg|jpeg|gif)/, workbox.strategies.cacheFirst({
    cacheName: 'news-images',
    plugins:[ new workbox.expiration.Plugin({
        maxAgeSeconds: 12 * 60 * 60,
        maxEntries: 20
        }),
        new workbox.cacheableResponse.Plugin({
            statuses: [0, 200],
        })
    ],
    cacheableResponse: { statuses: [0, 200]}
}));
