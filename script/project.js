// Get the SVG element by its ID
const svg = document.getElementById("pythagoras-tree");

// Function to draw the Pythagoras tree based on depth, mouseX position, and size
function drawPythagorasTree(depth, mouseX, size) {
    // Clear the SVG content
    svg.innerHTML = "";

    // Recursive function to draw branches of the tree
    function drawBranch(x, y, angle, length, depth) {
        // Base case: stop drawing if depth is 0
        if (depth === 0) return;

        // Determine branch color based on length
        let colour;
        if (length < 20) {
            colour = "rgb(176, 206, 109)";
        } else if (length < 50) {
            colour = "rgb(141, 184, 100)";
        } else {
            colour = "rgb(38, 149, 103)";
        }

        // Calculate end point of the branch
        const x1 = x;
        const y1 = y;
        const x2 = x1 + length * Math.cos(angle);
        const y2 = y1 + length * Math.sin(angle);

        // Create a line element for the branch and set attributes
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", colour);

        // Append the line to the SVG
        svg.appendChild(line);

        // Calculate new length and angles for the next branches
        const newLength = length * 0.7;
        const newAngle1 = angle - Math.cos(mouseX * Math.PI);
        const newAngle2 = angle + Math.cos(mouseX * Math.PI);

        // Recursively draw the next branches
        drawBranch(x2, y2, newAngle1, newLength, depth - 1);
        drawBranch(x2, y2, newAngle2, newLength, depth - 1);
    }

    // Set the starting position and parameters for the tree
    const startX = svg.clientWidth / 2;
    const startY = svg.clientHeight;

    // Initiate the drawing of the tree
    drawBranch(startX, startY, -Math.PI / 2, size, depth);
}

// Function to resize the tree based on mouse position
function resizeTree() {
    // Calculate depth, number of branches, and size based on mouse position and SVG dimensions
    const depth = 10 - Math.floor((lastMouseY / svg.clientHeight) * 10);
    const numBranches = lastMouseX / svg.clientWidth;
    const size = Math.min(svg.clientWidth, svg.clientHeight) / 4;

    // Redraw the tree with updated parameters
    drawPythagorasTree(depth, numBranches, size);
}

// Initialize variables to track last mouse position
let lastMouseX = 0;
let lastMouseY = 0;

// Event listener for mousemove to track mouse position and trigger tree resizing
svg.addEventListener("mousemove", function (event) {
    lastMouseX = event.clientX - svg.getBoundingClientRect().left;
    lastMouseY = event.clientY - svg.getBoundingClientRect().top;

    // Resize the tree based on mouse position
    resizeTree();
});

// Event listener for window resize to update the tree accordingly
window.addEventListener("resize", function () {
    // Resize the tree when the window is resized
    resizeTree();
});

// Initial call to resizeTree to draw the initial tree
resizeTree();