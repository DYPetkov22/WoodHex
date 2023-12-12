// Define paths for random and alternative images, as well as types of random trees
const randomImagePaths = ["../photos/map/green.svg", "../photos/map/red.svg"];
const alternativeImagePaths = [
  "../photos/map/green-glow.svg",
  "../photos/map/red-glow.svg",
];
const randomTrees = ["LINDEN", "BIRCH", "PINE", "OAK"];

// Select the SVG element and create a group element for rendering hexagons
const svg = d3.select("#leaflet-map");
const g = svg.append("g").attr("class", "leaflet-zoom-hide");
const rows = 15;
const cols = 26;

// Calculate dimensions for hexagons
let windowWidth = window.innerWidth / cols - 8;
let windowHeight = window.innerHeight / rows;
let hexagonRadius = Math.sqrt(
  Math.pow(windowWidth / 2, 2) + Math.pow(windowHeight / 2, 2)
);
let hexagonWidth = hexagonRadius * Math.sqrt(3);
let hexagonHeight = hexagonRadius * 2;
let hoveredColor = "";

// Function to generate hexagon vertices based on radius and center coordinates
function hexagonPoints(radius, centerX, centerY) {
  return Array.from({ length: 6 }, (_, i) => {
    const angle = ((2 * Math.PI) / 6) * i;
    let x = centerX + radius * Math.sin(angle);
    let y = centerY + radius * Math.cos(angle);
    return [x, y];
  });
}

