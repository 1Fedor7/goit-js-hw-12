import{a as P,S as $,i as q}from"./assets/vendor-C4-ZuMk8.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const _="46204158-4df5f152d7953f3c8acc30a03",I="https://pixabay.com/api/";async function p(t,r=1,n=15){const s=`${I}?key=${_}&q=${encodeURIComponent(t)}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${n}`;try{const{data:e}=await P.get(s);return e.hits}catch(e){throw console.error("Error fetching data:",e),e}}let g;function M(){const t=document.querySelector(".gallery");t.innerHTML=""}function b(t){const r=document.querySelector(".gallery"),n=t.map(({webformatURL:s,largeImageURL:e,tags:o,likes:l,views:v,comments:E,downloads:S})=>`
    <a class="gallery__item" href="${e}">
      <img class="gallery__image" src="${s}" alt="${o}" loading="lazy" />
      <div class="info">
        <p class="info-item"><b>Likes:</b> ${l}</p>
        <p class="info-item"><b>Views:</b> ${v}</p>
        <p class="info-item"><b>Comments:</b> ${E}</p>
        <p class="info-item"><b>Downloads:</b> ${S}</p>
      </div>
    </a>`).join("");r.insertAdjacentHTML("beforeend",n),g?g.refresh():g=new $(".gallery a")}function i(t){q.error({title:"Error",message:t})}const A=document.querySelector(".search-form"),B=document.querySelector('input[name="searchQuery"]'),L=document.querySelector(".loader"),a=document.createElement("button");a.textContent="Load more";a.classList.add("load-more");document.body.appendChild(a);let u=1,f="";const h=15;let d=0,c=0;function w(){L.classList.add("visible")}function m(){L.classList.remove("visible")}function y(){a.style.display="none"}function C(){a.style.display="block"}y();A.addEventListener("submit",async t=>{t.preventDefault();const r=B.value.trim();if(!r){i("Please enter a search term.");return}f=r,u=1,c=0,M(),y(),w();try{const n=await p(f,u,h),s=n.hits;if(d=n.totalHits,m(),s.length===0){i("Sorry, there are no images matching your search query. Please try again!");return}b(s),c+=s.length,d<=h||c>=d?(y(),c>=d&&i("We're sorry, but you've reached the end of search results.")):C()}catch(n){m(),i("Something went wrong. Please try again later."),console.error("Error fetching images:",n)}});a.addEventListener("click",async()=>{u+=1,w();try{const r=(await p(f,u,h)).hits;m(),b(r),c+=r.length,c>=d&&(y(),i("We're sorry, but you've reached the end of search results."))}catch(t){m(),i("Something went wrong. Please try again later."),console.error("Error loading more images:",t)}});function O(){const{height:t}=document.querySelector(".gallery").firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}a.addEventListener("click",async()=>{await p(f,u),O()});
//# sourceMappingURL=index.js.map
