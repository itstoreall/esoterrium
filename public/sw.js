if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(s[n])return;let t={};const r=e=>a(e,n),d={module:{uri:n},exports:t,require:r};s[n]=Promise.all(i.map((e=>d[e]||r(e)))).then((e=>(c(...e),t)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts("notification-sw.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Cjo1sAHIFurNPsbUdwWxb/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/Cjo1sAHIFurNPsbUdwWxb/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/145-7efe71f7ca7722a4.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/151-88f8f3eb61e10b09.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/35-45ccc1bcb4168f28.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/464-523567212573b85d.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/526-091a5eab42ec47a5.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/592-80d7c647914af626.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/593-02757dac88bfab92.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/797-7af030efc525b994.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/974-2cc1859aacde5cee.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/997-7681969f72639cb7.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/app/_not-found/page-ac5a8b7ae9390675.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/app/admin/error/page-d18b588d8a91fc9a.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/app/admin/page-8ab6a17f9605f1e3.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/app/articles/%5Bid%5D/edit/page-c1fe7440573895dd.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/app/articles/%5Bid%5D/error/page-c5da030098cf502e.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/app/articles/%5Bid%5D/page-454b42c4fd40d97f.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/app/articles/create/page-c721cfe34dc26ab6.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/app/articles/error/page-f433fce02766e2ec.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/app/articles/page-71c22d40d54a81d9.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/app/auth/ban/page-23496a85f4ceb8f4.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/app/auth/error/page-4430f4f82e27b5e2.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/app/auth/sign-in/page-6644b92bf47f2b31.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/app/auth/success/page-ab7aa2a7dd24c636.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/app/dashboard/page-222413b720112d5e.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/app/layout-36685df8cf985597.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/app/page-9a94a9ae4c089c1e.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/ee560e2c-62d89ce81849c85b.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/eec3d76d-c610da155111663d.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/fd9d1056-38bc1429756632e6.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/main-516004dce32c5b6c.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/main-app-b4669d609ff5cdcb.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-33ef8d226d44e781.js",revision:"Cjo1sAHIFurNPsbUdwWxb"},{url:"/_next/static/css/15a56ad9a6942911.css",revision:"15a56ad9a6942911"},{url:"/_next/static/css/24b782193d687e46.css",revision:"24b782193d687e46"},{url:"/_next/static/css/9747f6b573a4c939.css",revision:"9747f6b573a4c939"},{url:"/_next/static/media/1829b486edba7033-s.woff2",revision:"a5bc3a880fee157c189e8b6c31c3a587"},{url:"/_next/static/media/24c15609eaa28576-s.p.woff2",revision:"be8ee93a8cf390eb9cb6e6aadf1a3bf0"},{url:"/_next/static/media/2c07349e02a7b712-s.woff2",revision:"399fb80a20ea7d2a53a1d6dc1e5f392a"},{url:"/_next/static/media/3afe5adeb2c02728-s.woff2",revision:"da8957de9c1a0403303c6a201d5521f9"},{url:"/_next/static/media/47cbc4e2adbc5db9-s.p.woff2",revision:"4746809ed1c17447d45d2a96c64796d4"},{url:"/_next/static/media/4cefbb0c18f21ca5-s.woff2",revision:"7ac2e4b9ff1d4f5a441d4b0529d6084f"},{url:"/_next/static/media/627d916fd739a539-s.woff2",revision:"c46f88e9518178fd56311db461452f8d"},{url:"/_next/static/media/6b0cd32368d33c62-s.p.woff2",revision:"907def6d4522a7bf182261c60842764f"},{url:"/_next/static/media/74c003a2abab0c4f-s.woff2",revision:"99ebacc4dfd7bd21bf48d21306c0dd42"},{url:"/_next/static/media/75655d6639acf9be-s.p.woff2",revision:"52a2eb5fa588ff9041ac4d49fd79aaa2"},{url:"/_next/static/media/84602850c8fd81c3-s.woff2",revision:"bdf2a9a2d904dc21d9b593b82887af52"},{url:"/_next/static/media/886f446b96dc7734-s.p.woff2",revision:"35a2015f38699f3f84391b778babeb8b"},{url:"/_next/static/media/8dcff538116e20e3-s.woff2",revision:"634fd7ed86da99b5f5946e6d014f6acb"},{url:"/_next/static/media/90da053edc2b7de3-s.woff2",revision:"5489c188e786a745bd9ba1bc9fbf7f71"},{url:"/_next/static/media/ac3b7908202f8517-s.woff2",revision:"9df032a6b99e0fce98ec4ad311b0fd7d"},{url:"/_next/static/media/b5ee789b512e4d1b-s.woff2",revision:"6f64aa964b323b9c0e5dbce214081225"},{url:"/_next/static/media/blueLotus.940f885c.jpg",revision:"771c80cc4d8eed65ee5924879e9f5514"},{url:"/_next/static/media/communityImage.591ed8bc.jpg",revision:"9d0620a907a841824f1dbdfa8b4757e7"},{url:"/_next/static/media/defaultImage.c592ac5f.jpg",revision:"bd209bde274acc72eb23636c99f3e47e"},{url:"/_next/static/media/e693e841d50dcf2f-s.p.woff2",revision:"44e40e4650f79357525fb94b38d46234"},{url:"/favicon.png",revision:"bef573365de2a41611ad1934aa01ab26"},{url:"/google7a4622e8b8be00b5.html",revision:"6beb93559e52adb012eecd35525fb243"},{url:"/icons/logo-192.png",revision:"d8cc6dec9e607798c3ca4f3bcaa5a7ae"},{url:"/icons/logo-256.png",revision:"0defb23d0c9d552ac60cdebc9e2eca74"},{url:"/icons/logo-384.png",revision:"9edd3d9fe1ef2c9329a580d523e70cd7"},{url:"/icons/logo-512.png",revision:"421fe78d955b6f91a308004bb4e449cb"},{url:"/manifest.json",revision:"ce0bc596b7fe97c5b66916804f024e3c"},{url:"/notification-sw.js",revision:"24423ba0bd8f5b85b0e0678b4086c8cc"},{url:"/sitemap.xml",revision:"cd86bec7773f7f98a7892832703104de"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:s}})=>!(!e||s.startsWith("/api/auth/callback")||!s.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:s},sameOrigin:a})=>"1"===e.headers.get("RSC")&&a&&!s.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:s})=>s&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
