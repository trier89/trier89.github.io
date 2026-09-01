var CACHE="subway-alarm-v2";
var ASSETS=["./","index.html","stations.json","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener("fetch",function(e){var u=e.request.url;if(u.indexOf("/api/")>=0||u.indexOf("odsay")>=0){return;}e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request);}));});
