import { Product, Retailer, BlogPost } from '@/types';

export const RETAILERS: Retailer[] = [
    { id: 'petcircle', name: 'Pet Circle', logo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=200', rating: 4.8 },
    { id: 'petbarn', name: 'Petbarn', logo: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200', rating: 4.7 },
    { id: 'budgetpetproducts', name: 'Budget Pet Products', logo: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=200', rating: 4.6 },
    { id: 'petstock', name: 'PETstock', logo: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=200', rating: 4.5 },
    { id: 'mypetwarehouse', name: 'My Pet Warehouse', logo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=200', rating: 4.4 },
];

export const PRODUCTS: Product[] = [
    {
        id: '1',
        sku: 'RC-MED-ADULT-15KG',
        name: 'Royal Canin Medium Adult Dog Food 15kg',
        brand: 'Royal Canin',
        category: 'Food',
        animalType: 'dog',
        lifeStage: 'Adult',
        description: 'Complete feed for adult medium breed dogs (from 11 to 25 kg) - From 12 months to 7 years old.',
        image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800',
        attributes: { 'Age Range': 'Adult', 'Weight': '15kg', 'Breed Size': 'Medium' },
        offers: [
            { retailerId: 'petcircle', price: 108.99, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petcircle.com.au/', lastUpdated: '2026-02-15T10:00:00Z', discount: '10% OFF' },
            { retailerId: 'petbarn', price: 115.99, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petbarn.com.au/', lastUpdated: '2026-02-14T08:30:00Z' },
            { retailerId: 'petstock', price: 112.50, currency: 'USD', stockStatus: 'in-stock', shippingCost: 5.99, url: 'https://www.petstock.com.au/', lastUpdated: '2026-02-16T09:00:00Z' }
        ],
        bestPrice: 108.99,
        bestOffer: {
            shippingPrice: 0,
            stockStatus: 'In Stock',
            retailerName: 'Pet Circle',
            retailerLogo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=200',
            offerUrl: 'https://www.petcircle.com.au/'
        }
    },
    {
        id: '2',
        sku: 'NEXGARD-SPECTRA-6PK',
        name: 'NexGard Spectra for Dogs (15.1-30kg) 6 Chews',
        brand: 'NexGard',
        category: 'Healthcare',
        animalType: 'dog',
        lifeStage: 'All Ages',
        description: 'The most complete protection against fleas, ticks, heartworm, and intestinal worms.',
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800',
        attributes: { 'Pack Size': '6 Chews', 'Weight': '15.1-30kg' },
        offers: [
            { retailerId: 'budgetpetproducts', price: 94.89, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.budgetpetproducts.com.au/', lastUpdated: '2026-02-16T09:15:00Z' },
            { retailerId: 'petcircle', price: 99.99, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petcircle.com.au/', lastUpdated: '2026-02-16T10:00:00Z' },
        ],
        bestPrice: 94.89,
        bestOffer: {
            shippingPrice: 0,
            stockStatus: 'In Stock',
            retailerName: 'Budget Pet Products',
            retailerLogo: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=200',
            offerUrl: 'https://www.budgetpetproducts.com.au/'
        }
    },
    {
        id: '3',
        sku: 'HILLS-SENSITIVE-12KG',
        name: 'Hills Science Diet Adult Sensitive Stomach & Skin 12kg',
        brand: "Hill's Science Diet",
        category: 'Food',
        animalType: 'dog',
        lifeStage: 'Adult',
        description: 'Provides optimal digestive health while nourishing skin.',
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800',
        attributes: { 'Diet': 'Sensitive', 'Weight': '12kg' },
        offers: [
            { retailerId: 'petstock', price: 112.09, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petstock.com.au/', lastUpdated: '2026-02-12T14:20:00Z' },
            { retailerId: 'mypetwarehouse', price: 109.50, currency: 'USD', stockStatus: 'out-of-stock', shippingCost: 0, url: 'https://www.mypetwarehouse.com.au/', lastUpdated: '2026-02-15T11:00:00Z' }
        ],
        bestPrice: 109.50, // Note: Logic would typically exclude OOS, but keeping simple for mock
        bestOffer: {
            shippingPrice: 0.00,
            stockStatus: 'Out of Stock',
            retailerName: 'My Pet Warehouse',
            retailerLogo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=200',
            offerUrl: 'https://www.mypetwarehouse.com.au/'
        }
    },
    {
        id: '4',
        sku: 'BRAVECTO-DOG-LG-2PK',
        name: 'Bravecto Flea & Tick Chew for Large Dogs (20-40kg)',
        brand: 'Bravecto',
        category: 'Healthcare',
        animalType: 'dog',
        lifeStage: 'All Ages',
        description: 'Just one tasty chew provides 3 months of protection.',
        image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800',
        attributes: { 'Pack Size': '2 Chews', 'Weight': '20-40kg' },
        offers: [
            { retailerId: 'mypetwarehouse', price: 89.95, currency: 'USD', stockStatus: 'in-stock', shippingCost: 6.95, url: 'https://www.mypetwarehouse.com.au/', lastUpdated: '2026-02-15T11:00:00Z' },
            { retailerId: 'petcircle', price: 92.00, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petcircle.com.au/', lastUpdated: '2026-02-16T08:00:00Z' }
        ],
        bestPrice: 89.95,
        bestOffer: {
            shippingPrice: 6.95,
            stockStatus: 'In Stock',
            retailerName: 'My Pet Warehouse',
            retailerLogo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=200',
            offerUrl: 'https://www.mypetwarehouse.com.au/'
        }
    },
    {
        id: '5',
        sku: 'BH-ADULT-CHICKEN-20KG',
        name: 'Black Hawk Adult Chicken & Rice 20kg',
        brand: 'Black Hawk',
        category: 'Food',
        animalType: 'dog',
        lifeStage: 'Adult',
        description: 'Australian made, hormone-free chicken and rice formula.',
        image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800',
        attributes: { 'Origin': 'Australia', 'Weight': '20kg' },
        offers: [
            { retailerId: 'budgetpetproducts', price: 118.50, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.budgetpetproducts.com.au/', lastUpdated: '2026-02-16T08:00:00Z' },
            { retailerId: 'petbarn', price: 125.99, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petbarn.com.au/', lastUpdated: '2026-02-16T12:00:00Z' }
        ],
        bestPrice: 118.50,
        bestOffer: {
            shippingPrice: 0.00,
            stockStatus: 'In Stock',
            retailerName: 'Budget Pet Products',
            retailerLogo: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=200',
            offerUrl: 'https://www.budgetpetproducts.com.au/'
        }
    },
    {
        id: '6',
        sku: 'FELIWAY-OPTIMUM-KIT',
        name: 'Feliway Optimum Diffuser Starter Kit',
        brand: 'Feliway',
        category: 'Healthcare',
        animalType: 'cat',
        lifeStage: 'All Ages',
        description: 'New pheromone discovery for enhanced soothing.',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800',
        attributes: { 'Life Stage': 'All Cats', 'Duration': '30 Days' },
        offers: [
            { retailerId: 'petcircle', price: 62.99, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petcircle.com.au/', lastUpdated: '2026-02-10T15:30:00Z' },
            { retailerId: 'petstock', price: 65.00, currency: 'USD', stockStatus: 'in-stock', shippingCost: 5.95, url: 'https://www.petstock.com.au/', lastUpdated: '2026-02-16T09:00:00Z' }
        ],
        bestPrice: 62.99,
        bestOffer: {
            shippingPrice: 0.00,
            stockStatus: 'In Stock',
            retailerName: 'Pet Circle',
            retailerLogo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=200',
            offerUrl: 'https://www.petcircle.com.au/'
        }
    },
    // New Products to match SOW Coverage (Fish, Birds, Small Animals, Accessories, Toys)
    {
        id: '7',
        sku: 'TETRA-GOLDFISH-FLAKES',
        name: 'Tetra Goldfish Flakes 200g',
        brand: 'Tetra',
        category: 'Food',
        animalType: 'fish',
        lifeStage: 'All Ages',
        description: 'Complete flake food for all goldfish and coldwater fish.',
        image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=800',
        attributes: { 'Type': 'Flakes', 'Weight': '200g' },
        offers: [
            { retailerId: 'petbarn', price: 18.99, currency: 'USD', stockStatus: 'in-stock', shippingCost: 5.00, url: 'https://www.petbarn.com.au/', lastUpdated: '2026-02-16T12:00:00Z' },
        ],
        bestPrice: 18.99,
        bestOffer: {
            shippingPrice: 5.00,
            stockStatus: 'In Stock',
            retailerName: 'Petbarn',
            retailerLogo: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200',
            offerUrl: 'https://www.petbarn.com.au/'
        }
    },
    {
        id: '8',
        sku: 'KONG-CLASSIC-MED',
        name: 'KONG Classic Dog Toy - Medium',
        brand: 'KONG',
        category: 'Toys',
        animalType: 'dog',
        lifeStage: 'Adult',
        description: 'The gold standard of dog toys. Mentally stimulating and durable.',
        image: 'https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800',
        attributes: { 'Material': 'Rubber', 'Size': 'Medium' },
        offers: [
            { retailerId: 'petcircle', price: 19.99, currency: 'USD', stockStatus: 'in-stock', shippingCost: 6.95, url: 'https://www.petcircle.com.au/', lastUpdated: '2026-02-15T09:00:00Z' },
            { retailerId: 'petstock', price: 21.00, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petstock.com.au/', lastUpdated: '2026-02-15T09:00:00Z' },
        ],
        bestPrice: 19.99,
        bestOffer: {
            shippingPrice: 6.95,
            stockStatus: 'In Stock',
            retailerName: 'Pet Circle',
            retailerLogo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=200',
            offerUrl: 'https://www.petcircle.com.au/'
        }
    },
    {
        id: '9',
        sku: 'PUPPIA-HARNESS-RED',
        name: 'Puppia Soft Dog Harness - Red (S)',
        brand: 'Puppia',
        category: 'Harness',
        animalType: 'dog',
        lifeStage: 'Puppy',
        description: 'Soft mesh dog harness for comfort and style.',
        image: 'https://images.unsplash.com/photo-1551843063-7eb58dbad3fb?q=80&w=800',
        attributes: { 'Color': 'Red', 'Size': 'Small' },
        offers: [
            { retailerId: 'petstock', price: 34.95, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petstock.com.au/', lastUpdated: '2026-02-14T16:20:00Z' }
        ],
        bestPrice: 34.95,
        bestOffer: {
            shippingPrice: 7.00,
            stockStatus: 'In Stock',
            retailerName: 'PETstock',
            retailerLogo: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=200',
            offerUrl: 'https://www.petstock.com.au/'
        }
    },
    {
        id: '10',
        sku: 'KAYTEE-TIMOTHY-HAY',
        name: 'Kaytee Timothy Hay for Small Animals',
        brand: 'Kaytee',
        category: 'Food',
        animalType: 'small-pet',
        lifeStage: 'All Ages',
        description: 'High-fiber hay essential for rabbits and guinea pigs.',
        image: 'https://images.unsplash.com/photo-1585664811087-47f65be69b48?q=80&w=800',
        attributes: { 'Type': 'Hay', 'Weight': '24oz' },
        offers: [
            { retailerId: 'mypetwarehouse', price: 15.50, currency: 'USD', stockStatus: 'in-stock', shippingCost: 5.50, url: 'https://www.mypetwarehouse.com.au/', lastUpdated: '2026-02-15T13:00:00Z' }
        ],
        bestPrice: 15.50,
        bestOffer: {
            shippingPrice: 5.50,
            stockStatus: 'In Stock',
            retailerName: 'My Pet Warehouse',
            retailerLogo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=200',
            offerUrl: 'https://www.mypetwarehouse.com.au/'
        }
    },
    {
        id: '11',
        sku: 'ZOO-MED-REPTIVITE',
        name: 'Zoo Med Reptivite Vitamins',
        brand: 'Zoo Med',
        category: 'Healthcare',
        animalType: 'reptile',
        lifeStage: 'All Ages',
        description: 'Complete vitamin complex for reptiles.',
        image: 'https://images.unsplash.com/photo-1506992120790-281df6972e39?q=80&w=800',
        attributes: { 'Type': 'Vitamins', 'Weight': '50g' },
        offers: [
            { retailerId: 'petcircle', price: 24.99, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petcircle.com.au/', lastUpdated: '2026-02-14T10:00:00Z' }
        ],
        bestPrice: 24.99,
        bestOffer: {
            shippingPrice: 9.99,
            stockStatus: 'In Stock',
            retailerName: 'Pet Circle',
            retailerLogo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=200',
            offerUrl: 'https://www.petcircle.com.au/'
        }
    },
    {
        id: '12',
        sku: 'DOG-COAT-WINTER',
        name: 'Weatherbeeta Comfitec Dog Coat',
        brand: 'Weatherbeeta',
        category: 'Clothing',
        animalType: 'dog',
        lifeStage: 'Adult',
        description: 'Waterproof and warm winter coat for dogs.',
        image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=800',
        attributes: { 'Size': '50cm', 'Features': 'Waterproof' },
        offers: [
            { retailerId: 'petbarn', price: 55.00, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petbarn.com.au/', lastUpdated: '2026-02-16T08:00:00Z' }
        ],
        bestPrice: 55.00,
        bestOffer: {
            shippingPrice: 0.00,
            stockStatus: 'In Stock',
            retailerName: 'Petbarn',
            retailerLogo: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200',
            offerUrl: 'https://www.petbarn.com.au/'
        }
    },
    {
        id: '13',
        sku: 'CAT-SCRATCHER-TALL',
        name: 'Tall Sisal Cat Scratcher Post',
        brand: 'Kazoo',
        category: 'Toys',
        animalType: 'cat',
        lifeStage: 'All Ages',
        description: 'Durable sisal wrapping to save your furniture.',
        image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?q=80&w=800',
        attributes: { 'Height': '80cm', 'Material': 'Sisal' },
        offers: [
            { retailerId: 'petstock', price: 45.99, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petstock.com.au/', lastUpdated: '2026-02-16T09:00:00Z' },
            { retailerId: 'mypetwarehouse', price: 42.50, currency: 'USD', stockStatus: 'in-stock', shippingCost: 9.95, url: 'https://www.mypetwarehouse.com.au/', lastUpdated: '2026-02-15T14:00:00Z' }
        ],
        bestPrice: 42.50,
        bestOffer: {
            shippingPrice: 9.95,
            stockStatus: 'In Stock',
            retailerName: 'My Pet Warehouse',
            retailerLogo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=200',
            offerUrl: 'https://www.mypetwarehouse.com.au/'
        }
    },
    {
        id: '14',
        sku: 'FISH-TANK-FILTER',
        name: 'Aqua One Internal Filter 100L',
        brand: 'Aqua One',
        category: 'Equipment',
        animalType: 'fish',
        lifeStage: 'All Ages',
        description: 'Quiet and efficient filtration for aquariums up to 100L.',
        image: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?q=80&w=800',
        attributes: { 'Flow Rate': '400L/hr', 'Power': '6W' },
        offers: [
            { retailerId: 'petbarn', price: 34.99, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petbarn.com.au/', lastUpdated: '2026-02-16T11:00:00Z' }
        ],
        bestPrice: 34.99,
        bestOffer: {
            shippingPrice: 0.00,
            stockStatus: 'In Stock',
            retailerName: 'Petbarn',
            retailerLogo: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200',
            offerUrl: 'https://www.petbarn.com.au/'
        }
    },
    {
        id: '15',
        sku: 'BIRD-CAGE-LARGE',
        name: 'Large Flight Bird Cage',
        brand: 'Avi One',
        category: 'Housing',
        animalType: 'bird',
        lifeStage: 'All Ages',
        description: 'Spacious flight cage suitable for budgies and cockatiels.',
        image: 'https://images.unsplash.com/photo-1552728089-57bdde30ebd1?q=80&w=800',
        attributes: { 'Dimensions': '60x40x40cm', 'Material': 'Steel' },
        offers: [
            { retailerId: 'petcircle', price: 89.99, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petcircle.com.au/', lastUpdated: '2026-02-15T16:00:00Z' }
        ],
        bestPrice: 89.99,
        bestOffer: {
            shippingPrice: 0.00,
            stockStatus: 'In Stock',
            retailerName: 'Pet Circle',
            retailerLogo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=200',
            offerUrl: 'https://www.petcircle.com.au/'
        }
    },
    {
        id: '16',
        sku: 'DOG-BED-ORTHO',
        name: 'Orthopedic Memory Foam Dog Bed (L)',
        brand: 'Snooza',
        category: 'Bedding',
        animalType: 'dog',
        lifeStage: 'Senior',
        description: 'Therapeutic comfort for older dogs with joint pain.',
        image: 'https://images.unsplash.com/photo-1541599540903-216a46ca1dc0?q=80&w=800',
        attributes: { 'Size': 'Large', 'Material': 'Memory Foam' },
        offers: [
            { retailerId: 'petstock', price: 149.00, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petstock.com.au/', lastUpdated: '2026-02-16T10:00:00Z' },
            { retailerId: 'petbarn', price: 159.99, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petbarn.com.au/', lastUpdated: '2026-02-16T12:00:00Z' }
        ],
        bestPrice: 149.00,
        bestOffer: {
            shippingPrice: 0.00,
            stockStatus: 'In Stock',
            retailerName: 'PETstock',
            retailerLogo: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=200',
            offerUrl: 'https://www.petstock.com.au/'
        }
    },
    {
        id: '17',
        sku: 'RABBIT-HUTCH-WOOD',
        name: 'Wooden Rabbit Hutch - 2 Story',
        brand: 'Bono Fido',
        category: 'Housing',
        animalType: 'small-pet',
        lifeStage: 'All Ages',
        description: 'Two-story hutch with ramp and pull-out tray for easy cleaning.',
        image: 'https://images.unsplash.com/photo-1585664811087-47f65be69b48?q=80&w=800',
        attributes: { 'Material': 'Fir Wood', 'Levels': '2' },
        offers: [
            { retailerId: 'mypetwarehouse', price: 129.00, currency: 'USD', stockStatus: 'in-stock', shippingCost: 15.00, url: 'https://www.mypetwarehouse.com.au/', lastUpdated: '2026-02-15T11:00:00Z' }
        ],
        bestPrice: 129.00,
        bestOffer: {
            shippingPrice: 15.00,
            stockStatus: 'In Stock',
            retailerName: 'My Pet Warehouse',
            retailerLogo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=200',
            offerUrl: 'https://www.mypetwarehouse.com.au/'
        }
    },
    {
        id: '18',
        sku: 'CAT-LITTER-CLUMPING',
        name: 'Ever Clean Clumping Cat Litter 10kg',
        brand: 'Ever Clean',
        category: 'Litter',
        animalType: 'cat',
        lifeStage: 'All Ages',
        description: 'Maximum odor control with activated carbon technology.',
        image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=800',
        attributes: { 'Type': 'Clumping', 'Scent': 'Unscented' },
        offers: [
            { retailerId: 'petcircle', price: 28.50, currency: 'USD', stockStatus: 'in-stock', shippingCost: 9.95, url: 'https://www.petcircle.com.au/', lastUpdated: '2026-02-16T09:00:00Z' },
            { retailerId: 'budgetpetproducts', price: 26.95, currency: 'USD', stockStatus: 'in-stock', shippingCost: 7.50, url: 'https://www.budgetpetproducts.com.au/', lastUpdated: '2026-02-16T08:30:00Z' }
        ],
        bestPrice: 26.95,
        bestOffer: {
            shippingPrice: 7.50,
            stockStatus: 'In Stock',
            retailerName: 'Budget Pet Products',
            retailerLogo: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=200',
            offerUrl: 'https://www.budgetpetproducts.com.au/'
        }
    },
    {
        id: '19',
        sku: 'DOG-LEASH-RETRACT',
        name: 'Flexi Giant Retractable Leash (8m)',
        brand: 'Flexi',
        category: 'Accessories',
        animalType: 'dog',
        lifeStage: 'Adult',
        description: 'Heavy duty retractable leash for large dogs up to 50kg.',
        image: 'https://images.unsplash.com/photo-1551843063-7eb58dbad3fb?q=80&w=800',
        attributes: { 'Length': '8m', 'Color': 'Neon' },
        offers: [
            { retailerId: 'petbarn', price: 69.99, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petbarn.com.au/', lastUpdated: '2026-02-16T12:00:00Z' }
        ],
        bestPrice: 69.99,
        bestOffer: {
            shippingPrice: 0.00,
            stockStatus: 'In Stock',
            retailerName: 'Petbarn',
            retailerLogo: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200',
            offerUrl: 'https://www.petbarn.com.au/'
        }
    },
    {
        id: '20',
        sku: 'REPTILE-HEAT-LAMP',
        name: 'Exo Terra Intense Basking Spot 75W',
        brand: 'Exo Terra',
        category: 'Heating',
        animalType: 'reptile',
        lifeStage: 'All Ages',
        description: 'Creates a basking area for thermoregulation.',
        image: 'https://images.unsplash.com/photo-1506992120790-281df6972e39?q=80&w=800',
        attributes: { 'Wattage': '75W', 'Type': 'Spot' },
        offers: [
            { retailerId: 'petcircle', price: 18.50, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petcircle.com.au/', lastUpdated: '2026-02-16T11:00:00Z' }
        ],
        bestPrice: 18.50,
        bestOffer: {
            shippingPrice: 0.00,
            stockStatus: 'In Stock',
            retailerName: 'Pet Circle',
            retailerLogo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=200',
            offerUrl: 'https://www.petcircle.com.au/'
        }
    },
    {
        id: '21',
        sku: 'HAMSTER-BALL',
        name: 'Run-About Hamster Ball Clear',
        brand: 'Super Pet',
        category: 'Toys',
        animalType: 'small-pet',
        lifeStage: 'All Ages',
        description: 'Safe exercise for hamsters and mice.',
        image: 'https://images.unsplash.com/photo-1585664811087-47f65be69b48?q=80&w=800',
        attributes: { 'Size': '7 Inch', 'Color': 'Clear' },
        offers: [
            { retailerId: 'petstock', price: 12.99, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petstock.com.au/', lastUpdated: '2026-02-16T10:00:00Z' }
        ],
        bestPrice: 12.99,
        bestOffer: {
            shippingPrice: 0.00,
            stockStatus: 'In Stock',
            retailerName: 'PETstock',
            retailerLogo: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=200',
            offerUrl: 'https://www.petstock.com.au/'
        }
    },
    {
        id: '22',
        sku: 'CAT-FOUNTAIN',
        name: 'Catit Flower Water Fountain 3L',
        brand: 'Catit',
        category: 'Bowls',
        animalType: 'cat',
        lifeStage: 'All Ages',
        description: 'Encourages your cat to drink more water. Includes filter.',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800',
        attributes: { 'Capacity': '3L', 'Power': 'USB' },
        offers: [
            { retailerId: 'budgetpetproducts', price: 39.95, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.budgetpetproducts.com.au/', lastUpdated: '2026-02-16T08:00:00Z' },
            { retailerId: 'petcircle', price: 44.99, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petcircle.com.au/', lastUpdated: '2026-02-16T09:00:00Z' }
        ],
        bestPrice: 39.95,
        bestOffer: {
            shippingPrice: 0.00,
            stockStatus: 'In Stock',
            retailerName: 'Budget Pet Products',
            retailerLogo: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?q=80&w=200',
            offerUrl: 'https://www.budgetpetproducts.com.au/'
        }
    },
    {
        id: '23',
        sku: 'DOG-POOP-BAGS',
        name: 'Earth Rated Poop Bags (120 Count)',
        brand: 'Earth Rated',
        category: 'Waste',
        animalType: 'dog',
        lifeStage: 'All Ages',
        description: 'Lavender scented, leak-proof and eco-friendly bags.',
        image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800',
        attributes: { 'Count': '120', 'Scent': 'Lavender' },
        offers: [
            { retailerId: 'petcircle', price: 14.99, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.petcircle.com.au/', lastUpdated: '2026-02-16T11:00:00Z' }
        ],
        bestPrice: 14.99,
        bestOffer: {
            shippingPrice: 0.00,
            stockStatus: 'In Stock',
            retailerName: 'Pet Circle',
            retailerLogo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=200',
            offerUrl: 'https://www.petcircle.com.au/'
        }
    },
    {
        id: '24',
        sku: 'BIRD-SEED-BUDGIE',
        name: 'Trill Budgie Seed Mix 2kg',
        brand: 'Trill',
        category: 'Food',
        animalType: 'bird',
        lifeStage: 'All Ages',
        description: 'Balanced diet for budgerigars with shell grit.',
        image: 'https://images.unsplash.com/photo-1552728089-57bdde30ebd1?q=80&w=800',
        attributes: { 'Weight': '2kg', 'Type': 'Seed Mix' },
        offers: [
            { retailerId: 'woolworths', price: 8.50, currency: 'USD', stockStatus: 'in-stock', shippingCost: 0, url: 'https://www.woolworths.com.au/', lastUpdated: '2026-02-16T10:00:00Z' }
        ],
        bestPrice: 8.50,
        bestOffer: {
            shippingPrice: 0.00,
            stockStatus: 'In Stock',
            retailerName: 'Woolworths',
            retailerLogo: '',
            offerUrl: 'https://www.woolworths.com.au/'
        }
    }
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        slug: 'best-dog-food-2024',
        title: 'Top 10 Dog Foods for Sensitive Stomachs',
        excerpt: 'We reviewed the best-selling sensitive stomach formulas from Royal Canin, Hills, and more.',
        content: 'Full article content goes here...',
        image: 'https://images.unsplash.com/photo-1589924691195-41432c84c161?q=80&w=800',
        author: 'Dr. Sarah Wilson',
        date: '2024-02-15',
        readTime: '5 min',
        tags: ['Dog Food', 'Health', 'Review']
    },
    {
        id: '2',
        slug: 'nexgard-vs-bravecto',
        title: 'NexGard vs. Bravecto: Which is Better?',
        excerpt: 'A comprehensive comparison of the two leading flea and tick treatments for Aussie dogs.',
        content: 'Full article content goes here...',
        image: 'https://images.unsplash.com/photo-1518331539958-6a566538c202?q=80&w=800',
        author: 'James Miller',
        date: '2024-02-10',
        readTime: '8 min',
        tags: ['Healthcare', 'Flea & Tick', 'Comparison']
    },
    {
        id: '3',
        slug: 'essential-cat-toys',
        title: '5 Essential Toys Your Indoor Cat Needs',
        excerpt: 'Keep your kitty happy and active with these must-have enrichment toys.',
        content: 'Full article content goes here...',
        image: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?q=80&w=800',
        author: 'Emily Chen',
        date: '2024-02-05',
        readTime: '4 min',
        tags: ['Cat', 'Toys', 'Enrichment']
    },
    {
        id: '4',
        slug: 'why-compare-pet-prices',
        title: 'Why Comparing Pet Prices Can Save You Thousands',
        excerpt: 'See the real data on price variances across Australian retailers for common pet supplies.',
        content: 'Full article content goes here...',
        image: 'https://images.unsplash.com/photo-1450778869180-41d0601e046e?q=80&w=800',
        author: 'PetShack Team',
        date: '2024-02-01',
        readTime: '3 min',
        tags: ['Savings', 'Analysis', 'Money Saving']
    }
];
