var CACHE="subway-alarm-v3";
var ASSETS=["./","index.html","stations.json","manifest.json","icon-192.png","icon-512.png"];
self.addEventListener("install",function(e){e.waitUntil(caches.open(CACHE).then(function(c){return c.addAll(ASSETS);}).then(function(){return self.skipWaiting();}));});
self.addEventListener("activate",function(e){e.waitUntil(caches.keys().then(function(ks){return Promise.all(ks.filter(function(k){return k!==CACHE;}).map(function(k){return caches.delete(k);}));}).then(function(){return self.clients.claim();}));});
self.addEventListener("fetch",function(e){
  var u=e.request.url;
  if(u.indexOf("/api/")>=0||u.indexOf("odsay")>=0){return;}
  // 앱 화면(HTML)은 네트워크 우선 — 캐시 우선이면 업데이트가 영원히 안 내려간다
  var isDoc=(e.request.mode==="navigate")||u.indexOf("index.html")>=0||/\/$/.test(u);
  if(isDoc){
    e.respondWith(fetch(e.request).then(function(r){
      var cp=r.clone();caches.open(CACHE).then(function(c){c.put(e.request,cp);});return r;
    }).catch(function(){return caches.match(e.request).then(function(r){return r||caches.match("index.html");});}));
    return;
  }
  e.respondWith(caches.match(e.request).then(function(r){return r||fetch(e.request);}));
});
self.addEventListener("notificationclick",function(e){
  e.notification.close();
  e.waitUntil(self.clients.matchAll({type:"window",includeUncontrolled:true}).then(function(cs){
    for(var i=0;i<cs.length;i++){if("focus"in cs[i])return cs[i].focus();}
    if(self.clients.openWindow)return self.clients.openWindow("./");
  }));
});
