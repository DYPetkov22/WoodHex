let left = document.getElementById('left');
let right = document.getElementById('right');
let flagPoles =
    [
        { el: document.getElementById("card1"), pos: 0 },
        { el: document.getElementById("card2"), pos: 0 },
        { el: document.getElementById("card3"), pos: 0 }
    ];


gsap.to(flagPoles[0].el, { duration: 1, filter: 'blur(5px)', });
gsap.to(flagPoles[2].el, { duration: 1, filter: 'blur(5px)', });
gsap.to(flagPoles[1].el, { scale: 1.2, duration: 1 });

function leftFlip() {
    gsap.to(flagPoles[1].el, { scale: 1, duration: 1 });
    let lastFlagPole = flagPoles.pop();

    flagPoles.forEach((flagPole, index) => {
        flagPole.pos += 115;
        flagPole.el.style.zIndex = index + 1;
        gsap.to(flagPole.el, { opacity: 1, x: `${flagPole.pos}%`, duration: 1 });
    });

    lastFlagPole.el.style.zIndex = 0;
    lastFlagPole.pos -= 230;
    gsap.to(lastFlagPole.el, { opacity: 1, x: `${lastFlagPole.pos}%`, duration: 1 });

    flagPoles.unshift(lastFlagPole);
    gsap.to(flagPoles[1].el, { scale: 1.2, duration: 1 });
    gsap.to(flagPoles[1].el, { zIndex: 5, duration: 0 });
    gsap.to(flagPoles[1].el, { duration: 1, filter: 'blur(0px)', });

    gsap.to(flagPoles[0].el, { duration: 1, filter: 'blur(5px)', });
    gsap.to(flagPoles[2].el, { duration: 1, filter: 'blur(5px)', });
}

function rightFLip() {
    gsap.to(flagPoles[1].el, { scale: 1, duration: 1 });
    let firstFlagPole = flagPoles.shift();

    flagPoles.forEach((flagPole, index) => {
        flagPole.pos -= 115;
        flagPole.el.style.zIndex = index + 1;
        gsap.to(flagPole.el, { opacity: 1, x: `${flagPole.pos}%`, duration: 1 });
    });

    firstFlagPole.el.style.zIndex = 0;
    firstFlagPole.pos += 230;
    gsap.to(firstFlagPole.el, { opacity: 1, x: `${firstFlagPole.pos}%`, duration: 1 });

    flagPoles.push(firstFlagPole);
    gsap.to(flagPoles[1].el, { scale: 1.2, zIndex: 5, duration: 1 });
    gsap.to(flagPoles[1].el, { zIndex: 5, duration: 0 });
    gsap.to(flagPoles[1].el, { duration: 1, filter: 'blur(0px)', });

    gsap.to(flagPoles[0].el, { duration: 1, filter: 'blur(5px)', });
    gsap.to(flagPoles[2].el, { duration: 1, filter: 'blur(5px)', });
}

left.addEventListener('click', leftFlip);
right.addEventListener('click', rightFLip);