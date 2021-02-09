"use strict";const buttonElement=document.querySelector(".js-button"),inputElement=document.querySelector(".js-input"),nameElement=document.querySelector(".js-shows"),formElement=document.querySelector(".js-form");let showsList=[],favouriteList=[];function getFromApi(){const t=inputElement.value;fetch("http://api.tvmaze.com/search/shows?q="+t).then(t=>t.json()).then(t=>{paintElements(t),listenShowsEvents(),setInLocalStorage()})}function handleForm(t){t.preventDefault()}formElement.addEventListener("submit",handleForm);let imagenDefault="https://via.placeholder.com/210x295/ffffff/666666/?";function paintElements(t){let e="";e+="<ul>";for(const o of t){const t=o.show.name,n=o.show.image,s=o.show.id;showsList.push({name:t,img:n,id:s}),e+=`<li class="show" data-myid=${s} >`,e+=`<h2 class="title2">Nombre:${t}</h2>`,e+=null===n?`<img class="imgList" src="${imagenDefault}"> `:`<img class="imgList" src="${n.medium}"> `,e+="</li>"}e+="</ul>",nameElement.innerHTML+=e}function listenShowsEvents(t){const e=document.querySelectorAll(".show");for(const t of e)t.addEventListener("click",handleShows)}function handleShows(t){const e=parseInt(t.currentTarget.dataset.myid),o=showsList.find((function(t){return t.id===e})),n=favouriteList.findIndex((function(t){return t.id===e}));-1===n?favouriteList.push(o):favouriteList.splice(n,1),setInLocalStorage(),paintFavoritesShow()}buttonElement.addEventListener("click",getFromApi);const favoriteElements=document.querySelector(".js-favourite--shows");function paintFavoritesShow(){let t="";t+="<ul>";for(const e of favouriteList)t+='<li class="favouriteShow">',t+=`<h2>Name:${e.name}</h2>`,null===e.img?t+=`<img src="${imagenDefault}">`:(t+=`<img class="backstyle"src="${e.img.medium}">`,t+="</li>"),t+="</ul>",favoriteElements.innerHTML=t}function setInLocalStorage(){const t=JSON.stringify(favouriteList);localStorage.setItem("favourites",t)}function getFromLocalStorage(){const t=localStorage.getItem("favourites");if(null===t)getFromApi();else{const e=JSON.parse(t);favouriteList=e}paintFavoritesShow()}getFromLocalStorage();