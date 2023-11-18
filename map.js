let southWest = L.latLng(42.5, 25),northEast = L.latLng(43, 26);
let bounds = L.latLngBounds(southWest, northEast);
let centerCoordinates = [42.65, 28.2];
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

let hexagonRadius = 45;
let hexagonWidth = hexagonRadius * Math.sqrt(3);
let hexagonHeight = hexagonRadius * 2;
let hoveredColor = "";

const randomImagePaths = ["../photos/map/green.svg", "../photos/map/red.svg"];
const alternativeImagePaths = ["../photos/map/green-glow.svg", "../photos/map/red-glow.svg"];
const randomTrees =["Cherry plum" , "Norway maple" , "European beech" , "Common lilac"];

const svg = d3.select(map.getPanes().overlayPane).append("svg");
const g = svg.append("g").attr("class", "leaflet-zoom-hide");
const rows = 15;
const cols = 26;
const overlayDiv = d3.select("#leaflet-map").append("div")
    .attr("id", "overlay-div")
    .style("position", "fixed")
    .style('z-index', 1000)

    .style("width", "15vw")
    .style("height", "20vw")

    .style("top", "3vw")  
    .style("left", "2vw")  

    .style("background-color", "rgba(26, 25, 25, 0.67)")
;

overlayDiv.html
(
    "people on weiting  " + "--" + " / " + "--" +
    "<br>" + "<br>" +
    "trees needed   " + "--" + " / " + "--" +
    "<br>" + "<br>" +
    "kind of tree " + "--" +
    "<br>" + "<br>" +
    "<button>APPLY FOR GROUP</button>"
);


function hexagonPoints(radius, centerX, centerY) {
    return Array.from({ length: 6 }, (_, i) => {
        const angle = (2 * Math.PI / 6) * i;
        let x = centerX + radius * Math.sin(angle);
        let y = centerY + radius * Math.cos(angle);
        return [x, y];
    });
}

