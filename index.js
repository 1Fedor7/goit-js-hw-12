import{a as $,S as P,i as q}from"./assets/vendor-C4-ZuMk8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))n(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();const _="46204158-4df5f152d7953f3c8acc30a03",E="https://pixabay.com/api/";async function g(r,t=1,s=15){const n=`${E}?key=${_}&q=${encodeURIComponent(r)}&image_type=photo&orientation=horizontal&safesearch=true&page=${t}&per_page=${s}`;try{return(await $.get(n)).data}catch(e){throw console.error("Error fetching data from API:",e),e}}let f;function I(){const r=document.querySelector(".gallery");r.innerHTML=""}function p(r){const t=document.querySelector(".gallery"),s=r.map(({webformatURL:n,largeImageURL:e,tags:o,likes:i,views:w,comments:v,downloads:S})=>`
    <a class="gallery__item" href="${e}">
      <img class="gallery__image" src="${n}" alt="${o}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${i}</p>
        <p class="info-item"><b>Views:</b> ${w}</p>
        <p class="info-item"><b>Comments:</b> ${v}</p>
        <p class="info-item"><b>Downloads:</b> ${S}</p>
      </div>
    </a>`).join("");t.insertAdjacentHTML("beforeend",s),f?f.refresh():f=new P(".gallery a")}function a(r){q.error({title:"Error",message:r,position:"topRight",timeout:3e3})}const M=document.querySelector(".search-form"),O=document.querySelector('input[name="searchQuery"]'),b=document.querySelector(".loader"),y=document.querySelector(".load-more");let l=1,m="",h=0,c=0;function L(){b.classList.add("visible")}function u(){b.classList.remove("visible")}function A(){y.hidden=!1}function d(){y.hidden=!0}M.addEventListener("submit",async r=>{r.preventDefault();const t=O.value.trim();if(!t){a("Please enter a search term.");return}m=t,l=1,c=0,I(),d(),L();try{const s=await g(m,l);u();const n=s.hits;if(h=s.totalHits,c+=n.length,n.length===0){a("Sorry, there are no images matching your search query. Please try again!");return}p(n),c>=h||n.length<15?(d(),a("We're sorry, but you've reached the end of search results.")):A()}catch{u(),a("Something went wrong. Please try again later.")}});y.addEventListener("click",async()=>{l+=1,L();try{const r=await g(m,l);u();const t=r.hits;if(c+=t.length,t.length===0){a("We're sorry, but you've reached the end of search results."),d();return}p(t),c>=h&&(d(),a("We're sorry, but you've reached the end of search results."))}catch{u(),a("Something went wrong. Please try again later.")}});
//# sourceMappingURL=index.js.map
