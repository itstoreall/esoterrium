if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,n)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(s[i])return;let t={};const r=e=>a(e,i),d={module:{uri:i},exports:t,require:r};s[i]=Promise.all(c.map((e=>d[e]||r(e)))).then((e=>(n(...e),t)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts("notification-sw.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/6vcWq5CUd_QNEQ7qrdlQj/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/6vcWq5CUd_QNEQ7qrdlQj/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/464-d50d370586154af0.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/526-a8f75ae09d5eae25.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/763-b769ce46db29f93d.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/972-62efeacb25ea46ae.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/997-362559e1a84637d3.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/app/_not-found/page-f5c6ad6acdf3a68c.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/app/admin/page-305c6ecbfba66988.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/app/articles/%5Bid%5D/edit/page-dfdb827bb6490fa6.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/app/articles/%5Bid%5D/error/page-c84b12c9d6771f43.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/app/articles/%5Bid%5D/page-ae573d60081f4d05.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/app/articles/create/page-cf2de4c267a4fa04.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/app/articles/page-da1b54ab81a2619f.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/app/auth/sign-in/page-0db3c3e19bc645ca.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/app/auth/success/page-c96c066f9fffb4c4.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/app/dashboard/page-2d25db044a53e2ef.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/app/layout-376bc8b299a985ef.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/app/page-857a2eb832cf4629.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/fd9d1056-4fcd3f1012247855.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/main-7dd378f6623b3e9d.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/main-app-b4669d609ff5cdcb.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-10d25ec3e97ce2b9.js",revision:"6vcWq5CUd_QNEQ7qrdlQj"},{url:"/_next/static/css/27b4d6b789fddb24.css",revision:"27b4d6b789fddb24"},{url:"/_next/static/media/4473ecc91f70f139-s.p.woff",revision:"78e6fc13ea317b55ab0bd6dc4849c110"},{url:"/_next/static/media/463dafcda517f24f-s.p.woff",revision:"cbeb6d2d96eaa268b4b5beb0b46d9632"},{url:"/_next/static/media/defaultImage.c592ac5f.jpg",revision:"bd209bde274acc72eb23636c99f3e47e"},{url:"/favicon.png",revision:"bef573365de2a41611ad1934aa01ab26"},{url:"/icons/logo-192.png",revision:"d8cc6dec9e607798c3ca4f3bcaa5a7ae"},{url:"/icons/logo-256.png",revision:"0defb23d0c9d552ac60cdebc9e2eca74"},{url:"/icons/logo-384.png",revision:"9edd3d9fe1ef2c9329a580d523e70cd7"},{url:"/icons/logo-512.png",revision:"421fe78d955b6f91a308004bb4e449cb"},{url:"/manifest.json",revision:"ce0bc596b7fe97c5b66916804f024e3c"},{url:"/notification-sw.js",revision:"24423ba0bd8f5b85b0e0678b4086c8cc"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
