const toggle = () => {
    let icon = document.getElementById('burger')
    let dropdown = document.getElementById('navbarBasicExample')
    icon.classList.toggle('is-active')
    dropdown.classList.toggle('is-active')
}

document.body.classList.add("stop-scrolling");

function enableScroll() {
    document.body.classList.remove("stop-scrolling");
}