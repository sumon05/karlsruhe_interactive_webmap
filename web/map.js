const geoserverUrl = "http://localhost:8081/geoserver/wms";

const map = L.map("map").setView([49.0069, 8.4037], 13);

// Base map
const osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors",
}).addTo(map);
const satellite = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/" +
    "World_Imagery/MapServer/tile/{z}/{y}/{x}",
  { attribution: "© Esri" },
);

// GeoServer URL
const GS = "http://localhost:8081/geoserver/karlsruhe/wms";

// Layers
const buildings = L.tileLayer.wms(GS, {
  layers: "karlsruhe:buildings",
  format: "image/png",
  transparent: true,
});

const roads = L.tileLayer
  .wms(GS, {
    layers: "karlsruhe:roads",
    format: "image/png",
    transparent: true,
  })
  .addTo(map);

const water = L.tileLayer
  .wms(GS, {
    layers: "karlsruhe:water",
    format: "image/png",
    transparent: true,
  })
  .addTo(map);

// Layer control
const baseMaps = {
  OpenStreetMap: osm,
  Satellite: satellite,
};

const overlayMaps = {
  Buildings: buildings,
  Roads: roads,
  Water: water,
};

L.control.layers(baseMaps, overlayMaps).addTo(map);

// GetFeatureInfo on click
map.on("click", function (e) {
  const activeLayers = [];

  // check visible overlays
  if (map.hasLayer(buildings)) activeLayers.push("karlsruhe:buildings");
  if (map.hasLayer(roads)) activeLayers.push("karlsruhe:roads");
  if (map.hasLayer(water)) activeLayers.push("karlsruhe:water");

  // nothing active
  if (activeLayers.length === 0) return;

  const layerString = activeLayers.join(",");

  const url =
    GS +
    "?service=WMS" +
    "&version=1.1.1" +
    "&request=GetFeatureInfo" +
    "&layers=" +
    layerString +
    "&query_layers=" +
    layerString +
    "&info_format=application/json" +
    "&feature_count=5" +
    "&bbox=" +
    map.getBounds().toBBoxString() +
    "&width=" +
    map.getSize().x +
    "&height=" +
    map.getSize().y +
    "&srs=EPSG:4326" +
    "&x=" +
    Math.floor(e.containerPoint.x) +
    "&y=" +
    Math.floor(e.containerPoint.y);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (!data.features || data.features.length === 0) return;

      const feature = data.features[0];
      const props = feature.properties;
      const layerName = feature.id.split(".")[0];
      let capitalizedLayerName =
        layerName.charAt(0).toUpperCase() + layerName.slice(1);
      let html = `<h3>${capitalizedLayerName}</h3>`;

      // show selected fields only
      if (layerName === "roads") {
        html += `
          <b>Name:</b> ${props.name || "Unknown"}<br>
          <b>Type:</b> ${props.fclass || "-"}<br>
          <b>Max Speed:</b> ${props.maxspeed || "-"}<br>
          <b>Oneway:</b> ${props.oneway === "T" ? "Yes" : "No" || "-"}<br>
        `;
      }

      if (layerName === "buildings") {
        html += `
          <b>Building:</b> ${props.type || "-"}<br>
          <b>Name:</b> ${props.name || "-"}<br>
        `;
      }

      if (layerName === "water") {
        html += `
          <b>Water Type:</b> ${props.fclass || "-"}<br>
          <b>Name:</b> ${props.name || "-"}<br>
        `;
      }

      L.popup({
        maxWidth: 300,
      })
        .setLatLng(e.latlng)
        .setContent(html)
        .openOn(map);
    })
    .catch((err) => console.error(err));
});
