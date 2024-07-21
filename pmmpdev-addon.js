  a(e || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  let c = e => {
    let t = document.querySelector(".theme-icon-active");
    let a = document.querySelector(`[data-bs-theme-value="${e}"]`);
    let c = a.querySelector("i").dataset.themeIcon;
    document.querySelectorAll("[data-bs-theme-value]").forEach(e => {
      e.classList.remove("active");
    });
    a.classList.add("active");
    t.classList.remove(t.dataset.themeIconActive);
    t.classList.add(c);
    t.dataset.iconActive = c;
  };
  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
    if ("light" !== e || "dark" !== e) {
      a(e || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
    }
  });
  window.addEventListener("DOMContentLoaded", () => {
    c(e || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
    document.querySelectorAll("[data-bs-theme-value]").forEach(e => {
      e.addEventListener("click", () => {
        let t = e.getAttribute("data-bs-theme-value");
        localStorage.setItem("theme", t);
        a(t);
        c(t, true);
      });
    });
  });
})();
'use strict';
$(document).ready(function () {
  var _0x1f3784;
  if ((_0x1f3784 = $("footer.text-bg-dark > .Fc > .Footer-Copyright > a#itC")).length) {
    window.validurlit = function (_0x2d2768) {
      return /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/.test(_0x2d2768);
    };
    window.sUp = function (_0x2ca5b4) {
      document.querySelector(_0x2ca5b4).parentNode.style.height = '0';
    };
    window._GET = function (_0x3a1658, _0x37d1c2) {
      if (!_0x37d1c2) {
        _0x37d1c2 = location.href;
      }
      var _0x443464 = RegExp("[\\?&]" + (_0x3a1658 = _0x3a1658.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")) + "=([^&#]*)").exec(_0x37d1c2);
      return null == _0x443464 ? null : _0x443464[1];
    };
    _0x1f3784.attr("href", "mrchllaja.blogspot.com").text("Mrchllaja");
  } else {
    location.href = "https://mrchllaja.blogspot.com";
  }
});
/* Tooltops Bootstrap */
var tooltipTriggerList=[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')),tooltipList=tooltipTriggerList.map(function(t){return new bootstrap.Tooltip(t)});
/* Share Link */
function copyPostUrl(){document.getElementById("closeWilltoCopyPostUrl").click();var e=document.getElementById("sharePostUrl");e.select(),navigator.clipboard.writeText(e.value),new bootstrap.Toast(document.getElementById("liveToast1")).show()}
/* Pre Content Copy */
for(var preClick=document.getElementsByTagName("pre"),i=0;i<preClick.length;i++)preClick[i].addEventListener("dblclick",function(){var e=getSelection(),o=document.createRange();o.selectNodeContents(this),e.removeAllRanges(),e.addRange(o),document.execCommand("copy"),e.removeAllRanges(),new bootstrap.Toast(document.getElementById('liveToast1')).show();},!1);
