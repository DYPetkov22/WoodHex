const svg = document.getElementById("pythagoras-tree");

function drawPythagorasTree(depth, mouseX) 
{
    svg.innerHTML = "";

    function drawBranch(x, y, angle, length, depth,) 
    {
        if (depth === 0) return;
        
        let colour;
        if (length < 20) 
        {
           colour = "rgb(176, 206, 109)";    
        }
        else if(length < 50)
        {
            colour = "rgb(141, 184, 100)";
        }
        else
        {
            colour = "rgb(38, 149, 103)" ;
        }

        const x1 = x;
        const y1 = y;
        const x2 = x1 + length * Math.cos(angle);
        const y2 = y1 + length * Math.sin(angle);

        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x1);
        line.setAttribute("y1", y1);
        line.setAttribute("x2", x2);
        line.setAttribute("y2", y2);
        line.setAttribute("stroke", colour);

        svg.appendChild(line);

        const newLength = length * 0.7;
        const newAngle1 = angle - Math.sin(mouseX * Math.PI);
        const newAngle2 = angle + Math.sin(mouseX * Math.PI);

        drawBranch(x2, y2, newAngle1, newLength, depth - 1, false);
        drawBranch(x2, y2, newAngle2, newLength, depth - 1, false);
    }

    const startX = svg.clientWidth / 2; 
    const startY = svg.clientHeight; 

    drawBranch(startX, startY, -Math.PI / 2, 180, depth);
}

svg.addEventListener("mousemove", function (event) 
{
    const mouseX = event.clientX - svg.getBoundingClientRect().left;
    const mouseY = event.clientY - svg.getBoundingClientRect().top;

    const depth = 10 - Math.floor((mouseY / svg.clientHeight) * 10);
    const numBranches = mouseX / svg.clientWidth;

    drawPythagorasTree(depth, numBranches);
});