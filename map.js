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