// Function to get a random number between min and max (inclusive)
function getRandomMax(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create a hexagon based on whether it's black or not
function createHexagon(hexagonGroup, isBlack) {
  if (isBlack) {
    // Create black hexagon with a ground image
    let hexagon = hexagonGroup
      .append("polygon")
      .attr("points", hexagonPoints(hexagonRadius, 0, 0).join(" "));

    let hexagonImage = hexagonGroup
      .append("image")
      .attr("xlink:href", "../photos/map/graund-poligon.svg")
      .attr("x", -hexagonRadius)
      .attr("y", -hexagonRadius)
      .attr("width", hexagonRadius * 2)
      .attr("height", hexagonRadius * 2.1);

    return hexagon;
  } else {
    // Create colored hexagon with a random image
    let hexagon = hexagonGroup
      .append("polygon")
      .attr("points", hexagonPoints(hexagonRadius, 0, 0).join(" "));

    let randomImagePath =
      randomImagePaths[Math.floor(Math.random() * randomImagePaths.length)];

    let hexagonImage = hexagonGroup
      .append("image")
      .attr("xlink:href", randomImagePath)
      .attr("x", -hexagonRadius)
      .attr("y", -hexagonRadius)
      .attr("width", hexagonRadius * 2)
      .attr("height", hexagonRadius * 2.1);

    // Add interactivity for mouseover, click, and mouseout events
    hexagonGroup.on("mouseover", function () {
      let hoveredImagePath = d3.select(this).select("image").attr("xlink:href");
      hoveredColor = hoveredImagePath.includes("green") ? "green" : "red";

      let alternativeImagePath =
        hoveredColor === "red"
          ? "../photos/map/red-glow.svg"
          : "../photos/map/green-glow.svg";
      d3.select(this).select("image").attr("xlink:href", alternativeImagePath);
    });

    hexagonGroup
      .on("click", function () {
        // Handle click event to show an overlay with information
        d3.select("#overlay-div").remove();

        const overlayDiv = d3
          .select("body")
          .append("div")
          .attr("id", "overlay-div")
          .html(
            "<button id='hide'><img src='../photos/map/x-button.png' alt='Hide'></button>"
          );
        // Find if the the clicked hexagon is red of green
        let hoveredImagePath = d3
          .select(this)
          .select("image")
          .attr("xlink:href");
        hoveredColor = hoveredImagePath.includes("green") ? "green" : "red";

        // Add the glow effect
        let alternativeImagePath =
          hoveredColor === "red"
            ? "../photos/map/red-glow.svg"
            : "../photos/map/green-glow.svg";
        d3.select(this)
          .select("image")
          .attr("xlink:href", alternativeImagePath);

        if (hoveredColor === "red") {
          // Find a random value for the plantedTrees
          let plantedTrees = Math.floor(Math.random() * 100);
          let plantedTreesMax = Math.floor(Math.random() * 100) + 100;

          // Find a random value for the peopleWait
          let peopleWait = Math.floor(Math.random() * 100);
          let peopleWaitMax = getRandomMax(peopleWait, 100);

          let randomTree =
            randomTrees[Math.floor(Math.random() * randomTrees.length)];

          // Disply the overlayDiv
          overlayDiv.html(
            "<div class='container-flex-alignment'>" +
              "<button id='hide'><img src='../photos/map/x-button.png' alt='Hide'></button>" +
              "</div>" +
              "<div class='styling-text-container-full-map'>" +
              "people on waiting  " +
              peopleWait +
              " / " +
              peopleWaitMax +
              "<br>" +
              "trees needed   " +
              plantedTrees +
              " / " +
              plantedTreesMax +
              "<br>" +
              "kind of tree " +
              randomTree +
              "<br>" +
              "<br>" +
              "<a href='../pages/applyforgroup.html'><button id='applyButton'>APPLY FOR GROUP</button></a>" +
              "</div>"
          );

          // Links the applyforgroup button to the site
          document
            .getElementById("applyButton")
            .addEventListener("click", function () {
              window.location.href = "../pages/applyforgroup.html";
            });
        } else {
          // Disply the overlayDiv
          overlayDiv.html(
            "<div class='container-flex-alignment'>" +
              "<button id='hide'><img src='../photos/map/x-button.png' alt='Hide'></button>" +
              "</div>" +
              "<div class='styling-text-container-full-map'>" +
              "people on waiting  0 / 0 " +
              "<br>" +
              "trees needed     0  /  0 " +
              "<br>" +
              "kind of tree: none" +
              "<br>" +
              "<br>" +
              "<a href='#'><button id='applyButton'>APPLY FOR GROUP</button></a>" +
              "</div>"
          );
        }

        // Hide the overlayDiv if the 'x' button is clicked
        document.getElementById("hide").addEventListener("click", function () {
          overlayDiv.style("display", "none");
        });
      })

      .on("mouseout", function () {
        // Handle mouseout event to revert to the original image
        let alternativeImagePath =
          hoveredColor === "red"
            ? "../photos/map/red.svg"
            : "../photos/map/green.svg";
        d3.select(this)
          .select("image")
          .attr("xlink:href", alternativeImagePath);
        d3.select(this).select("polygon").attr("transform", "scale(1)");
      });

    return hexagon;
  }
}

// Function to create a sea hexagon
function hexagonSea(hexagonGroup) {
  hexagon = hexagonGroup
    .append("polygon")
    .attr("points", hexagonPoints(hexagonRadius, 0, 0).join(" "));

  hexagonImage = hexagonGroup
    .append("image")
    .attr("xlink:href", "../photos/map/sea-poligon.svg")
    .attr("x", -hexagonRadius)
    .attr("y", -hexagonRadius)
    .attr("width", hexagonRadius * 2)
    .attr("height", hexagonRadius * 2.1);

  return hexagon;
}

// Loop to create hexagons based on rows and columns
for (let row = 0; row < rows; row++) {
  for (let col = 0; col < cols; col++) {
    // Calculate coordinates for each hexagon
    let x = col * hexagonWidth + (row % 2 === 1 ? hexagonWidth / 2 : 0);
    let y = row * (hexagonHeight * 0.75);

    // Create a group for each hexagon and determine its type based on row and column
    let hexagonGroup = g
      .append("g")
      .attr("transform", "translate(" + x + "," + y + ")");

    //Cases for different rows and columns, creating hexagons and sea hexagons
    switch (row) {
      case 0:
        if (col > 23) {
          hexagonSea(hexagonGroup);
        } else {
          createHexagon(hexagonGroup, true);
        }
        break;

      case 1:
        if (col === 5 || (col > 16 && col < 20)) {
          createHexagon(hexagonGroup, false);
        } else if (col > 22) {
          hexagonSea(hexagonGroup);
        } else {
          createHexagon(hexagonGroup, true);
        }
        break;

      case 2:
        if (col === 5 || col === 6 || (col > 15 && col < 21)) {
          createHexagon(hexagonGroup, false);
        } else if (col > 21) {
          hexagonSea(hexagonGroup);
        } else {
          createHexagon(hexagonGroup, true);
        }
        break;

      case 3:
        if (col > 4 && col < 22 && !(col > 21)) {
          createHexagon(hexagonGroup, false);
        } else if (col > 20) {
          hexagonSea(hexagonGroup);
        } else {
          createHexagon(hexagonGroup, true);
        }
        break;
      case 4:
        if (col > 5 && col < 22 && !(col > 21)) {
          createHexagon(hexagonGroup, false);
        } else if (col > 20) {
          hexagonSea(hexagonGroup);
        } else {
          createHexagon(hexagonGroup, true);
        }
        break;

      case 5:
      case 6:
      case 7:
      case 8:
        if (col > 5 && col < 21 && !(col > 20)) {
          createHexagon(hexagonGroup, false);
        } else if (col > 19) {
          hexagonSea(hexagonGroup);
        } else {
          createHexagon(hexagonGroup, true);
        }
        break;
      case 9:
      case 10:
      case 11:
        if (col > 4 && col < 21 && !(col > 20)) {
          createHexagon(hexagonGroup, false);
        } else if (col > 19) {
          hexagonSea(hexagonGroup);
        } else {
          createHexagon(hexagonGroup, true);
        }
        break;

      case 12:
        if (((col > 5 && col < 17) || (col < 21 && col > 18)) && !(col > 20)) {
          createHexagon(hexagonGroup, false);
        } else if (col > 20) {
          hexagonSea(hexagonGroup);
        } else {
          createHexagon(hexagonGroup, true);
        }
        break;

      case 13:
        if (((col > 5 && col < 10) || (col > 11 && col < 15)) && !(col > 20)) {
          createHexagon(hexagonGroup, false);
        } else if (col > 20) {
          hexagonSea(hexagonGroup);
        } else {
          createHexagon(hexagonGroup, true);
        }
        break;

      case 14:
        if (col > 20) {
          hexagonSea(hexagonGroup);
        } else {
          createHexagon(hexagonGroup, true);
        }
        break;

      default:
        break;
    }
  }
}
