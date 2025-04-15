
let allData = [];
let filteredData = [];
let currentPage = 1;
const perPage = 50;

function renderPage(page) {
  const gallery = document.getElementById('product-gallery');
  gallery.innerHTML = '';
  const start = (page - 1) * perPage;
  const pageData = filteredData.slice(start, start + perPage);
  pageData.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'product-card';
    const imgSrc = item.Images !== "Unavailable" ? item.Images : 'https://via.placeholder.com/300x200?text=No+Image';
    div.innerHTML = `
      <img src="${imgSrc}" alt="${item.Character}">
      <h3>${item.Character}</h3>
      <p>${item["Alt Mode"]}</p>
      <p><small>${item.Team}</small></p>
    `;
    div.onclick = () => showDetails(item);
    gallery.appendChild(div);
  });
  renderPaginationControls();
}

function renderPaginationControls() {
  const control = document.getElementById('pagination-controls');
  control.innerHTML = '';
  const totalPages = Math.ceil(filteredData.length / perPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement('button');
    btn.className = 'page-btn';
    btn.textContent = i;
    if (i === currentPage) btn.disabled = true;
    btn.onclick = () => {
      currentPage = i;
      renderPage(currentPage);
    };
    control.appendChild(btn);
  }
}

function showDetails(item) {
  const modal = document.getElementById('modal');
  const body = document.getElementById('modal-body');
  body.innerHTML = `
    <h2>${item.Character}</h2>
    <p><strong>Alt Mode:</strong> ${item["Alt Mode"]}</p>
    <p><strong>Team:</strong> ${item.Team}</p>
    <p><strong>Class:</strong> ${item.Class}</p>
    <p><strong>Series:</strong> ${item.Series}</p>
    <p><strong>Edition:</strong> ${item.Edition}</p>
    <p><strong>Maker:</strong> ${item.Maker}</p>
    <p><strong>Country:</strong> ${item.Country}</p>
    <p><strong>SKU:</strong> ${item.SKU}</p>
    <p><strong>Packaging:</strong> ${item.Packaging}</p>
    <p><strong>Date:</strong> ${item.Date}</p>
    <p><strong>eBay Sold:</strong> ${item["Ebay $old"]}</p>
    <p><strong>Your Price:</strong> ${item["4 $ale"]}</p>
    <p><strong>eBay Avg:</strong> ${item["Ebay $"]}</p>
  `;
  modal.classList.remove('hidden');
}

function filterData() {
  const query = document.getElementById('searchBox').value.toLowerCase();
  filteredData = allData.filter(item =>
    item.Character.toLowerCase().includes(query) ||
    item.Team.toLowerCase().includes(query) ||
    item.Class.toLowerCase().includes(query)
  );
  currentPage = 1;
  renderPage(currentPage);
}

document.addEventListener('DOMContentLoaded', () => {
  fetch('inventory.csv')
    .then(response => response.text())
    .then(csv => {
      allData = Papa.parse(csv, { header: true }).data;
      filteredData = allData;
      renderPage(currentPage);
    });

  document.getElementById('searchBox').addEventListener('input', filterData);
  document.getElementById('modal-close').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
  });
});
