let southWest = L.latLng(42.5, 25),northEast = L.latLng(43, 26);
let bounds = L.latLngBounds(southWest, northEast);
let centerCoordinates = [42.65, 27.6];
let map = L.map('leaflet-map', 
{
    center: centerCoordinates,
    zoom: 5,
    maxBounds: bounds,
    maxBoundsViscosity: 0.8
});

L.tileLayer('https://api.maptiler.com/maps/basic-v2-dark/256/{z}/{x}/{y}.png?key=EPAuysxGm2QU5DiW3b6r', {
    minZoom: 8,
    maxZoom: 8,
}).addTo(map);

const randomImagePaths = ["green.svg", "red.svg"];
const alternativeImagePaths = ["green-glow.svg", "red-glow.svg"];
const svg = d3.select(map.getPanes().overlayPane).append("svg");
const g = svg.append("g").attr("class", "leaflet-zoom-hide");
const rows = 15;
const cols = 26;

let hexagonRadius = 35;
let hexagonWidth = hexagonRadius * Math.sqrt(3);
let hexagonHeight = hexagonRadius * 2;
let hoveredColor = "";