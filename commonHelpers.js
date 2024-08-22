import{a as f,i as d,S as h}from"./assets/vendor-06b1bbdf.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const c of s.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&o(c)}).observe(document,{childList:!0,subtree:!0});function l(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(t){if(t.ep)return;t.ep=!0;const s=l(t);fetch(t.href,s)}})();let b=()=>{d.show({message:"Fill search field",position:"topRight",backgroundColor:"rgb(250,128,114)",messageColor:"rgb(255,255,255)"})},w=()=>{d.show({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight",backgroundColor:"rgb(250,128,114)",messageColor:"rgb(255,255,255)"})};function L(){d.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"rgb(250,128,114)",messageColor:"rgb(255,255,255)"})}async function p(e,r,l,o,t=1){if(e===null||e.trim()===""){b(),o();return}try{let s=await f({method:"get",url:"https://pixabay.com/api/?",params:{key:"45339856-2e70ead6ce9cf82bdbbd89c7e",q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}});s.data.hits.length>0?r(s.data):w()}catch(s){l(s)}finally{o()}}let k=new h("ul.results a",{captionsData:"alt",captionDelay:250});function v(e){return`<li class="result-item">
        <a class="result-link"
          href="${e.largeImageURL}">
          <img class="result-image"
            src="${e.webformatURL}"
            alt="${e.tags}" />
          <ul class="statistic">
            <li class="statistic-item">
              <span class="likes-title">Likes</span>
              <span class="likes-number">${e.likes}</span>
            </li>
            <li class="statistic-item">
              <span class="likes-title">Views</span>
              <span class="likes-number">${e.views}</span>
            </li>
            <li class="statistic-item">
              <span class="likes-title">Comments</span>
              <span class="likes-number">${e.comments}</span>
            </li>
            <li class="statistic-item">
              <span class="likes-title">Downloads</span>
              <span class="likes-number">${e.downloads}</span>
            </li>
          </ul>
        </a>
      </li>`}function g(e){const r=e.map(o=>v(o)).join("");document.querySelector("ul.results").insertAdjacentHTML("beforeend",r),k.refresh()}const u=document.querySelector(".search");let a=document.querySelector("div.loader-panel"),m=document.querySelector(".load-more");a.style.display="none";n();let i=1;function y(e){e.totalHits>i*15?m.style.display="block":(n(),L())}function n(){m.style.display="none"}function q(){let r=document.querySelector(".result-item").getBoundingClientRect().height;window.scrollBy({top:r*2,left:0,behavior:"smooth"})}u.addEventListener("submit",e=>{n(),e.preventDefault(),a.style.display="block";const r=document.querySelectorAll("li.result-item"),l=u.elements["search-query"].value;r&&r.length>0&&r.forEach(o=>o.remove()),i=1,p(l,o=>{g(o.hits),y(o)},o=>console.error(o),()=>a.style.display="none",i)});m.addEventListener("click",e=>{n(),i+=1;const r=u.elements["search-query"].value;p(r,l=>{g(l.hits),y(l),q()},l=>console.error(l),()=>a.style.display="none",i)});
//# sourceMappingURL=commonHelpers.js.map
