// Product Details JavaScript

// Product data
const products = {
    'canvas-beach-chairs': {
        title: 'Canvas Beach Chairs',
        price: 'KSh 500',
        pricePerDay: 'per day',
        image: 'Canvas Beach Chairs.jpeg',
        images: ['Canvas Beach Chairs.jpeg'],
        description: 'Comfortable and durable canvas beach chairs perfect for relaxing by the ocean. Made with high-quality, weather-resistant materials that can withstand sun, sand, and salt water. These chairs are lightweight yet sturdy, making them ideal for beach events, weddings, and leisure activities.',
        specifications: {
            'Material': 'Premium Canvas & Aluminum Frame',
            'Weight Capacity': '120kg',
            'Dimensions': '60cm x 65cm x 80cm',
            'Weight': '3.5kg',
            'Colors Available': 'Blue, Green, Red',
            'Setup Time': '2 minutes',
            'Rental Period': 'Minimum 1 day'
        },
        features: [
            'Weather-resistant canvas fabric',
            'Lightweight aluminum frame',
            'Foldable for easy transport',
            'Comfortable armrests',
            'Non-slip feet'
        ]
    },
    'dining-cutlery': {
        title: 'Premium Dining Cutlery Set',
        price: 'KSh 150',
        pricePerDay: 'per set',
        image: 'Dining Cutlery.jpeg',
        images: ['Dining Cutlery.jpeg'],
        description: 'Elegant stainless steel cutlery sets perfect for beachside dining and special events. Each set includes forks, knives, spoons, and serving utensils. Dishwasher safe and corrosion-resistant, ideal for outdoor dining experiences.',
        specifications: {
            'Material': 'Stainless Steel 304',
            'Set Contents': '4 Forks, 4 Knives, 4 Spoons, 2 Serving Spoons',
            'Finish': 'Mirror Polish',
            'Dishwasher Safe': 'Yes',
            'Rust Resistant': 'Yes',
            'Set Weight': '1.2kg',
            'Rental Period': 'Minimum 1 day'
        },
        features: [
            'Premium stainless steel construction',
            'Mirror finish for elegant appearance',
            'Comfortable grip design',
            'Dishwasher and corrosion resistant',
            'Complete dining set for 4 people'
        ]
    },
    'flower-vases': {
        title: 'Decorative Flower Vases',
        price: 'KSh 300',
        pricePerDay: 'per vase',
        image: 'Flower Vases.jpeg',
        images: ['Flower Vases.jpeg'],
        description: 'Beautiful ceramic and glass vases perfect for beach wedding centerpieces and event decorations. Available in various sizes and styles to complement your event theme. Ideal for fresh flowers or artificial arrangements.',
        specifications: {
            'Material': 'Ceramic & Glass',
            'Heights Available': '15cm, 25cm, 35cm',
            'Styles': 'Classic, Modern, Rustic',
            'Colors': 'White, Cream, Clear Glass',
            'Base Diameter': '10-15cm',
            'Care Instructions': 'Hand wash recommended',
            'Rental Period': 'Minimum 1 day'
        },
        features: [
            'Multiple size options available',
            'Various decorative styles',
            'Suitable for fresh or artificial flowers',
            'Stable base design',
            'Easy to clean and maintain'
        ]
    },
    'glow-lights': {
        title: 'Glow in Dark Lights',
        price: 'KSh 800',
        pricePerDay: 'per set',
        image: 'Glow in Dark Light.jpeg',
        images: ['Glow in Dark Light.jpeg'],
        description: 'Magical solar-powered LED lights that create a stunning ambiance for evening beach events. These eco-friendly lights charge during the day and automatically illuminate at dusk, providing hours of beautiful lighting.',
        specifications: {
            'Power Source': 'Solar Panel + Rechargeable Battery',
            'LED Count': '50 LEDs per string',
            'Total Length': '10 meters',
            'Lighting Duration': '8-10 hours',
            'Charging Time': '6-8 hours direct sunlight',
            'Weather Rating': 'IP65 Waterproof',
            'Rental Period': 'Minimum 1 day'
        },
        features: [
            'Solar-powered eco-friendly operation',
            'Automatic dusk-to-dawn operation',
            'Waterproof for outdoor use',
            'Multiple lighting modes',
            'Easy installation and setup'
        ]
    },
    'sisal-mats': {
        title: 'Sisal Beach Mats',
        price: 'KSh 400',
        pricePerDay: 'per mat',
        image: 'Sisal Beach Marts.jpeg',
        images: ['Sisal Beach Marts.jpeg'],
        description: 'Natural sisal fiber beach mats that provide comfortable seating and define spaces for beach events. Made from sustainable materials, these mats are perfect for yoga sessions, picnics, and casual beach gatherings.',
        specifications: {
            'Material': '100% Natural Sisal Fiber',
            'Dimensions': '2m x 1.5m',
            'Thickness': '8mm',
            'Weight': '2.5kg',
            'Pattern': 'Traditional Woven',
            'Care': 'Shake out sand, air dry',
            'Rental Period': 'Minimum 1 day'
        },
        features: [
            'Eco-friendly natural materials',
            'Comfortable and durable',
            'Sand-resistant weave',
            'Easy to clean and maintain',
            'Traditional craftsmanship'
        ]
    },
    'water-resistant-pillows': {
        title: 'Water Resistant Pillows',
        price: 'KSh 250',
        pricePerDay: 'per pillow',
        image: 'Water Resistant Pillows.jpeg',
        images: ['Water Resistant Pillows.jpeg'],
        description: 'Comfortable outdoor pillows with water-resistant covers, perfect for beach lounging and outdoor events. Quick-dry fabric ensures comfort even in humid coastal conditions.',
        specifications: {
            'Cover Material': 'Water-Resistant Polyester',
            'Fill Material': 'High-Density Foam',
            'Dimensions': '45cm x 45cm',
            'Thickness': '12cm',
            'Colors Available': 'Blue, Turquoise, Sand',
            'Zipper': 'Hidden YKK Zipper',
            'Rental Period': 'Minimum 1 day'
        },
        features: [
            'Water and stain resistant',
            'Quick-dry fabric technology',
            'UV-resistant colors',
            'Machine washable covers',
            'Comfortable support for lounging'
        ]
    }
};

