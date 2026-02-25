#!/usr/bin/env node

// Update products with model images using PUT endpoint
async function getAllProducts() {
    const response = await fetch('http://localhost:3000/api/products?includeHidden=true');
    if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
    }
    return response.json();
}

async function updateProduct(id, image) {
    const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image })
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to update product: ${response.statusText} - ${errorText}`);
    }

    return response.json();
}

async function updateAllProducts() {
    console.log('📥 Fetching all products...\n');
    const products = await getAllProducts();

    const imageMap = {
        "light-blue-cardigan": "/images/products/cardigan-light-blue-model.png",
        "navy-cardigan": "/images/products/cardigan-navy-model.png",
        "red-cardigan": "/images/products/cardigan-red-model.png",
        "light-blue-polo": "/images/products/polo-light-blue-model.png",
        "navy-polo": "/images/products/polo-navy-model.png",
        "red-polo": "/images/products/polo-red-model.png",
        "light-blue-pullover": "/images/products/pull-light-blue-model.png",
        "navy-pullover": "/images/products/pull-navy-model.png",
        "red-pullover": "/images/products/pull-red-model.png"
    };

    console.log('🖼️  Updating products with model images...\n');

    let updated = 0;
    let failed = 0;

    for (const product of products) {
        const modelImage = imageMap[product.slug];
        if (modelImage) {
            try {
                await updateProduct(product.id, modelImage);
                updated++;
                console.log(`✅ Updated: ${product.name} (${product.slug})`);
            } catch (error) {
                failed++;
                console.error(`❌ Failed: ${product.name} - ${error.message}`);
            }
        }
    }

    console.log(`\n📊 Update complete!`);
    console.log(`   ✅ Updated: ${updated}`);
    console.log(`   ❌ Failed: ${failed}`);
    console.log(`   📦 Total: ${products.length}`);
}

updateAllProducts().catch(console.error);
