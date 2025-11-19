(function () {
  function loadScript(src, cb) {
    var s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.onload = cb;
    s.onerror = function () {
      console.error("Erro carregando", src);
      cb();
    };
    document.head.appendChild(s);
  }

  function initMap() {
    var container = document.getElementById("dashboard-map");
    if (!container) return;

    var markers = window.DASHBOARD_MARKERS || [];

    var map = L.map("dashboard-map");

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    var latlngs = [];

    markers.forEach(function (m) {
      if (typeof m.lat !== "number" || typeof m.lng !== "number") return;

      var marker = L.marker([m.lat, m.lng]).addTo(map);
      if (m.popup) marker.bindPopup(String(m.popup));

      latlngs.push([m.lat, m.lng]);
    });

    if (latlngs.length > 0) {
      var bounds = L.latLngBounds(latlngs);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else {
      map.setView([0, 0], 2);
    }
  }

  if (window.L && window.L.map) {
    document.addEventListener("DOMContentLoaded", initMap);
  } else {
    document.addEventListener("DOMContentLoaded", function () {
      loadScript("https://unpkg.com/leaflet/dist/leaflet.js", function () {
        setTimeout(initMap, 20);
      });
    });
  }
})();