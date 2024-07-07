/* Random Post */ 
function showLucky(e){var t=e.feed;t.entry;for(var a=t.entry[0],n=0;n<a.link.length;++n)"alternate"==a.link[n].rel&&(window.location=a.link[n].href)}function fetchLuck(e){(script=document.createElement("script")).src="/feeds/posts/summary?start-index="+e+"&max-results=1&alt=json-in-script&callback=showLucky",script.type="text/javascript",document.getElementsByTagName("head")[0].appendChild(script)}function readLucky(e){var t=Math.floor(Math.random()*parseInt(e.feed.openSearch$totalResults.$t,10));fetchLuck(++t)}function feelingLucky(){document.getElementById('toastNotif').innerHTML = '<span><i class="fa-solid fa-rotate-right fa-spin" style="margin-right:8px"></i>Memuat Postingan Acak, Harap tunggu...</span>';var e=document.createElement("script");e.type="text/javascript",e.src="/feeds/posts/summary?max-results=0&alt=json-in-script&callback=readLucky",document.getElementsByTagName("head")[0].appendChild(e)}

/* Widget Slider */ 
const wcSliderRandom = {
  feeds: 'https://mrchllaja.blogspot.com',
  noImage: 'data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=',
  thumbnailSize: '1600',
  amount: '4',
  duration: '2000',
  auto: 'true',
  button: 'true',
  swipe: 'true',
  sharedBy: 'www.wendycode.com' // credit do not removed
};
function sliderLoad(){var script=document.createElement('script');script.async= true;script.src='https://cdn.wendycode.com/blogger/widget/slider-random-post.js';document.body.appendChild(script)}function sldDtcLazy(){sliderLoad(),localStorage.setItem("sliderJs","true")}var wcLdStorage=localStorage.getItem("sliderJs");if("true"!=wcLdStorage){var t=!1,e=!1;window.addEventListener("scroll",()=>{(0!=document.documentElement.scrollTop&&!1===t||0!=document.body.scrollTop&&!1===t)&&(sldDtcLazy(),t=!0,e=!0)},!0),window.addEventListener("click",()=>{!1===e&&!1===e&&(sldDtcLazy(),e=!0,t=!0)},!0)}"true"===wcLdStorage&&sliderLoad();

/* Script Menghapus Kode ?m=1 / ?m=0 */
var uri = window.location.toString(); if (uri.indexOf("?m=1","?m=1") > 0) {var clean_uri = uri.substring(0, uri.indexOf("?m=1"));window.history.replaceState({}, document.title, clean_uri); };
