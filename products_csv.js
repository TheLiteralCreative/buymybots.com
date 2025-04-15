window.addEventListener('DOMContentLoaded', () => {
  fetch('inventory.csv')
    .then(response => response.text())
    .then(csv => {
      const data = Papa.parse(csv, { header: true }).data;
      const gallery = document.getElementById('product-gallery');

      data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'product-card';

        const imgSrc = item.Images !== "Unavailable" ? item.Images : "https://via.placeholder.com/300x200?text=No+Image";

        div.innerHTML = `
          <img src="${imgSrc}" alt="${item.Character}">
          <h3>${item.Character}</h3>
          <p><strong>Alt Mode:</strong> ${item["Alt Mode"]}</p>
          <p><strong>Team:</strong> ${item.Team}</p>
          <p><strong>Series:</strong> ${item.Series} (${item.Edition})</p>
          <p><strong>Class:</strong> ${item.Class}</p>
          <small>Maker: ${item.Maker} • Country: ${item.Country}</small>
          <small>SKU: ${item.SKU} • Packaging: ${item.Packaging} • Date: ${item.Date}</small>
          <div class="price-info">
            <p><strong>Sold On eBay:</strong> ${item["Ebay $old"]}</p>
            <p><strong>Your Price:</strong> ${item["4 $ale"]}</p>
            <p><strong>Current eBay Avg:</strong> ${item["Ebay $"]}</p>
          </div>
        `;

        console.log("🧾 Rendering:", item.Character);
        gallery.appendChild(div);
      });
    })
    .catch(error => {
      console.error("❌ Failed to load inventory.csv", error);
    });
});
