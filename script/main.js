// Selecting DOM elements
const slideTextbox = document.querySelector('.slideshow-container');
const slides = document.getElementsByClassName("mySlides");
const dropdown = document.getElementById('navbarBasicExample');
const icon = document.getElementById('burger');
let slideIndex = 1, intervalId;

// Function to toggle the active state of the dropdown menu and burger icon
const toggle = () => {
    icon.classList.toggle('is-active');
    dropdown.classList.toggle('is-active');
}

// Function to enable scrolling
function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}

// Function to show slides in the slideshow
function showSlides() {
    // Clear the interval if the slideIndex is greater than the total number of slides
    if (slideIndex > slides.length) {
        clearInterval(intervalId);
        return;
    }

    // Reset the slideIndex if it is less than 1
    if (slideIndex < 1) {
        slideIndex = slides.length;
    }

    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Display the current slide
    slides[slideIndex - 1].style.display = "block";
    slideIndex++;
}

// Function to start the slideshow
function startSlideshow() {
    // Start the slideshow only if it is not already running
    if (!intervalId) {
        showSlides();
        // Set an interval to show slides every 2000 milliseconds (2 seconds)
        intervalId = setInterval(showSlides, 2000);
    }
}

// Function to check if the slideshow element is in view and start the slideshow
function checkSlidesInView(entries, observer) {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            startSlideshow();
            // Stop observing the element once it is in view
            observer.unobserve(entry.target);
        }
    });
}

// Check if the slideshow element exists
if (slideTextbox) {
    // Create an IntersectionObserver to check when the slideshow element is in view
    const observer = new IntersectionObserver(checkSlidesInView, { threshold: 0.5 });
    // Start observing the slideshow element
    observer.observe(slideTextbox);
}
