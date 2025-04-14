// AWS Configuration
AWS.config.update({
    region: "us-east-2",  // Ensure this matches your AWS Cognito region!
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: "us-east-2:ca7df4e7-b556-42bd-8f2c-5debf77ef207" // Your Cognito Pool ID
    })
});

// Debugging: Log AWS Credentials
AWS.config.credentials.get(function(err) {
    if (err) {
        console.error("Cognito Credential Error:", err);
    } else {
        console.log("Cognito Credentials:", AWS.config.credentials);
    }
});

var docClient = new AWS.DynamoDB.DocumentClient();

function loadProducts() {
    var params = {
        TableName: "doombroom.com_Products"
    };

    docClient.scan(params, function(err, data) {
        if (err) {
            console.error("DynamoDB Fetch Error:", err);
        } else {
            console.log("🔎 DynamoDB Response (No Filter):", data.Items); // Log all products
            displayProducts(data.Items);
        }
    });
}

function displayProducts(items) {
    let gallery = document.getElementById("product-gallery");
    gallery.innerHTML = ""; // Clear previous content

    if (!items || items.length === 0) {
        gallery.innerHTML = "<p>No products available.</p>"; // Handle empty response
        return;
    }

    console.log("📦 Displaying Products:", items); // Log full product data

    items.forEach(item => {
        console.log("🔍 Checking item:", JSON.stringify(item, null, 2)); // Log full object structure

    console.log("Raw Image Data from DynamoDB:", item.images);

    let imageUrl = (item.images && item.images.length > 0)
        ? item.images[0].replace("s3.amazonaws.com/your-bucket", "s3.us-east-2.amazonaws.com/doombroom.com").replace(".jpg", ".png")
        : "https://via.placeholder.com/150"; // Default image if missing

    console.log("Final Image URL:", imageUrl); // Debugging



        let title = (item.title && item.title.S) ? item.title.S : "No Title Available";
        let description = (item.description && item.description.S) ? item.description.S : "No Description Available";
        let price = (item.price && item.price.N) ? `$${item.price.N}` : "Price Unavailable";

        let productCard = `
            <div class="product">
                <img src="${imageUrl}" alt="${title}">
                <h3>${title}</h3>
                <p>${description}</p>
                <span>${price}</span>
                <button onclick="buyNow('${item.item_id.S}')">Buy Now</button>
            </div>`;
        gallery.innerHTML += productCard;
    });
}





// Load products when the page is ready
document.addEventListener("DOMContentLoaded", loadProducts);
