// Product Details JavaScript

// Product data
const products = {
    'chill-outs': {
        name: 'Chill Outs Package',
        description: 'Perfect relaxation setup for intimate beach gatherings. Create the ultimate chill experience with our carefully curated collection of comfort and ambiance elements.',
        mainImage: 'Landing3_enhanced.png',
        gallery: ['Landing3_enhanced.png', 'Canvas Beach Chairs.jpeg', 'Glow in Dark Light.jpeg', 'Water Resistant Pillows.jpeg'],
        features: [
            'Comfortable seating arrangements',
            'Ambient lighting solutions',
            'Cozy cushions and pillows',
            'Beach mats for ground seating',
            'Decorative elements for atmosphere',
            'Setup and breakdown service'
        ],
        specifications: {
            'Ideal For': 'Intimate gatherings, romantic dates, small groups (2-8 people)',
            'Setup Time': '1-2 hours',
            'Includes': 'Seating, lighting, decorative elements',
            'Duration': 'Full day rental',
            'Location': 'Diani Beach and surrounding areas'
        },
        category: 'Event Package'
    },
    'gatherings': {
        name: 'Gatherings Package',
        description: 'Ideal for medium-sized social events. Complete setup with seating arrangements, dining area, and entertainment space for memorable beach gatherings.',
        mainImage: 'Landing2_enhanced.png',
        gallery: ['Landing2_enhanced.png', 'Dining Cutlery.jpeg', 'Canvas Beach Chairs.jpeg', 'Flower Vases.jpeg'],
        features: [
            'Complete seating arrangements',
            'Dining area setup',
            'Entertainment space',
            'Table and chair configurations',
            'Decorative table settings',
            'Professional event styling'
        ],
        specifications: {
            'Ideal For': 'Social gatherings, celebrations, corporate events (10-25 people)',
            'Setup Time': '2-3 hours',
            'Includes': 'Tables, chairs, dining setup, decorations',
            'Duration': 'Full day rental',
            'Location': 'Diani Beach and surrounding areas'
        },
        category: 'Event Package'
    },
    'mini-events': {
        name: 'Mini Events Package',
        description: 'Professional setup for small celebrations and events. Includes tables, chairs, decorative elements, and full event styling for special occasions.',
        mainImage: 'Landing1_enhanced.png',
        gallery: ['Landing1_enhanced.png', 'Flower Vases.jpeg', 'Dining Cutlery.jpeg', 'Glow in Dark Light.jpeg'],
        features: [
            'Professional event setup',
            'Complete table and chair arrangements',
            'Decorative styling',
            'Elegant table settings',
            'Ambient lighting',
            'Full event coordination'
        ],
        specifications: {
            'Ideal For': 'Birthdays, anniversaries, proposals, small weddings (15-40 people)',
            'Setup Time': '3-4 hours',
            'Includes': 'Complete event setup with styling',
            'Duration': 'Full day rental with setup/breakdown',
            'Location': 'Diani Beach and surrounding areas'
        },
        category: 'Event Package'
    },
    'beach-shades': {
        name: 'Beach Shades',
        description: 'Premium sun protection with stylish beach umbrellas and shade structures. Available individually or as part of our event packages.',
        mainImage: '47.jpg',
        gallery: ['47.jpg', '46.jpg', '48.jpg'],
        features: [
            'UV protection',
            'Wind-resistant design',
            'Easy setup and adjustment',
            'Stylish beach umbrellas',
            'Various sizes available',
            'Professional installation'
        ],
        specifications: {
            'Ideal For': 'Sun protection, individual use, package addition',
            'Sizes': 'Small (2m), Medium (3m), Large (4m)',
            'Material': 'UV-resistant fabric',
            'Setup': 'Professional installation included',
            'Rental': 'Individual item or package inclusion'
        },
        category: 'Individual Item'
    },
    'canvas-beach-chairs': {
        name: 'Canvas Beach Chairs',
        description: 'Comfortable and durable canvas beach chairs. Perfect for relaxation and available for individual rental or package inclusion.',
        mainImage: 'Canvas Beach Chairs.jpeg',
        gallery: ['Canvas Beach Chairs.jpeg', 'Water Resistant Pillows.jpeg'],
        features: [
            'Comfortable canvas material',
            'Durable construction',
            'Lightweight and portable',
            'Eco-friendly materials',
            'Easy to clean',
            'Available in various colors'
        ],
        specifications: {
            'Ideal For': 'Beach relaxation, individual use, event seating',
            'Material': 'Canvas and aluminum frame',
            'Weight Capacity': '120kg',
            'Dimensions': '60cm x 80cm x 90cm',
            'Rental': 'Individual item or package inclusion'
        },
        category: 'Individual Item'
    },
    'dining-setup': {
        name: 'Dining Setup',
        description: 'Complete dining arrangements including cutlery, plates, and table settings. Enhances any beach dining experience with style.',
        mainImage: 'Dining Cutlery.jpeg',
        gallery: ['Dining Cutlery.jpeg', 'Flower Vases.jpeg'],
        features: [
            'Complete cutlery sets',
            'Eco-friendly plates and cups',
            'Professional table settings',
            'Decorative elements',
            'Easy cleanup',
            'Sustainable materials'
        ],
        specifications: {
            'Ideal For': 'Beach dining, picnics, event meals',
            'Includes': 'Cutlery, plates, cups, napkins, decorations',
            'Material': 'Eco-friendly bamboo and recycled materials',
            'Serving Size': 'Available for groups of 5-50 people',
            'Rental': 'Individual item or package inclusion'
        },
        category: 'Individual Item'
    }
};

