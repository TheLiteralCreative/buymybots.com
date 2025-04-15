window.addEventListener('DOMContentLoaded', () => {
  fetch('https://buymybots.com/inventory.csv')
    .then(response => response.text())
    .then(csv => {
      const data = Papa.parse(csv, { header: true }).data;
      const gallery = document.getElementById('product-gallery');

      data.forEach(item => {
        const div = document.createElement('div');
        div.className = 'product-card';
        div.innerHTML = `
          <img src="${item.Images}" alt="${item.Character}" style="max-width:100%; border-radius:10px; margin-bottom:0.5rem;">
          <h3>${item.Character}</h3>
          <p><strong>Alt Mode:</strong> ${item["Alt Mode"]}</p>
          <p><strong>Team:</strong> ${item.Team}</p>
          <p><strong>Series:</strong> ${item.Series} (${item.Edition})</p>
          <p><strong>Class:</strong> ${item.Class}</p>
          <p><small>Maker: ${item.Maker} • Country: ${item.Country}</small></p>
          <p><small>SKU: ${item.SKU} • Packaging: ${item.Packaging} • Date: ${item.Date}</small></p>
        `;
        
        console.log("Parsed CSV Row:", data[0]);

        gallery.appendChild(div);
      });
    });
});
