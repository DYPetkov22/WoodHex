document.addEventListener("DOMContentLoaded", function () {
    const emailInput = document.querySelector('input[type="email"]');
    const helpText = document.querySelector('.help.is-danger');
  
    emailInput.addEventListener("input", function (event) {
        if (!emailInput.validity.valid) {
            helpText.style.display = 'block';
        } else {
            helpText.style.display = 'none';
        }
    });
  });
  
  
  let rim = document.getElementById("SubmitText");
  
  function SubmitFunction() {
    const html =
        '<div class="column nova second2 is-6" id="SubmitText">' +
        '<p class="text11 has-text-light">THANKS FOR YOUR SUBMISSION.</p>' +
        '<p class="text21 has-text-light">We will be in touch.</p>' +
        '<p class="text22 has-text-light">Shortly!</p>' +
        '<a href="../index.html" class="center-underline has-text-light">back to home</a>' +
        '</div>';
    rim.innerHTML = html;
  }