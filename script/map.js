const randomImagePaths = ["../photos/map/green.svg", "../photos/map/red.svg"];
const alternativeImagePaths = ["../photos/map/green-glow.svg", "../photos/map/red-glow.svg"];
const randomTrees = ["Cherry plum", "Norway maple", "Horse Chestnut", "Common lilac"];

const svg = d3.select('#leaflet-map');
const g = svg.append("g").attr("class", "leaflet-zoom-hide");
const rows = 15;
const cols = 26;

let windowWidth = window.innerWidth / (cols) - (8);
let windowHeight = window.innerHeight / (rows);
let hexagonRadius = Math.sqrt(Math.pow(windowWidth / 2, 2) + Math.pow(windowHeight / 2, 2));
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

function getRandomMax(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createHexagon(hexagonGroup, isBlack) {
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
    else {
        let hexagon = hexagonGroup.append("polygon")
            .attr("points", hexagonPoints(hexagonRadius, 0, 0).join(" "));

        let randomImagePath = randomImagePaths[Math.floor(Math.random() * randomImagePaths.length)];

        let hexagonImage = hexagonGroup.append("image")
            .attr("xlink:href", randomImagePath)
            .attr("x", -hexagonRadius)
            .attr("y", -hexagonRadius)
            .attr("width", hexagonRadius * 2)
            .attr("height", hexagonRadius * 2.1);

        hexagonGroup.on("mouseover", function () {
            let hoveredImagePath = d3.select(this).select("image").attr("xlink:href");
            hoveredColor = hoveredImagePath.includes("green") ? "green" : "red";

            let alternativeImagePath = hoveredColor === "red" ? "../photos/map/red-glow.svg" : "../photos/map/green-glow.svg";
            d3.select(this).select("image").attr("xlink:href", alternativeImagePath);
        })

        hexagonGroup.on("click", function () {
            d3.select("#overlay-div").remove();

            const overlayDiv = d3.select("body").append("div")
                .attr("id", "overlay-div")
                .style("position", "fixed")

                .style("width", "16vw")
                .style("height", "15vw")

                .style("top", "25%")
                .style("left", "2%")

                .style("padding-left", "1%")

                .style("font-size", "1.3vw")
                .style("background-color", "rgba(26, 25, 25, 0.67)")
                .style("color", "white")

                .style("display", "flex")
                .style("justify-content", "space-evenly")
                .style("flex-direction", "column")
                .html("<button id='hide'><img src='../photos/map/x-button.png' alt='Hide'></button>");
            ;

            let hoveredImagePath = d3.select(this).select("image").attr("xlink:href");
            hoveredColor = hoveredImagePath.includes("green") ? "green" : "red";

            let alternativeImagePath = hoveredColor === "red" ? "../photos/map/red-glow.svg" : "../photos/map/green-glow.svg";
            d3.select(this).select("image").attr("xlink:href", alternativeImagePath);

            if (hoveredColor === "red") {
                let plantedTrees = Math.floor(Math.random() * 100);
                let plantedTreesMax = Math.floor(Math.random() * 100) + 100;

                let peopleWait = Math.floor(Math.random() * 100);
                let peopleWaitMax = getRandomMax(peopleWait, 100);

                let randomTree = randomTrees[Math.floor(Math.random() * randomTrees.length)];

                overlayDiv.html
                    (
                        "<button id='hide'><img src='../photos/map/x-button.png' alt='Hide'></button>" +
                        "people on waiting  " + peopleWait + " / " + peopleWaitMax +
                        "<br>" +
                        "trees needed   " + plantedTrees + " / " + plantedTreesMax +
                        "<br>" +
                        "kind of tree " + randomTree +
                        "<button id='applyButton'>APPLY FOR GROUP</button>"
                    );

                document.getElementById('applyButton').addEventListener('click', function () {
                    window.location.href = 'pages/ApplyForGroup.html';
                })
            }
            else {
                let plantedTrees = 100 + Math.floor(Math.random() * 100);

                overlayDiv.html
                    (
                        "<button id='hide'><img src='../photos/map/x-button.png' alt='Hide'></button>" +
                        "people on waiting  0 / 0 " +
                        "<br>" +
                        "trees needed   " + plantedTrees + " / " + plantedTrees +
                        "<br>" +
                        "kind of tree none" +
                        "<br>" + "<br>" +
                        "<button id='applyButton'>APPLY FOR GROUP</button>"
                    );
            }

            document.getElementById('hide').addEventListener('click', function () {
                overlayDiv.style("display", "none");
            });
        })

            .on("mouseout", function () {
                let alternativeImagePath = hoveredColor === "red" ? "../photos/map/red.svg" : "../photos/map/green.svg";
                d3.select(this).select("image").attr("xlink:href", alternativeImagePath);
                d3.select(this).select("polygon").attr("transform", "scale(1)");
            });

        return hexagon;
    }
}

function hexagonSea(hexagonGroup) {
    hexagon = hexagonGroup.append("polygon")
        .attr("points", hexagonPoints(hexagonRadius, 0, 0).join(" "))
        ;

    hexagonImage = hexagonGroup.append("image")
        .attr("xlink:href", "../photos/map/sea-poligon.svg")
        .attr("x", -hexagonRadius)
        .attr("y", -hexagonRadius)
        .attr("width", hexagonRadius * 2)
        .attr("height", hexagonRadius * 2.1)
        ;

    return hexagon;
}

for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        let x = col * hexagonWidth + (row % 2 === 1 ? hexagonWidth / 2 : 0);
        let y = row * (hexagonHeight * 0.75);

        let hexagonGroup = g.append("g")
            .attr("transform", "translate(" + x + "," + y + ")");

        if (row === 0) {
            if (col < 24) {
                createHexagon(hexagonGroup, true);
            }
            else {
                hexagonSea(hexagonGroup);
            }
        }
        else if (row === 1) {
            if (col === 5) {
                createHexagon(hexagonGroup, false);
            }
            else if (col > 16 && col < 20) {
                createHexagon(hexagonGroup, false);
            }
            else if (col > 22) {
                hexagonSea(hexagonGroup);
            }
            else {
                createHexagon(hexagonGroup, true);
            }
        }
        else if (row === 2) {
            if (col === 5 || col === 6) {
                createHexagon(hexagonGroup, false);
            }
            else if (col > 15 && col < 21) {
                createHexagon(hexagonGroup, false);
            }
            else if (col > 21) {
                hexagonSea(hexagonGroup);
            }
            else {
                createHexagon(hexagonGroup, true);
            }
        }
        else if (row === 3) {
            if (col > 4 && col < 22) {
                createHexagon(hexagonGroup, false);
            }
            else if (col > 21) {
                hexagonSea(hexagonGroup);
            }
            else {
                createHexagon(hexagonGroup, true);
            }
        }
        else if (row === 4) {
            if (col > 5 && col < 22) {
                createHexagon(hexagonGroup, false);
            }
            else if (col > 20) {
                hexagonSea(hexagonGroup);
            }
            else {
                createHexagon(hexagonGroup, true);
            }
        }
        else if (row === 5) {
            if (col > 5 && col < 21) {
                createHexagon(hexagonGroup, false);
            }
            else if (col > 20) {
                hexagonSea(hexagonGroup);
            }
            else {
                createHexagon(hexagonGroup, true);
            }
        }
        else if (row === 6) {
            if (col > 5 && col < 20) {
                createHexagon(hexagonGroup, false);
            }
            else if (col > 19) {
                hexagonSea(hexagonGroup);
            }
            else {
                createHexagon(hexagonGroup, true);
            }
        }
        else if (row === 7) {
            if (col > 5 && col < 20) {
                createHexagon(hexagonGroup, false);
            }
            else if (col > 19) {
                hexagonSea(hexagonGroup);
            }
            else {
                createHexagon(hexagonGroup, true);
            }
        }
        else if (row === 8) {
            if (col > 5 && col < 20) {
                createHexagon(hexagonGroup, false);
            }
            else if (col > 18) {
                hexagonSea(hexagonGroup);
            }
            else {
                createHexagon(hexagonGroup, true);
            }
        }
        else if (row === 9) {
            if (col > 4 && col < 20) {
                createHexagon(hexagonGroup, false);
            }
            else if (col > 19) {
                hexagonSea(hexagonGroup);
            }
            else {
                createHexagon(hexagonGroup, true);
            }
        }
        else if (row === 10) {
            if (col > 4 && col < 21) {
                createHexagon(hexagonGroup, false);
            }
            else if (col > 19) {
                hexagonSea(hexagonGroup);
            }
            else {
                createHexagon(hexagonGroup, true);
            }
        }
        else if (row === 11) {
            if (col > 4 && col < 21) {
                createHexagon(hexagonGroup, false);
            }
            else if (col > 20) {
                hexagonSea(hexagonGroup);
            }
            else {
                createHexagon(hexagonGroup, true);
            }
        }
        else if (row === 12) {
            if (col > 5 && col < 17) {
                createHexagon(hexagonGroup, false);
            }
            else if (col < 21 && col > 18) {
                createHexagon(hexagonGroup, false);
            }
            else if (col > 20) {
                hexagonSea(hexagonGroup);
            }
            else {
                createHexagon(hexagonGroup, true);
            }
        }
        else if (row === 13) {
            if (col > 5 && col < 10) {
                createHexagon(hexagonGroup, false);
            }
            else if (col > 11 && col < 15) {
                createHexagon(hexagonGroup, false);
            }
            else if (col > 20) {
                hexagonSea(hexagonGroup);
            }
            else {
                createHexagon(hexagonGroup, true);
            }
        }
        else if (row === 14) {
            if (col > 20) {
                hexagonSea(hexagonGroup);
            }
            else {
                createHexagon(hexagonGroup, true);
            }
        }
    }
}