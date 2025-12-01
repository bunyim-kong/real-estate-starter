console.log("Main JavaScript");

fetch("../public/data/properties.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.error("Error fetching JSON:", error));


// Dark mode toggle
function toggleTheme() {
  document.body.classList.toggle("dark-mode");
}

// navbar scrolled
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar-content");
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

//Detail
var swiper = new Swiper(".mySwiper", {
loop: true,
spaceBetween: 10,
slidesPerView: 4,
freeMode: true,
watchSlidesProgress: true,
});
var swiper2 = new Swiper(".mySwiper2", {
loop: true,
spaceBetween: 10,
navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
},
thumbs: {
    swiper: swiper,
},
});