// Get URL parameters
function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Load product details
function loadProductDetails() {
    const productId = getURLParameter('product');
    const product = products[productId];
    
    if (!product) {
        // Redirect to main page if product not found
        window.location.href = 'index.html';
        return;
    }
    
    // Update page title
    document.title = `${product.name} - EcoFriendly Beach Rentals`;
    document.getElementById('hero-title').textContent = product.name;
    
    // Update main image
    const mainImage = document.getElementById('main-product-image');
    mainImage.src = product.mainImage;
    mainImage.alt = product.name;
    
    // Update product info
    document.getElementById('product-title').textContent = product.name;
    document.getElementById('product-category').textContent = product.category;
    document.getElementById('product-description').textContent = product.description;
    
    // Update gallery thumbnails
    const galleryContainer = document.getElementById('thumbnail-gallery');
    galleryContainer.innerHTML = '';
    product.gallery.forEach((image, index) => {
        const img = document.createElement('img');
        img.src = image;
        img.alt = product.name;
        img.className = 'thumbnail';
        if (index === 0) img.classList.add('active');
        img.onclick = () => changeMainImage(image);
        galleryContainer.appendChild(img);
    });
    
    // Update features
    const featuresList = document.getElementById('features-list');
    featuresList.innerHTML = '';
    product.features.forEach(feature => {
        const li = document.createElement('li');
        li.innerHTML = `<i>✓</i> ${feature}`;
        featuresList.appendChild(li);
    });
    
    // Update specifications
    const specsList = document.getElementById('specifications-list');
    specsList.innerHTML = '';
    Object.entries(product.specifications).forEach(([key, value]) => {
        const li = document.createElement('li');
        li.innerHTML = `<strong>${key}:</strong> ${value}`;
        specsList.appendChild(li);
    });
    
    // Update WhatsApp button
    const whatsappBtn = document.getElementById('whatsapp-inquiry');
    const message = `Hello! I'm interested in the ${product.name}. Could you please provide more information about availability and setup?`;
    whatsappBtn.href = `https://wa.me/254797185854?text=${encodeURIComponent(message)}`;
    
    // Load related products
    loadRelatedProducts(productId);
}

// Load related products
function loadRelatedProducts(currentProductId) {
    const relatedContainer = document.getElementById('related-products');
    
    // Get all products except the current one
    const relatedProducts = Object.entries(products)
        .filter(([id, product]) => id !== currentProductId)
        .slice(0, 3); // Show only 3 related products
    
    relatedContainer.innerHTML = relatedProducts.map(([id, product]) => `
        <div class="related-item" onclick="window.location.href='product-details.html?id=${id}'">
            <img src="${product.mainImage}" alt="${product.name}">
            <div class="related-item-info">
                <h4>${product.name}</h4>
                <p>${product.shortDescription}</p>
            </div>
        </div>
    `).join('');
}

// Change main image
function changeMainImage(imageSrc) {
    document.getElementById('main-product-image').src = imageSrc;
}

// Initialize page
document.addEventListener('DOMContentLoaded', loadProductDetails);