// Get URL parameters
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Load product data
function loadProduct() {
    const productId = getURLParameter('product');
    const product = products[productId];
    
    if (!product) {
        // Redirect to main page if product not found
        window.location.href = 'index.html#products';
        return;
    }
    
    // Update page content
    document.title = `${product.title} - EcoFriendly Beach Rentals`;
    document.getElementById('hero-title').textContent = product.title;
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-price').innerHTML = `${product.price} <small style="font-size: 0.6em; color: #666;">${product.pricePerDay}</small>`;
    document.getElementById('product-description').textContent = product.description;
    
    // Load main image
    const mainImage = document.getElementById('main-image');
    mainImage.src = product.image;
    mainImage.alt = product.title;
    
    // Load thumbnail gallery
    const thumbnailGallery = document.getElementById('thumbnail-gallery');
    thumbnailGallery.innerHTML = '';
    
    product.images.forEach((image, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = image;
        thumbnail.alt = `${product.title} ${index + 1}`;
        thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumbnail.onclick = () => {
            mainImage.src = image;
            document.querySelectorAll('.thumbnail').forEach(t => t.classList.remove('active'));
            thumbnail.classList.add('active');
        };
        thumbnailGallery.appendChild(thumbnail);
    });
    
    // Load specifications
    const specsContainer = document.getElementById('product-specs');
    specsContainer.innerHTML = '';
    
    Object.entries(product.specifications).forEach(([label, value]) => {
        const specItem = document.createElement('div');
        specItem.className = 'spec-item';
        specItem.innerHTML = `
            <span class="spec-label">${label}:</span>
            <span class="spec-value">${value}</span>
        `;
        specsContainer.appendChild(specItem);
    });
    
    // Update WhatsApp button
    const whatsappBtn = document.getElementById('whatsapp-btn');
    const whatsappMessage = `Hello EcoFriendly Beach Rentals! I'm interested in renting the ${product.title} (${product.price} ${product.pricePerDay}). Could you please provide more details about availability and booking?`;
    whatsappBtn.href = `https://wa.me/254797185854?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Load related products
    loadRelatedProducts(productId);
}

// Load related products
function loadRelatedProducts(currentProductId) {
    const relatedContainer = document.getElementById('related-products');
    relatedContainer.innerHTML = '';
    
    // Get 3 random products excluding current one
    const allProducts = Object.keys(products).filter(id => id !== currentProductId);
    const shuffled = allProducts.sort(() => 0.5 - Math.random());
    const relatedProducts = shuffled.slice(0, 3);
    
    relatedProducts.forEach(productId => {
        const product = products[productId];
        const relatedItem = document.createElement('div');
        relatedItem.className = 'related-item';
        relatedItem.onclick = () => {
            window.location.href = `product-details.html?product=${productId}`;
        };
        
        relatedItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="related-item-info">
                <h4>${product.title}</h4>
                <p style="color: #4CAF50; font-weight: 600; margin: 5px 0;">${product.price} ${product.pricePerDay}</p>
                <p>${product.description.substring(0, 100)}...</p>
            </div>
        `;
        
        relatedContainer.appendChild(relatedItem);
    });
}

// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    loadProduct();
});

// Handle back button navigation
window.addEventListener('popstate', function() {
    loadProduct();
});