// 고유 계정 (Firebase Firestore + 익명 인증). 아이디 중복체크·국적·성별 수집.
// users/{uid}={userid,nationality,gender,ts}, usernames/{lower}={uid,ts}(유일성).
(function(){
 var cfg={apiKey:"AIzaSyDkV9Lngwtkw6s8o_ZusDRBL5qjkHOv9vA",authDomain:"planfully-b373d.firebaseapp.com",projectId:"planfully-b373d",appId:"1:566910734200:web:67f29f307dd52a90f4028d"};
 var db=null,uid=null,ready=null,profile=null;
 function load(src){return new Promise(function(res,rej){var s=document.createElement('script');s.src=src;s.onload=res;s.onerror=rej;document.head.appendChild(s);});}
 function init(){
  if(ready)return ready;
  ready=Promise.all([
   load('https://www.gstatic.com/firebasejs/10.12.2/firebase-app-compat.js'),
   load('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth-compat.js'),
   load('https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore-compat.js')
  ]).then(function(){
   if(!firebase.apps.length)firebase.initializeApp(cfg);
   db=firebase.firestore();
   try{db.settings({experimentalAutoDetectLongPolling:true,merge:true});}catch(e){}
   return firebase.auth().signInAnonymously();
  }).then(function(c){uid=c.user.uid;
   try{profile=JSON.parse(localStorage.getItem('acct')||'null');}catch(e){}
   if(profile)return profile;
   return db.collection('users').doc(uid).get().then(function(d){if(d.exists){profile=d.data();localStorage.setItem('acct',JSON.stringify(profile));}return profile;}).catch(function(){return null;});
  });
  return ready;
 }
 var reId=/^[A-Za-z0-9_가-힣]{2,16}$/;
 function checkId(userid){ // resolve(available:boolean)
  if(!reId.test(userid))return Promise.resolve({ok:false,reason:'format'});
  return db.collection('usernames').doc(userid.toLowerCase()).get()
   .then(function(d){return {ok:!d.exists,reason:d.exists?'taken':''};})
   .catch(function(){return {ok:false,reason:'net'};});
 }
 function signup(userid,nationality,gender){
  var lower=userid.toLowerCase();
  var uref=db.collection('usernames').doc(lower), pref=db.collection('users').doc(uid);
  return db.runTransaction(function(tx){
   return tx.get(uref).then(function(d){
    if(d.exists)throw new Error('taken');
    tx.set(uref,{uid:uid,ts:firebase.firestore.FieldValue.serverTimestamp()});
    tx.set(pref,{userid:userid,nationality:nationality,gender:gender,ts:firebase.firestore.FieldValue.serverTimestamp()});
   });
  }).then(function(){profile={userid:userid,nationality:nationality,gender:gender};localStorage.setItem('acct',JSON.stringify(profile));return profile;});
 }
 window.Account={init:init,get:function(){return profile;},uid:function(){return uid;},checkId:checkId,signup:signup};
})();
