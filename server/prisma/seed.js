import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const products = [
    {
        slug: 'coral-hoodie',
        name: 'Coral Fleece Hoodie',
        price: '€280',
        discount: 15,
        image: '/images/red_hoodie.png',
        images: ['/images/red_hoodie.png', '/images/red_hoodie_male.png'],
        description: 'A premium fleece half-zip hoodie in a vibrant coral colorway. Crafted from upcycled luxury deadstock fabric, featuring the signature TÊTU embroidery. This piece combines comfort with conscious design.',
        details: [
            'Premium fleece construction',
            'Half-zip closure',
            'Ribbed collar, cuffs, and hem',
            'TÊTU embroidered logo',
            'Upcycled luxury deadstock fabric',
            'Includes unique NFT certificate'
        ],
        composition: '100% Upcycled Polyester Fleece',
        care: 'Machine wash cold, tumble dry low',
        sizing: 'Model is 6\'0" wearing size M. Fits true to size with a relaxed fit.',
        sustainability: 'This garment is made from deadstock fabric sourced from luxury fashion houses, preventing waste and reducing environmental impact.',
        variants: [
            { slug: 'coral-hoodie', color: '#FF7F50', name: 'Coral' },
            { slug: 'slate-hoodie', color: '#708090', name: 'Slate' },
            { slug: 'camel-hoodie', color: '#C19A6B', name: 'Camel' },
            { slug: 'charcoal-hoodie', color: '#36454F', name: 'Charcoal' },
            { slug: 'beige-hoodie', color: '#D4C5B0', name: 'Beige' }
        ]
    },
    {
        slug: 'slate-hoodie',
        name: 'Slate Fleece Hoodie',
        price: '€280',
        image: '/images/blue_hoodie.png',
        images: ['/images/blue_hoodie.png'],
        description: 'A premium fleece half-zip hoodie in a sophisticated slate blue colorway. Crafted from upcycled luxury deadstock fabric, featuring the signature TÊTU embroidery. This piece combines comfort with conscious design.',
        details: [
            'Premium fleece construction',
            'Half-zip closure',
            'Ribbed collar, cuffs, and hem',
            'TÊTU embroidered logo',
            'Upcycled luxury deadstock fabric',
            'Includes unique NFT certificate'
        ],
        composition: '100% Upcycled Polyester Fleece',
        care: 'Machine wash cold, tumble dry low',
        sizing: 'Model is 6\'0" wearing size M. Fits true to size with a relaxed fit.',
        sustainability: 'This garment is made from deadstock fabric sourced from luxury fashion houses, preventing waste and reducing environmental impact.',
        variants: [
            { slug: 'coral-hoodie', color: '#FF7F50', name: 'Coral' },
            { slug: 'slate-hoodie', color: '#708090', name: 'Slate' },
            { slug: 'camel-hoodie', color: '#C19A6B', name: 'Camel' },
            { slug: 'charcoal-hoodie', color: '#36454F', name: 'Charcoal' },
            { slug: 'beige-hoodie', color: '#D4C5B0', name: 'Beige' }
        ]
    },
    {
        slug: 'camel-hoodie',
        name: 'Camel Fleece Hoodie',
        price: '€280',
        image: '/images/camel_hoodie_model.png',
        images: ['/images/camel_hoodie_model.png'],
        description: 'A premium fleece half-zip hoodie in a warm camel colorway. Crafted from upcycled luxury deadstock fabric, featuring the signature TÊTU embroidery. This piece combines comfort with conscious design.',
        details: [
            'Premium fleece construction',
            'Half-zip closure',
            'Ribbed collar, cuffs, and hem',
            'TÊTU embroidered logo',
            'Upcycled luxury deadstock fabric',
            'Includes unique NFT certificate'
        ],
        composition: '100% Upcycled Polyester Fleece',
        care: 'Machine wash cold, tumble dry low',
        sizing: 'Model is 6\'0" wearing size M. Fits true to size with a relaxed fit.',
        sustainability: 'This garment is made from deadstock fabric sourced from luxury fashion houses, preventing waste and reducing environmental impact.',
        variants: [
            { slug: 'coral-hoodie', color: '#FF7F50', name: 'Coral' },
            { slug: 'slate-hoodie', color: '#708090', name: 'Slate' },
            { slug: 'camel-hoodie', color: '#C19A6B', name: 'Camel' },
            { slug: 'charcoal-hoodie', color: '#36454F', name: 'Charcoal' },
            { slug: 'beige-hoodie', color: '#D4C5B0', name: 'Beige' }
        ]
    },
    {
        slug: 'charcoal-hoodie',
        name: 'Charcoal Fleece Hoodie',
        price: '€280',
        image: '/images/charcoal_hoodie_model.png',
        images: ['/images/charcoal_hoodie_model.png'],
        description: 'A premium fleece half-zip hoodie in a deep charcoal grey colorway. Crafted from upcycled luxury deadstock fabric, featuring the signature TÊTU embroidery. This piece combines comfort with conscious design.',
        details: [
            'Premium fleece construction',
            'Half-zip closure',
            'Ribbed collar, cuffs, and hem',
            'TÊTU embroidered logo',
            'Upcycled luxury deadstock fabric',
            'Includes unique NFT certificate'
        ],
        composition: '100% Upcycled Polyester Fleece',
        care: 'Machine wash cold, tumble dry low',
        sizing: 'Model is 6\'0" wearing size M. Fits true to size with a relaxed fit.',
        sustainability: 'This garment is made from deadstock fabric sourced from luxury fashion houses, preventing waste and reducing environmental impact.',
        variants: [
            { slug: 'coral-hoodie', color: '#FF7F50', name: 'Coral' },
            { slug: 'slate-hoodie', color: '#708090', name: 'Slate' },
            { slug: 'camel-hoodie', color: '#C19A6B', name: 'Camel' },
            { slug: 'charcoal-hoodie', color: '#36454F', name: 'Charcoal' },
            { slug: 'beige-hoodie', color: '#D4C5B0', name: 'Beige' }
        ]
    },
    {
        slug: 'beige-hoodie',
        name: 'Beige Fleece Hoodie',
        price: '€280',
        image: '/images/beige_hoodie_model_2.png',
        images: ['/images/beige_hoodie_model_2.png'],
        description: 'A premium fleece half-zip hoodie in a refined beige colorway with navy blue accents. Crafted from upcycled luxury deadstock fabric, featuring the signature red TÊTU embroidery. This piece combines comfort with conscious design.',
        details: [
            'Premium fleece construction',
            'Half-zip closure',
            'Navy blue ribbed collar, cuffs, and hem',
            'Red TÊTU embroidered logo',
            'Upcycled luxury deadstock fabric',
            'Includes unique NFT certificate'
        ],
        composition: '100% Upcycled Polyester Fleece',
        care: 'Machine wash cold, tumble dry low',
        sizing: 'Model is 6\'0" wearing size M. Fits true to size with a relaxed fit.',
        sustainability: 'This garment is made from deadstock fabric sourced from luxury fashion houses, preventing waste and reducing environmental impact.',
        variants: [
            { slug: 'coral-hoodie', color: '#FF7F50', name: 'Coral' },
            { slug: 'slate-hoodie', color: '#708090', name: 'Slate' },
            { slug: 'camel-hoodie', color: '#C19A6B', name: 'Camel' },
            { slug: 'charcoal-hoodie', color: '#36454F', name: 'Charcoal' },
            { slug: 'beige-hoodie', color: '#D4C5B0', name: 'Beige' }
        ]
    }
];

async function main() {
    console.log('Start seeding ...');
    for (const p of products) {
        const product = await prisma.product.upsert({
            where: { slug: p.slug },
            update: {},
            create: {
                slug: p.slug,
                name: p.name,
                price: p.price,
                discount: p.discount || 0,
                image: p.image,
                description: p.description,
                composition: p.composition,
                care: p.care,
                sizing: p.sizing,
                sustainability: p.sustainability,
                details: {
                    create: p.details.map(d => ({ text: d }))
                },
                variants: {
                    create: p.variants
                },
                images: {
                    create: p.images ? p.images.map(url => ({ url })) : []
                }
            },
        });
        console.log(`Created product with id: ${product.id}`);
    }
    console.log('Seeding finished.');
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
