// 지하철 길찾기 — ODsay 없이 우리가 직접 계산한다(하루 조회 한도 회피).
// graph.json = 역 연결 그래프(노선별 순서·지선·환승). 최단시간/최소환승 두 가지를 낸다.
(function(){
  var G=null, ADJ=null, BYNAME=null;
  function build(g){
    G=g; ADJ={}; BYNAME={};
    for(var k in g.nodes){
      ADJ[k]=[];
      var nm=g.nodes[k].name;
      (BYNAME[nm]=BYNAME[nm]||[]).push(k);
    }
    g.edges.forEach(function(e){ ADJ[e[0]].push([e[1],e[2]]); ADJ[e[1]].push([e[0],e[2]]); });
  }
  function loadGraph(){
    if(G)return Promise.resolve(G);
    return fetch("graph.json").then(function(r){return r.json();}).then(function(g){build(g);return G;});
  }
  // 다익스트라 — 환승에 가중치를 더 주면 '덜 갈아타는' 경로가 나온다
  function search(from,to,xferPen){
    var srcs=BYNAME[from]||[], goals={}; (BYNAME[to]||[]).forEach(function(k){goals[k]=1;});
    if(!srcs.length||!Object.keys(goals).length)return null;
    var dist={},prev={},pq=[];
    function push(d,k){pq.push([d,k]);var i=pq.length-1;while(i>0){var p=(i-1)>>1;if(pq[p][0]<=pq[i][0])break;var t=pq[p];pq[p]=pq[i];pq[i]=t;i=p;}}
    function pop(){var top=pq[0],last=pq.pop();if(pq.length){pq[0]=last;var i=0;for(;;){var l=2*i+1,r=l+1,m=i;if(l<pq.length&&pq[l][0]<pq[m][0])m=l;if(r<pq.length&&pq[r][0]<pq[m][0])m=r;if(m===i)break;var t=pq[m];pq[m]=pq[i];pq[i]=t;i=m;}}return top;}
    srcs.forEach(function(k){dist[k]=0;push(0,k);});
    var end=null;
    while(pq.length){
      var it=pop(),d=it[0],u=it[1];
      if(d>(dist[u]===undefined?Infinity:dist[u]))continue;
      if(goals[u]){end=u;break;}
      var nb=ADJ[u]||[];
      for(var i=0;i<nb.length;i++){
        var v=nb[i][0],w=nb[i][1];
        var same=(G.nodes[u].line===G.nodes[v].line);
        var nd=d+w+(same?0:xferPen);
        if(nd<(dist[v]===undefined?Infinity:dist[v])){dist[v]=nd;prev[v]=u;push(nd,v);}
      }
    }
    if(!end)return null;
    var path=[end];
    while(prev[path[path.length-1]]!==undefined)path.push(prev[path[path.length-1]]);
    path.reverse();
    return path;
  }
  // 그 노선에서 계속 가면 닿는 종점(= 방면 표시)
  function terminal(line,prevName,curName){
    var cur=line+"|"+curName, prevK=line+"|"+prevName, seen={}, guard=0;
    seen[prevK]=1;
    while(guard++<120){
      seen[cur]=1;
      var nx=null,nb=ADJ[cur]||[];
      for(var i=0;i<nb.length;i++){
        var v=nb[i][0];
        if(G.nodes[v].line!==line||seen[v])continue;
        nx=v;break;
      }
      if(!nx)break;
      cur=nx;
    }
    return G.nodes[cur].name;
  }
  // 경로(노드 배열) → 앱이 쓰는 모양(ODsay와 같은 형식)
  function toPath(nodes){
    var segs=[];
    nodes.forEach(function(k){
      var n=G.nodes[k];
      if(segs.length&&segs[segs.length-1].line===n.line)segs[segs.length-1].st.push(n.name);
      else segs.push({line:n.line,st:[n.name]});
    });
    segs=segs.filter(function(s,i){return s.st.length>1||segs.length===1;});
    var sub=[],total=0;
    segs.forEach(function(s,i){
      if(i>0){ sub.push({trafficType:3,sectionTime:G.xfer,distance:0}); total+=G.xfer; }
      var hops=s.st.length-1,mins=Math.round(hops*G.hop*10)/10;
      total+=mins;
      sub.push({trafficType:1,lane:[{name:s.line}],startName:s.st[0],endName:s.st[hops],
        stationCount:hops,sectionTime:Math.max(1,Math.round(mins)),
        way:terminal(s.line,s.st[hops-1],s.st[hops]),
        passStopList:{stations:s.st.map(function(x){return {stationName:x};})}});
    });
    return {info:{totalTime:Math.round(total)},subPath:sub};
  }
  function sig(p){return p.subPath.filter(function(x){return x.trafficType===1;})
    .map(function(x){return x.lane[0].name+":"+x.startName;}).join(">");}
  // 최단시간 / 최소환승 두 가지
  function routes(from,to){
    return loadGraph().then(function(){
      var out=[],seen={};
      [0,25].forEach(function(pen){
        var p=search(from,to,pen);
        if(!p)return;
        var path=toPath(p),s=sig(path);
        if(!seen[s]){seen[s]=1;out.push(path);}
      });
      return out;
    });
  }
  window.LocalRoute={routes:routes,load:loadGraph};
})();
