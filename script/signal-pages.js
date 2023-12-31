// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener("DOMContentLoaded", function () {
    // Get the email input and help text elements
    const emailInput = document.querySelector('input[type="email"]');
    const helpText = document.querySelector('.help.is-danger');

    // Add input event listener to the email input
    emailInput.addEventListener("input", function (event) {
        // Check if the email input is not valid
        if (!emailInput.validity.valid) {
            // Display the help text if the email is not valid
            helpText.style.display = 'block';
        } else {
            // Hide the help text if the email is valid
            helpText.style.display = 'none';
        }
    });
});

// Get the element with the ID "SubmitText"
let rim = document.getElementById("SubmitText");

// Function to execute when the submit button is clicked
function SubmitFunction() {
    // HTML content to replace the existing content with a submission message
    const html =
        '<div class="style-green-box flex-for-green-box" id="SubmitText">' +
        '<div class="aligns-for-upper-text-greenbox">' +
        '<p class="upper-text-one has-text-light is-size-5 is-size-7-touch is-size-7-desktop-only">THANKS FOR YOUR <br> SUBMISSION.</p>' +
        '<p class="upper-text-two has-text-light">We will be in touch. <br> Shortly!</p>' +
        '</div>' +
        '<div class="button-position">' +
        '<a href="../index.html" class="center-underline button-after-effect has-text-light">Back to home</a>' +
        '</div>' +
        '</div>';

    // Replace the content of the element with the submission message
    rim.innerHTML = html;
}