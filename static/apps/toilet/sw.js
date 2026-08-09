const C='subway-toilet-v8';
const CORE=['./','index.html','app.js','reviews.js','data.json','manifest.json'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  const u=new URL(e.request.url);
  if(u.origin===location.origin){
    // 앱 파일: 네트워크 우선(업데이트 즉시 반영) → 실패시 캐시
    e.respondWith(fetch(e.request).then(resp=>{const cp=resp.clone();caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{});return resp;}).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html'))));
  }else{
    // 지도 타일 등 외부: 캐시 우선
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
  }
});
