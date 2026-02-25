// Product Migration Script for Formal Luxury Collection
// Run this script to populate the database with new products

const products = [
    // Cardigans
    {
        name: "Light Blue Cardigan",
        slug: "light-blue-cardigan",
        price: 280,
        description: "Refined cardigan crafted from premium merino wool blend. Features classic button closure and ribbed details. Sourced from Italian luxury deadstock.",
        image: "/images/products/cardigan-light-blue.png",
        category: "Cardigan",
        composition: "70% Merino Wool, 30% Cashmere",
        care: "Dry clean only. Store folded to maintain shape.",
        sizing: "True to size. Model wears size M.",
        sustainability: "Crafted from deadstock luxury fabrics, giving new life to premium materials.",
        variants: [
            { color: "Light Blue", slug: "light-blue-cardigan" },
            { color: "Navy", slug: "navy-cardigan" },
            { color: "Red", slug: "red-cardigan" }
        ],
        details: [
            "Premium merino wool blend",
            "Italian luxury deadstock",
            "Classic button closure",
            "Ribbed cuffs and hem",
            "Available in XS-XXL"
        ],
        images: [
            "/images/products/cardigan-light-blue.png"
        ],
        isFeatured: true
    },
    {
        name: "Navy Cardigan",
        slug: "navy-cardigan",
        price: 280,
        description: "Sophisticated navy cardigan in premium merino wool blend. Timeless design with modern refinement. Sourced from Italian luxury deadstock.",
        image: "/images/products/cardigan-navy.png",
        category: "Cardigan",
        composition: "70% Merino Wool, 30% Cashmere",
        care: "Dry clean only. Store folded to maintain shape.",
        sizing: "True to size. Model wears size M.",
        sustainability: "Crafted from deadstock luxury fabrics, giving new life to premium materials.",
        variants: [
            { color: "Light Blue", slug: "light-blue-cardigan" },
            { color: "Navy", slug: "navy-cardigan" },
            { color: "Red", slug: "red-cardigan" }
        ],
        details: [
            "Premium merino wool blend",
            "Italian luxury deadstock",
            "Classic button closure",
            "Ribbed cuffs and hem",
            "Available in XS-XXL"
        ],
        images: [
            "/images/products/cardigan-navy.png"
        ],
        isFeatured: true
    },
    {
        name: "Red Cardigan",
        slug: "red-cardigan",
        price: 280,
        description: "Bold red cardigan in premium merino wool blend. Statement piece with classic sophistication. Sourced from Italian luxury deadstock.",
        image: "/images/products/cardigan-red.png",
        category: "Cardigan",
        composition: "70% Merino Wool, 30% Cashmere",
        care: "Dry clean only. Store folded to maintain shape.",
        sizing: "True to size. Model wears size M.",
        sustainability: "Crafted from deadstock luxury fabrics, giving new life to premium materials.",
        variants: [
            { color: "Light Blue", slug: "light-blue-cardigan" },
            { color: "Navy", slug: "navy-cardigan" },
            { color: "Red", slug: "red-cardigan" }
        ],
        details: [
            "Premium merino wool blend",
            "Italian luxury deadstock",
            "Classic button closure",
            "Ribbed cuffs and hem",
            "Available in XS-XXL"
        ],
        images: [
            "/images/products/cardigan-red.png"
        ],
        isFeatured: false
    },

    // Polos
    {
        name: "Light Blue Polo",
        slug: "light-blue-polo",
        price: 220,
        description: "Elegant polo shirt in fine Egyptian cotton piqué. Refined collar and subtle texture. Premium quality for discerning tastes.",
        image: "/images/products/polo-light-blue.png",
        category: "Polo",
        composition: "100% Egyptian Cotton Piqué",
        care: "Machine wash cold. Tumble dry low. Iron medium heat.",
        sizing: "Tailored fit. Size up for relaxed fit.",
        sustainability: "Made from premium deadstock fabrics from renowned fashion houses.",
        variants: [
            { color: "Light Blue", slug: "light-blue-polo" },
            { color: "Navy", slug: "navy-polo" },
            { color: "Red", slug: "red-polo" }
        ],
        details: [
            "Egyptian cotton piqué",
            "Refined collar design",
            "Ribbed collar and cuffs",
            "Signature embroidery",
            "Available in XS-XXL"
        ],
        images: [
            "/images/products/polo-light-blue.png"
        ],
        isFeatured: true
    },
    {
        name: "Navy Polo",
        slug: "navy-polo",
        price: 220,
        description: "Classic navy polo in fine Egyptian cotton piqué. Timeless elegance meets modern refinement.",
        image: "/images/products/polo-navy.png",
        category: "Polo",
        composition: "100% Egyptian Cotton Piqué",
        care: "Machine wash cold. Tumble dry low. Iron medium heat.",
        sizing: "Tailored fit. Size up for relaxed fit.",
        sustainability: "Made from premium deadstock fabrics from renowned fashion houses.",
        variants: [
            { color: "Light Blue", slug: "light-blue-polo" },
            { color: "Navy", slug: "navy-polo" },
            { color: "Red", slug: "red-polo" }
        ],
        details: [
            "Egyptian cotton piqué",
            "Refined collar design",
            "Ribbed collar and cuffs",
            "Signature embroidery",
            "Available in XS-XXL"
        ],
        images: [
            "/images/products/polo-navy.png"
        ],
        isFeatured: false
    },
    {
        name: "Red Polo",
        slug: "red-polo",
        price: 220,
        description: "Distinctive red polo in fine Egyptian cotton piqué. Bold color with sophisticated design.",
        image: "/images/products/polo-red.png",
        category: "Polo",
        composition: "100% Egyptian Cotton Piqué",
        care: "Machine wash cold. Tumble dry low. Iron medium heat.",
        sizing: "Tailored fit. Size up for relaxed fit.",
        sustainability: "Made from premium deadstock fabrics from renowned fashion houses.",
        variants: [
            { color: "Light Blue", slug: "light-blue-polo" },
            { color: "Navy", slug: "navy-polo" },
            { color: "Red", slug: "red-polo" }
        ],
        details: [
            "Egyptian cotton piqué",
            "Refined collar design",
            "Ribbed collar and cuffs",
            "Signature embroidery",
            "Available in XS-XXL"
        ],
        images: [
            "/images/products/polo-red.png"
        ],
        isFeatured: false
    },

    // Pullovers
    {
        name: "Light Blue Pullover",
        slug: "light-blue-pullover",
        price: 320,
        description: "Luxurious pullover in premium cashmere blend. Exceptional softness and warmth. Timeless design for lasting elegance.",
        image: "/images/products/pull-light-blue.png",
        category: "Pullover",
        composition: "80% Cashmere, 20% Silk",
        care: "Hand wash cold or dry clean. Lay flat to dry.",
        sizing: "True to size. Model wears size M.",
        sustainability: "Crafted from deadstock luxury yarns sourced from Italian mills.",
        variants: [
            { color: "Light Blue", slug: "light-blue-pullover" },
            { color: "Navy", slug: "navy-pullover" },
            { color: "Red", slug: "red-pullover" }
        ],
        details: [
            "Premium cashmere blend",
            "Italian luxury yarns",
            "Crew neck design",
            "Ribbed cuffs and hem",
            "Available in XS-XXL"
        ],
        images: [
            "/images/products/pull-light-blue.png"
        ],
        isFeatured: true
    },
    {
        name: "Navy Pullover",
        slug: "navy-pullover",
        price: 320,
        description: "Refined navy pullover in premium cashmere blend. Ultimate luxury and comfort in a timeless silhouette.",
        image: "/images/products/pull-navy.png",
        category: "Pullover",
        composition: "80% Cashmere, 20% Silk",
        care: "Hand wash cold or dry clean. Lay flat to dry.",
        sizing: "True to size. Model wears size M.",
        sustainability: "Crafted from deadstock luxury yarns sourced from Italian mills.",
        variants: [
            { color: "Light Blue", slug: "light-blue-pullover" },
            { color: "Navy", slug: "navy-pullover" },
            { color: "Red", slug: "red-pullover" }
        ],
        details: [
            "Premium cashmere blend",
            "Italian luxury yarns",
            "Crew neck design",
            "Ribbed cuffs and hem",
            "Available in XS-XXL"
        ],
        images: [
            "/images/products/pull-navy.png"
        ],
        isFeatured: true
    },
    {
        name: "Red Pullover",
        slug: "red-pullover",
        price: 320,
        description: "Sophisticated red pullover in premium cashmere blend. Bold statement piece with uncompromising quality.",
        image: "/images/products/pull-red.png",
        category: "Pullover",
        composition: "80% Cashmere, 20% Silk",
        care: "Hand wash cold or dry clean. Lay flat to dry.",
        sizing: "True to size. Model wears size M.",
        sustainability: "Crafted from deadstock luxury yarns sourced from Italian mills.",
        variants: [
            { color: "Light Blue", slug: "light-blue-pullover" },
            { color: "Navy", slug: "navy-pullover" },
            { color: "Red", slug: "red-pullover" }
        ],
        details: [
            "Premium cashmere blend",
            "Italian luxury yarns",
            "Crew neck design",
            "Ribbed cuffs and hem",
            "Available in XS-XXL"
        ],
        images: [
            "/images/products/pull-red.png"
        ],
        isFeatured: false
    }
];

console.log('Formal Luxury Product Data');
console.log('===========================');
console.log(JSON.stringify(products, null, 2));
console.log('\n\nTo import these products:');
console.log('1. Delete existing products via admin panel: http://localhost:5173/admin/products');
console.log('2. Use the admin panel to create each product manually, or');
console.log('3. POST each product to http://localhost:3000/api/products using the API');
