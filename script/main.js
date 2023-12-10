const toggle = () => {
    let icon = document.getElementById('burger')
    let dropdown = document.getElementById('navbarBasicExample')
    icon.classList.toggle('is-active')
    dropdown.classList.toggle('is-active')
}

function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}

let slideIndex = 1;
let intervalId;

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides");

    if (slideIndex > slides.length) {
        clearInterval(intervalId); // Clear the interval when all slides are shown
        return;
    }

    if (slideIndex < 1) {
        slideIndex = slides.length; // Loop back to the last slide if needed
    }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    slides[slideIndex - 1].style.display = "block";
    slideIndex++;
}

// Function to start the slideshow
function startSlideshow() {
    // Start the slideshow and store the interval ID in the variable
    intervalId = setInterval(showSlides, 3000);
}

// Check if the element is in the viewport when the page is scrolled
function checkSlidesInView() {
    let slides = document.getElementsByClassName("mySlides");

    // If the first slide is in the viewport, start the slideshow
    if (slides.length > 0) {
        startSlideshow();
        // Remove the event listener to avoid starting the slideshow multiple times
        window.removeEventListener('scroll', checkSlidesInView);
    }
}

// Attach the event listener
window.addEventListener('scroll', checkSlidesInView);