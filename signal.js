let left = document.getElementById('left');
let rigth = document.getElementById('rigth');
let flagPoles = 
[
    { el: document.getElementById("card1"), pos: 0 },
    { el: document.getElementById("card2"), pos: 0 },
    { el: document.getElementById("card3"), pos: 0 }
];

gsap.to(flagPoles[1].el, { scale: 1.5, duration: 1 });

function leftFlip() 
{
    gsap.to(flagPoles[1].el, { scale: 1, duration: 1 });
    let lastFlagPole = flagPoles.pop();
    
    flagPoles.forEach((flagPole, index) => 
    {
        flagPole.pos += 15;
        flagPole.el.style.zIndex = index + 1;
        gsap.to(flagPole.el, { opacity: 1, x: `${flagPole.pos}vw`, duration: 1 });
    });
    
    lastFlagPole.el.style.zIndex = 0;
    lastFlagPole.pos -= 40;
    gsap.to(lastFlagPole.el, { opacity: 1, x: `${lastFlagPole.pos}vw`, duration: 1 });
    
    flagPoles.unshift(lastFlagPole);
    gsap.to(flagPoles[1].el, { scale: 1.5, duration: 1 });
    gsap.to(flagPoles[1].el, { zIndex: 5, duration: 0});
}

function rigthFLip() 
{
    gsap.to(flagPoles[1].el, { scale: 1, duration: 1 });
    let firstFlagPole = flagPoles.shift();
    
    flagPoles.forEach((flagPole, index) => {
        flagPole.pos -= 15;
        flagPole.el.style.zIndex = index + 1;
        gsap.to(flagPole.el, { opacity: 1, x: `${flagPole.pos}vw`, duration: 1 });
    });
    
    firstFlagPole.el.style.zIndex =0;  
    firstFlagPole.pos += 30;
    gsap.to(firstFlagPole.el, { opacity: 1, x: `${firstFlagPole.pos}vw`, duration: 1 });
    
    flagPoles.push(firstFlagPole);
    gsap.to(flagPoles[1].el, { scale: 1.5, zIndex: 5, duration: 1 });
    gsap.to(flagPoles[1].el, { zIndex: 5, duration: 0});
}

left.addEventListener('click', leftFlip);
rigth.addEventListener('click', rigthFLip);