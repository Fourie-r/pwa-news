const staticAssests = [
    './',
    './styles.css',
    './app.js',
    './fallback.json',
    './images/fetch-dog.jpg'
];



self.addEventListener('install',async e => {
    console.log('install')

    const cache = await caches.open('news-static');
    cache.addAll(staticAssests)

});

self.addEventListener('fetch', e => {

    const req = e.request;
    const url = new URL(req.url);

    if( url.origin === location.origin) {

        e.respondWith(cacheFirst(req));
    } else {
        e.respondWith(networkFirst(req));
    }
    
})


async function cacheFirst( req ) {
    const cacheResponse = await caches.match(req);
    return cacheResponse || fetch(req);
}

async function networkFirst( req ) {

    const cache = await caches.open('news-dynamic')

    try {
        const res = await fetch(req);
        cache.put(req, res.clone());
        return res;
    } catch (error) {

        const cacheResponse = await cache.match(req);
        return  cacheResponse || await caches.match('./fallback.json')
    }
}
