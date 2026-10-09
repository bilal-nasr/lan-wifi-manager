// LAN Wi-Fi Manager website: two small enhancements, nothing the page needs to work.
// 1. Make the visitor's own system the primary download (Windows stays primary without JS).
// 2. Add a Copy button to command blocks.
(function () {
  "use strict";

  var ua = (navigator.userAgentData && navigator.userAgentData.platform) || navigator.platform || "";
  var agent = navigator.userAgent || "";
  var os = /mac/i.test(ua) || /Mac OS X/.test(agent) ? "mac"
    : /linux|ubuntu/i.test(ua) || (/Linux/.test(agent) && !/Android/.test(agent)) ? "linux"
    : /win/i.test(ua) || /Windows/.test(agent) ? "win" : "";
  if (os && /iPhone|iPad|Android/.test(agent)) os = "";
  if (os) {
    document.querySelectorAll(".get").forEach(function (set) {
      var mine = set.querySelector('[data-os="' + os + '"]');
      if (!mine) return;
      set.querySelectorAll("[data-os]").forEach(function (b) { b.classList.toggle("primary", b === mine); });
      set.insertBefore(mine, set.firstElementChild);
    });
  }

  document.querySelectorAll(".code pre").forEach(function (pre) {
    if (!navigator.clipboard || pre.hasAttribute("data-nocopy")) return;
    var box = pre.parentElement;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn copy";
    btn.textContent = "Copy";
    btn.setAttribute("aria-label", "Copy command");
    btn.addEventListener("click", function () {
      var text = pre.innerText.replace(/^#.*$\n?/gm, "").trim();
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = "Copied";
        setTimeout(function () { btn.textContent = "Copy"; }, 1600);
      }, function () {
        btn.textContent = "Select and copy";
      });
    });
    box.classList.add("has-copy");
    box.appendChild(btn);
  });
})();
