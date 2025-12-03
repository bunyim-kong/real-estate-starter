const sectionRentElement = document.getElementById("rentColsCard");
const filterButtons = document.querySelectorAll(".filter-btn");
const paginationContainer = document.getElementById("pagination");

let properties = [];
let filteredProperties = [];
let currentPage = 1;
const itemsPerPage = 12; // 12 cards per page

// Read URL parameter for default filter
const urlParams = new URLSearchParams(window.location.search);
const defaultFilter = urlParams.get("filter") || "house"; // default to rent if nav clicked

// Fetch data
fetch("../../public/data/properties.json")
  .then((response) => response.json())
  .then((data) => {
    properties = data;

    // Apply default filter
    applyFilter(defaultFilter);
  });

// Render cards for the current page
function renderPage(page) {
  sectionRentElement.innerHTML = "";
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const itemsToShow = filteredProperties.slice(start, end);

  itemsToShow.forEach((item) => {
    sectionRentElement.innerHTML += `
      <article class="card-items">
        <div class="card-items_media">
          <a href="/pages/detail-card/index.html?id=${item.id}">
            <img src="${item.images}" alt="">
          </a>
        </div>
        <div class="card-items__body">
          <div class="top-cols-item">
            <h2>USD ${item.price}</h2>
            <small><i class="fa-solid fa-star"></i> 4.9/5.0</small>
          </div>
          <h1 class="title-cols">${item.title.en}</h1>
          <p class="txt-cols">${item.location.district}</p>
          <small>
            <i class="fa-solid fa-bed"></i> ${item.bedrooms} Bedroom
            <i class="fa-solid fa-bath"></i> ${item.bathrooms} Bathroom
          </small>
          <div class="card-btn">
            <a href="/pages/detail-card/index.html?id=${item.id}">View Detail</a>
          </div>
        </div>
      </article>
    `;
  });

  renderPagination();
}

// Render pagination buttons
function renderPagination() {
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
  let html = "";

  if (currentPage > 1) html += `<button class="page-btn" data-page="${currentPage - 1}">Prev</button>`;

  for (let i = 1; i <= totalPages; i++) {
    html += `<button class="page-btn ${i === currentPage ? "active" : ""}" data-page="${i}">${i}</button>`;
  }

  if (currentPage < totalPages) html += `<button class="page-btn" data-page="${currentPage + 1}">Next</button>`;

  paginationContainer.innerHTML = html;

  document.querySelectorAll(".page-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      currentPage = Number(btn.dataset.page);
      renderPage(currentPage);
      window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
    });
  });
}

// Apply a filter
function applyFilter(filter) {
  // Set active button
  filterButtons.forEach((b) => b.classList.remove("active"));
  const activeBtn = Array.from(filterButtons).find(b => b.dataset.filter === filter);
  if (activeBtn) activeBtn.classList.add("active");

  // Filter data dynamically
  if (filter === "all") filteredProperties = properties; // show everything
  else if (filter === "sale") filteredProperties = properties.filter(item => item.purpose === "sale");
  else if (filter === "rent") filteredProperties = properties.filter(item => item.purpose === "rent");
  else filteredProperties = properties.filter(item => item.type === filter);

  currentPage = 1; // reset to first page
  renderPage(currentPage);
}

// Filter buttons click
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    applyFilter(filter);
  });
});
