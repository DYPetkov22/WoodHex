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

function hexagonPoints(radius, centerX, centerY) {
    return Array.from({ length: 6 }, (_, i) => {
        const angle = (2 * Math.PI / 6) * i;
        let x = centerX + radius * Math.sin(angle);
        let y = centerY + radius * Math.cos(angle);
        return [x, y];
    });
}


function createHexagon(hexagonGroup, isBlack) 
{
    if (isBlack) {
        let hexagon = hexagonGroup.append("polygon")
        .attr("points", hexagonPoints(hexagonRadius, 0, 0).join(" "));

    let hexagonImage = hexagonGroup.append("image")
        .attr("xlink:href", "graund-poligon.svg")  
        .attr("x", -hexagonRadius)
        .attr("y", -hexagonRadius)
        .attr("width", hexagonRadius * 2)
        .attr("height", hexagonRadius * 2.1);

    return hexagon;
    } 
    else 
    {
        let hexagon = hexagonGroup.append("polygon")
            .attr("points", hexagonPoints(hexagonRadius, 0, 0).join(" "));

        let randomImagePath = randomImagePaths[Math.floor(Math.random() * randomImagePaths.length)];

        let hexagonImage = hexagonGroup.append("image")
            .attr("xlink:href", randomImagePath)
            .attr("x", -hexagonRadius)
            .attr("y", -hexagonRadius)
            .attr("width", hexagonRadius * 2)
            .attr("height", hexagonRadius * 2.1);

        hexagonGroup.on("mouseover", function () 
        {
            var hexagonX = parseFloat(d3.select(this).attr("transform").split("(")[1].split(",")[0]);
            var hexagonY = parseFloat(d3.select(this).attr("transform").split(",")[1].split(")")[0]);

            var hoveredImagePath = d3.select(this).select("image").attr("xlink:href");
            hoveredColor = hoveredImagePath.includes("green") ? "green" : "red";

            var tooltipText = hoveredColor === "red" ? Math.floor(Math.random() * 100) : 100 + '+';
            var alternativeImagePath = hoveredColor === "red" ? "red-glow.svg" : "green-glow.svg";
            d3.select(this).select("image").attr("xlink:href", alternativeImagePath);

            svg.append("text")
                .attr("id", "tooltip")
                .attr("x", hexagonX + hexagonRadius)
                .attr("y", hexagonY + hexagonRadius)
                .text(tooltipText);
        })

            .on("mouseout", function () {
                svg.select("#tooltip").remove();

                var alternativeImagePath = hoveredColor === "red" ? "red.svg" : "green.svg";
                d3.select(this).select("image").attr("xlink:href", alternativeImagePath);
                d3.select(this).select("polygon").attr("transform", "scale(1)");
            });

        return hexagon;
    }
}

function hexagonSea(hexagonGroup)
{
    let hexagon = hexagonGroup.append("polygon")
        .attr("points", hexagonPoints(hexagonRadius, 0, 0).join(" "));

    let hexagonImage = hexagonGroup.append("image")
        .attr("xlink:href", "sea-poligon.svg")  
        .attr("x", -hexagonRadius)
        .attr("y", -hexagonRadius)
        .attr("width", hexagonRadius * 2)
        .attr("height", hexagonRadius * 2.1);

    return hexagon;
}

function update() {
    const bounds = map.getBounds();
    const topLeft = map.latLngToLayerPoint(bounds.getNorthWest());
    const bottomRight = map.latLngToLayerPoint(bounds.getSouthEast());

    svg.style("width", map.getSize().x + "px")
        .style("height", map.getSize().y + "px")
        .style("margin-left", topLeft.x + "px")
        .style("margin-top", topLeft.y + "px");

    g.attr("transform", "translate(" + -topLeft.x + "," + -topLeft.y + ")");

    drawHexagons();
}