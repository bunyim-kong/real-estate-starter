console.log("Main JavaScript");

fetch("../public/data/properties.json")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  })
  .catch((error) => console.error("Error fetching JSON:", error));


// navbar scrolled
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar-content");
  if (window.scrollY > 50) { // scroll amount to trigger
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});
