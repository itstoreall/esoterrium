if(!self.define){let e,a={};const s=(s,c)=>(s=new URL(s+".js",c).href,a[s]||new Promise((a=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=a,document.head.appendChild(e)}else e=s,importScripts(s),a()})).then((()=>{let e=a[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(c,i)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(a[t])return;let n={};const d=e=>s(e,t),f={module:{uri:t},exports:n,require:d};a[t]=Promise.all(c.map((e=>f[e]||d(e)))).then((e=>(i(...e),n)))}}define(["./workbox-f1770938"],(function(e){"use strict";importScripts("notification-sw.js"),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Tmpbc0QtlyF7EzZjHIdzh/_buildManifest.js",revision:"c155cce658e53418dec34664328b51ac"},{url:"/_next/static/Tmpbc0QtlyF7EzZjHIdzh/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/145-c6b5fd79e95c7a55.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/176-aff59a9c082f2b4a.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/387-7ae3ca571fda3b94.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/464-d50d370586154af0.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/526-d52b3dc12c78781d.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/705-50629590739e9efb.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/763-af3d48f1e896b063.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/997-dc6d91e7b3bc40bf.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/app/_not-found/page-71e14d3d7dc5606e.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/app/admin/page-305c6ecbfba66988.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/app/articles/%5Bid%5D/edit/page-2a2d4b73c6d40e2f.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/app/articles/%5Bid%5D/error/page-d98b286651a7e1c7.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/app/articles/%5Bid%5D/page-dc70b4dc30872b89.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/app/articles/create/page-836cb99e1c232cc2.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/app/articles/error/page-21eb379e92353f14.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/app/articles/page-27841294e19a2f46.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/app/auth/error/page-8fcb6a683b3699c2.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/app/auth/sign-in/page-56c537d9a22e1571.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/app/auth/success/page-bf83b8d738ac296f.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/app/dashboard/page-b9fe6c5683a061c2.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/app/layout-f4d1d601bcf324a0.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/app/page-4aa788976c4441d0.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/ee560e2c-0447f626a6a811b3.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/eec3d76d-c610da155111663d.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/fd9d1056-8c5c97a36c844bcd.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/framework-f66176bb897dc684.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/main-23811ae44e88d24e.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/main-app-b4669d609ff5cdcb.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/pages/_app-72b849fbd24ac258.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/pages/_error-7ba65e1336b92748.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/chunks/polyfills-42372ed130431b0a.js",revision:"846118c33b2c0e922d7b3a7676f81f6f"},{url:"/_next/static/chunks/webpack-21c4376ebe2cbc0e.js",revision:"Tmpbc0QtlyF7EzZjHIdzh"},{url:"/_next/static/css/32ef89591b66307b.css",revision:"32ef89591b66307b"},{url:"/_next/static/media/0e5e1c6a8db9e432-s.p.woff2",revision:"f201ef2b6f1307dd8b1ec0c0deffceea"},{url:"/_next/static/media/120a5a1920781bd0-s.p.woff2",revision:"8c4b05d4371467ba1d0bc60839c6dcb9"},{url:"/_next/static/media/1829b486edba7033-s.woff2",revision:"a5bc3a880fee157c189e8b6c31c3a587"},{url:"/_next/static/media/27971e35634b7c88-s.woff2",revision:"4264bad61333859477947703b15aadfd"},{url:"/_next/static/media/28aa5118b38b86e4-s.woff2",revision:"db5317b009a0dedd66dab31d7889b5f3"},{url:"/_next/static/media/2f66f084fba01545-s.woff2",revision:"8e0642a7dd6dfe9491afa20e4a470655"},{url:"/_next/static/media/3afe5adeb2c02728-s.woff2",revision:"da8957de9c1a0403303c6a201d5521f9"},{url:"/_next/static/media/483de911b1a0d258-s.woff2",revision:"28502b06e67112e0bf77a784aee917d0"},{url:"/_next/static/media/4cefbb0c18f21ca5-s.woff2",revision:"7ac2e4b9ff1d4f5a441d4b0529d6084f"},{url:"/_next/static/media/550cf1913d99b09c-s.woff2",revision:"9520edb06f693095fd0d7d6475bb8232"},{url:"/_next/static/media/5693677ef07d9b51-s.woff2",revision:"96b57d1ae0a86dcf7913589b27426343"},{url:"/_next/static/media/5721dfda5b43cc5f-s.woff2",revision:"add475a744fab261f16437dcb27ff195"},{url:"/_next/static/media/674abd25bb7be96f-s.woff2",revision:"92e5e17ec75636ec7ab5c46a00a54342"},{url:"/_next/static/media/6b0cd32368d33c62-s.p.woff2",revision:"907def6d4522a7bf182261c60842764f"},{url:"/_next/static/media/6ebb97b5c9fa4e03-s.p.woff2",revision:"39aff03d2a35b1c80f210051f35d4b2b"},{url:"/_next/static/media/75655d6639acf9be-s.p.woff2",revision:"52a2eb5fa588ff9041ac4d49fd79aaa2"},{url:"/_next/static/media/7a7012758df5a81e-s.woff2",revision:"26024640d95a44fd98f614d6f4372e4b"},{url:"/_next/static/media/7c16c8204ab29534-s.p.woff2",revision:"eac32b711872911e7e7c107eb7a7901a"},{url:"/_next/static/media/80b1a0e600ca6d83-s.woff2",revision:"584ea11fad4f10a879c8530e7575cbbf"},{url:"/_next/static/media/8720059dfa14a1fe-s.woff2",revision:"1254e937b1635a843bc7bdee51de2aeb"},{url:"/_next/static/media/879d1750a4bfabb3-s.woff2",revision:"21523ab5c4c29459e1b67f30022aaaaf"},{url:"/_next/static/media/886f446b96dc7734-s.p.woff2",revision:"35a2015f38699f3f84391b778babeb8b"},{url:"/_next/static/media/8c3de32e92410013-s.woff2",revision:"1029e564ae93e7ce4f3feaa6598daa8a"},{url:"/_next/static/media/8dcff538116e20e3-s.woff2",revision:"634fd7ed86da99b5f5946e6d014f6acb"},{url:"/_next/static/media/906678b269849541-s.woff2",revision:"21c838ead8641ef57bc94d27efcd257e"},{url:"/_next/static/media/98a28a5430a3cf7f-s.woff2",revision:"7dada9344a370f25dc1d3b7030da67b6"},{url:"/_next/static/media/blueLotus.940f885c.jpg",revision:"771c80cc4d8eed65ee5924879e9f5514"},{url:"/_next/static/media/c714540e49ad5111-s.p.woff2",revision:"f8ecacbffc9878e584aa180d11d676bd"},{url:"/_next/static/media/cd31bf4b34f8dfb3-s.p.woff2",revision:"1a0c60b7297c849ea95c06380a4c0961"},{url:"/_next/static/media/d602976d04712c39-s.woff2",revision:"2ec2275671ea10b81edb48488dbcf1b2"},{url:"/_next/static/media/da897b99eb1fe4a1-s.p.woff2",revision:"4903a00d1c555c0846799302c673d6a1"},{url:"/_next/static/media/defaultImage.c592ac5f.jpg",revision:"bd209bde274acc72eb23636c99f3e47e"},{url:"/_next/static/media/df2942b6de9d14b5-s.woff2",revision:"47e8ccc33b3dcfbe6d31914569515bf4"},{url:"/_next/static/media/e1d0f983e2a3e4f5-s.p.woff2",revision:"9886c3f65b99ad2575a04a726cd0157b"},{url:"/_next/static/media/e693e841d50dcf2f-s.p.woff2",revision:"44e40e4650f79357525fb94b38d46234"},{url:"/_next/static/media/ecf49d904668b268-s.woff2",revision:"9f2ae2ca944b5bd6c3d59b01f78ec5ff"},{url:"/_next/static/media/f1df6186c8d69644-s.woff2",revision:"307c90aaa7d9c628155ee8cb913b8382"},{url:"/_next/static/media/f756da832d8c34d4-s.woff2",revision:"ef6b28a1181a73b788c8669d6ad9adc8"},{url:"/favicon.png",revision:"bef573365de2a41611ad1934aa01ab26"},{url:"/icons/logo-192.png",revision:"d8cc6dec9e607798c3ca4f3bcaa5a7ae"},{url:"/icons/logo-256.png",revision:"0defb23d0c9d552ac60cdebc9e2eca74"},{url:"/icons/logo-384.png",revision:"9edd3d9fe1ef2c9329a580d523e70cd7"},{url:"/icons/logo-512.png",revision:"421fe78d955b6f91a308004bb4e449cb"},{url:"/manifest.json",revision:"6f4173ade8a4f70f90c771c9705e2880"},{url:"/notification-sw.js",revision:"24423ba0bd8f5b85b0e0678b4086c8cc"}],{ignoreURLParametersMatching:[/^utm_/,/^fbclid$/]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({response:e})=>e&&"opaqueredirect"===e.type?new Response(e.body,{status:200,statusText:"OK",headers:e.headers}):e}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/\/_next\/static.+\.js$/i,new e.CacheFirst({cacheName:"next-static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4|webm)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:48,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e,url:{pathname:a}})=>!(!e||a.startsWith("/api/auth/callback")||!a.startsWith("/api/"))),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:s})=>"1"===e.headers.get("RSC")&&"1"===e.headers.get("Next-Router-Prefetch")&&s&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc-prefetch",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({request:e,url:{pathname:a},sameOrigin:s})=>"1"===e.headers.get("RSC")&&s&&!a.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages-rsc",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:{pathname:e},sameOrigin:a})=>a&&!e.startsWith("/api/")),new e.NetworkFirst({cacheName:"pages",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({sameOrigin:e})=>!e),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET"),self.__WB_DISABLE_DEV_LOGS=!0}));