function getRandomMax(min , max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

function createHexagon(hexagonGroup, isBlack) 
{
    if (isBlack) {
        let hexagon = hexagonGroup.append("polygon")
        .attr("points", hexagonPoints(hexagonRadius, 0, 0).join(" "));

    let hexagonImage = hexagonGroup.append("image")
        .attr("xlink:href", "../photos/map/graund-poligon.svg")  
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
            let hexagonX = parseFloat(d3.select(this).attr("transform").split("(")[1].split(",")[0]);
            let hexagonY = parseFloat(d3.select(this).attr("transform").split(",")[1].split(")")[0]);

            let hoveredImagePath = d3.select(this).select("image").attr("xlink:href");
            hoveredColor = hoveredImagePath.includes("green") ? "green" : "red";

            let alternativeImagePath = hoveredColor === "red" ? "../photos/map/red-glow.svg" : "../photos/map/green-glow.svg";
            d3.select(this).select("image").attr("xlink:href", alternativeImagePath);
        })

        hexagonGroup.on("click", function () 
        {
            hexagonX = parseFloat(d3.select(this).attr("transform").split("(")[1].split(",")[0]);
            hexagonY = parseFloat(d3.select(this).attr("transform").split(",")[1].split(")")[0]);

            let hoveredImagePath = d3.select(this).select("image").attr("xlink:href");
            hoveredColor = hoveredImagePath.includes("green") ? "green" : "red";
            
            let alternativeImagePath = hoveredColor === "red" ? "../photos/map/red-glow.svg" : "../photos/map/green-glow.svg";
            d3.select(this).select("image").attr("xlink:href", alternativeImagePath);
            
            let plantedTrees = hoveredColor === "red" ? Math.floor(Math.random() * 100) : 100 + Math.floor(Math.random() * 100);
            let plantedTreesMax = getRandomMax(plantedTrees,200);

            let peopleWait = Math.floor(Math.random() * 100);
            let peopleWaitMax =getRandomMax(peopleWait,100);
        
            let randomTree = randomTrees[Math.floor(Math.random() * randomTrees.length)];

            overlayDiv.html
            (
                "people on weiting  " + peopleWait + " / " + peopleWaitMax +
                "<br>" + "<br>" +
                "trees needed   " + plantedTrees + " / " + plantedTreesMax +
                "<br>" + "<br>" +
                "kind of tree " + randomTree +
                "<br>" + "<br>" +
                "<button>APPLY FOR GROUP</button>"
            );

        })

        .on("mouseout", function () 
        {
            let alternativeImagePath = hoveredColor === "red" ? "../photos/map/red.svg" : "../photos/map/green.svg";
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
        .attr("xlink:href", "../photos/map/sea-poligon.svg")  
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


function drawHexagons() 
{
    g.selectAll("g").remove();
    
    const mapCenter = map.latLngToLayerPoint(centerCoordinates);
    const gridWidth = cols * hexagonWidth + (cols - 1) * (hexagonWidth / 2);
    const gridHeight = rows * (hexagonHeight * 0.75);
    
    const startX = mapCenter.x - gridWidth / 2;
    const startY = mapCenter.y - gridHeight / 2;
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            let x = startX + col * hexagonWidth + (row % 2 === 1 ? hexagonWidth / 2 : 0);
            let y = startY + row * (hexagonHeight * 0.75);

            let hexagonGroup = g.append("g")
                .attr("transform", "translate(" + x + "," + y + ")");

                if(row === 0)
                {
                    if(col<24)
                    {
                        createHexagon(hexagonGroup, true);
                    }
                    else
                    {
                        hexagonSea(hexagonGroup);
                    }
                }
                else if (row === 1) 
                {
                    if (col === 5) 
                    {
                        createHexagon(hexagonGroup, false);
                    } 
                    else if (col>16&&col<20)
                    {
                         createHexagon(hexagonGroup, false);
                    }
                    else if (col>22)
                    {
                        hexagonSea(hexagonGroup);
                    }
                    else {
                        createHexagon(hexagonGroup, true);
                    }
                } 
                else if(row===2)
                {
                    if(col===5||col===6)
                    {
                        createHexagon(hexagonGroup, false);
                    }
                    else if(col>15&&col<21)
                    {
                        createHexagon(hexagonGroup, false);
                    }
                    else if (col>21)
                    {
                        hexagonSea(hexagonGroup);
                    }
                    else
                    {
                        createHexagon(hexagonGroup, true);  
                    }
                }
                else if(row===3)
                {
                    if(col>4&&col<22)
                    {
                        createHexagon(hexagonGroup, false);
                    }
                    else if (col>21)
                    {
                        hexagonSea(hexagonGroup);
                    }
                    else
                    {
                        createHexagon(hexagonGroup, true);  
                    }
                }
                else if(row===4)
                {
                    if(col>5&&col<22)
                    {
                        createHexagon(hexagonGroup, false);
                    }
                    else if (col>20)
                    {
                        hexagonSea(hexagonGroup);
                    }
                    else
                    {
                        createHexagon(hexagonGroup, true);  
                    }
                }
                else if(row===5)
                {
                    if(col>5&&col<21)
                    {
                        createHexagon(hexagonGroup, false);
                    }
                    else if (col>20)
                    {
                        hexagonSea(hexagonGroup);
                    }
                    else
                    {
                        createHexagon(hexagonGroup, true);  
                    }
                }
                else if(row===6)
                {
                    if(col>5&&col<20)
                    {
                        createHexagon(hexagonGroup, false);
                    }
                    else if (col>19)
                    {
                        hexagonSea(hexagonGroup);
                    }
                    else
                    {
                        createHexagon(hexagonGroup, true);  
                    }
                }
                else if(row===7)
                {
                    if(col>5&&col<20)
                    {
                        createHexagon(hexagonGroup, false);
                    }
                    else if (col>19)
                    {
                        hexagonSea(hexagonGroup);
                    }
                    else
                    {
                        createHexagon(hexagonGroup, true);  
                    }
                }
                else if(row===8)
                {
                    if(col>5&&col<20)
                    {
                        createHexagon(hexagonGroup, false);
                    }
                    else if (col>18)
                    {
                        hexagonSea(hexagonGroup);
                    }
                    else
                    {
                        createHexagon(hexagonGroup, true);  
                    }
                }
                else if(row===9)
                {
                    if(col>4&&col<20)
                    {
                        createHexagon(hexagonGroup, false);
                    }
                    else if (col>19)
                    {
                        hexagonSea(hexagonGroup);
                    }
                    else
                    {
                        createHexagon(hexagonGroup, true);  
                    }
                }
                else if(row===10)
                {
                    if(col>4&&col<21)
                    {
                        createHexagon(hexagonGroup, false);
                    }
                    else if (col>19)
                    {
                        hexagonSea(hexagonGroup);
                    }
                    else
                    {
                        createHexagon(hexagonGroup, true);  
                    }
                }
                else if(row===11)
                {
                    if(col>4&&col<21)
                    {
                        createHexagon(hexagonGroup, false);
                    }
                    else if (col>20)
                    {
                        hexagonSea(hexagonGroup);
                    }
                    else
                    {
                        createHexagon(hexagonGroup, true);  
                    }
                }
                else if(row===12)
                {
                    if(col>5&&col<17)
                    {
                        createHexagon(hexagonGroup, false);
                    }
                    else if(col<21&&col>18)
                    {
                        createHexagon(hexagonGroup, false);
                    }
                    else if (col>20)
                    {
                        hexagonSea(hexagonGroup);
                    }
                    else
                    {
                        createHexagon(hexagonGroup, true);  
                    }
                }
                else if(row===13)
                {
                    if(col>5&&col<10)
                    {
                        createHexagon(hexagonGroup, false);
                    }
                    else if(col>11&&col<15)
                    {
                        createHexagon(hexagonGroup, false);
                    }
                    else if (col>20)
                    {
                        hexagonSea(hexagonGroup);
                    }
                    else
                    {
                        createHexagon(hexagonGroup, true);  
                    }
                }
                else if(row===14)
                {
                    if (col>20)
                    {
                        hexagonSea(hexagonGroup);
                    }
                    else
                    {
                        createHexagon(hexagonGroup, true); 
                    }
                }
        }
    }
}

update();
map.on("moveend", update);