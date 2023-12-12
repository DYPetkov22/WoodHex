// Get DOM elements for left and right buttons and flag poles
let left = document.getElementById('left');
let right = document.getElementById('right');
let flagPoles = [
  { el: document.getElementById("card1"), pos: 0 },
  { el: document.getElementById("card2"), pos: 0 },
  { el: document.getElementById("card3"), pos: 0 }
];

// Initial animations
gsap.to(flagPoles[1].el, { scale: 1.2, duration: 1 });
gsap.to(flagPoles[0].el, { duration: 1, filter: 'blur(3px)' });
gsap.to(flagPoles[2].el, { duration: 1, filter: 'blur(3px)' });
gsap.to(flagPoles[0].el, { rotationX: 10, rotationY: 20 });
gsap.to(flagPoles[2].el, { rotationX: 10, rotationY: -20 });

// Mouse move event listener for interactive rotation
document.addEventListener('mousemove', (event) => {
  const tiltX = (event.clientX / window.innerWidth - 0.5) * 40;
  const tiltY = (event.clientY / window.innerHeight - 0.5) * 40;
  gsap.to(flagPoles[1].el, {
    duration: 0.5,
    ease: 'power2.out',
    rotationX: tiltY,
    rotationY: tiltX,
  });
});

// Function for the left flip animation
function leftFlip() {
  gsap.to(flagPoles[1].el, { scale: 1, duration: 1 });

  let lastFlagPole = flagPoles.pop();

  // Update positions and zIndex for remaining flag poles
  flagPoles.forEach((flagPole, index) => {
    flagPole.pos += 118;
    flagPole.el.style.zIndex = index + 1;
    gsap.to(flagPole.el, { opacity: 1, x: `${flagPole.pos}%`, duration: 1 });
  });

  // Update the last flag pole and add it back to the beginning
  lastFlagPole.el.style.zIndex = 0;
  lastFlagPole.pos -= 236;
  gsap.to(lastFlagPole.el, { opacity: 1, x: `${lastFlagPole.pos}%`, duration: 1 });

  flagPoles.unshift(lastFlagPole);

  // Apply animations to the flag poles
  gsap.to(flagPoles[1].el, { duration: 1, scale: 1.2, zIndex: 5, filter: 'blur(0px)' });
  gsap.to(flagPoles[0].el, { duration: 1, filter: 'blur(3px)', rotationX: 10, rotationY: 20 });
  gsap.to(flagPoles[2].el, { duration: 1, filter: 'blur(3px)', rotationX: 10, rotationY: -20 });
}

// Function for the right flip animation
function rightFLip() {
  gsap.to(flagPoles[1].el, { scale: 1, duration: 1 });
  let firstFlagPole = flagPoles.shift();

  // Update positions and zIndex for remaining flag poles
  flagPoles.forEach((flagPole, index) => {
    flagPole.pos -= 118;
    flagPole.el.style.zIndex = index + 1;
    gsap.to(flagPole.el, { opacity: 1, x: `${flagPole.pos}%`, duration: 1 });
  });

  // Update the first flag pole and add it back to the end
  firstFlagPole.el.style.zIndex = 0;
  firstFlagPole.pos += 236;
  gsap.to(firstFlagPole.el, { opacity: 1, x: `${firstFlagPole.pos}%`, duration: 1 });

  flagPoles.push(firstFlagPole);

  // Apply animations to the flag poles
  gsap.to(flagPoles[1].el, { duration: 1, scale: 1.2, zIndex: 5, filter: 'blur(0px)' });
  gsap.to(flagPoles[0].el, { duration: 1, filter: 'blur(3px)', rotationX: 10, rotationY: 20 });
  gsap.to(flagPoles[2].el, { duration: 1, filter: 'blur(3px)', rotationX: 10, rotationY: -20 });
}

// Event listeners for left and right button clicks
left.addEventListener('click', leftFlip);
right.addEventListener('click', rightFLip);
