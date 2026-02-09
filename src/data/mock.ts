import { Product, Retailer, BlogPost } from '@/types';

export const RETAILERS: Retailer[] = [
    { id: 'petbarn', name: 'Petbarn', logo: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=200' },
    { id: 'petstock', name: 'PETstock', logo: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=200' },
    { id: 'petcircle', name: 'Pet Circle', logo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=200' },
    { id: 'budgetpetproducts', name: 'Budget Pet Products', logo: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=200' },
    { id: 'mypetwarehouse', name: 'My Pet Warehouse', logo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=200' },
];

export const PRODUCTS: Product[] = [
    {
        id: '1',
        sku: 'ROYAL-CANIN-DOG-12KG',
        name: 'Royal Canin Medium Adult Dry Dog Food',
        brand: 'Royal Canin',
        category: 'Food',
        animalType: 'dog',
        description: 'Complete feed for adult medium breed dogs (from 11 to 25 kg) - From 12 months to 7 years old.',
        image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=800',
        attributes: { 'Age Range': 'Adult', 'Weight': '12kg' },
        offers: [
            { retailerId: 'petcircle', price: 108.99, currency: 'USD', stockStatus: 'in-stock', url: '#', lastUpdated: '2026-02-09' },
            { retailerId: 'petbarn', price: 115.99, currency: 'USD', stockStatus: 'in-stock', url: '#', lastUpdated: '2026-02-09' },
        ],
        bestPrice: 108.99,
        bestOffer: {
            shippingPrice: 9.99,
            stockStatus: 'In Stock',
            retailerName: 'Pet Circle',
            retailerLogo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=200',
            offerUrl: '#'
        }
    },
    {
        id: '2',
        sku: 'NEXGARD-SPECTRA-6PK',
        name: 'NexGard Spectra for Dogs (15.1-30kg) 6 Chews',
        brand: 'NexGard',
        category: 'Flea & Tick',
        animalType: 'dog',
        description: 'The most complete protection against fleas, ticks, heartworm, and intestinal worms.',
        image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?q=80&w=800',
        attributes: { 'Pack Size': '6 Chews', 'Weight': '15.1-30kg' },
        offers: [
            { retailerId: 'budgetpetproducts', price: 94.89, currency: 'USD', stockStatus: 'in-stock', url: '#', lastUpdated: '2026-02-09' },
        ],
        bestPrice: 94.89,
        bestOffer: {
            shippingPrice: 0.00,
            stockStatus: 'In Stock',
            retailerName: 'Budget Pet Products',
            retailerLogo: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=200',
            offerUrl: '#'
        }
    },
    {
        id: '3',
        sku: 'HILLS-SD-SENSITIVE-12KG',
        name: "Hill's Science Diet Adult Sensitive Stomach & Skin",
        brand: "Hill's Science Diet",
        category: 'Food',
        animalType: 'dog',
        description: 'Provides optimal digestive health while nourishing skin.',
        image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=800',
        attributes: { 'Diet': 'Sensitive', 'Weight': '12kg' },
        offers: [
            { retailerId: 'petstock', price: 112.09, currency: 'USD', stockStatus: 'in-stock', url: '#', lastUpdated: '2026-02-09' },
        ],
        bestPrice: 112.09,
        bestOffer: {
            shippingPrice: 5.95,
            stockStatus: 'In Stock',
            retailerName: 'PETstock',
            retailerLogo: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?q=80&w=200',
            offerUrl: '#'
        }
    },
    {
        id: '4',
        sku: 'BRAVECTO-DOG-LG-2PK',
        name: 'Bravecto Flea & Tick Chew for Large Dogs (20-40kg)',
        brand: 'Bravecto',
        category: 'Flea & Tick',
        animalType: 'dog',
        description: 'Just one tasty chew provides 3 months of protection.',
        image: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?q=80&w=800',
        attributes: { 'Pack Size': '2 Chews', 'Weight': '20-40kg' },
        offers: [
            { retailerId: 'mypetwarehouse', price: 89.95, currency: 'USD', stockStatus: 'in-stock', url: '#', lastUpdated: '2026-02-09' },
        ],
        bestPrice: 89.95,
        bestOffer: {
            shippingPrice: 7.99,
            stockStatus: 'In Stock',
            retailerName: 'My Pet Warehouse',
            retailerLogo: 'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?q=80&w=200',
            offerUrl: '#'
        }
    },
    {
        id: '5',
        sku: 'BLACK-HAWK-ADULT-20KG',
        name: 'Black Hawk Adult Chicken & Rice Dog Food',
        brand: 'Black Hawk',
        category: 'Food',
        animalType: 'dog',
        description: 'Australian made, hormone-free chicken and rice formula.',
        image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=800',
        attributes: { 'Origin': 'Australia', 'Weight': '20kg' },
        offers: [
            { retailerId: 'budgetpetproducts', price: 118.50, currency: 'USD', stockStatus: 'in-stock', url: '#', lastUpdated: '2026-02-09' },
        ],
        bestPrice: 118.50,
        bestOffer: {
            shippingPrice: 0.00,
            stockStatus: 'In Stock',
            retailerName: 'Budget Pet Products',
            retailerLogo: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?q=80&w=200',
            offerUrl: '#'
        }
    },
    {
        id: '6',
        sku: 'FELIWAY-OPTIMUM-KIT',
        name: 'Feliway Optimum Diffuser Starter Kit',
        brand: 'Feliway',
        category: 'Health',
        animalType: 'cat',
        description: 'New pheromone discovery for enhanced soothing.',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=800',
        attributes: { 'Life Stage': 'All Cats', 'Duration': '30 Days' },
        offers: [
            { retailerId: 'petcircle', price: 62.99, currency: 'USD', stockStatus: 'in-stock', url: '#', lastUpdated: '2026-02-09' },
        ],
        bestPrice: 62.99,
        bestOffer: {
            shippingPrice: 6.95,
            stockStatus: 'Low Stock',
            retailerName: 'Pet Circle',
            retailerLogo: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=200',
            offerUrl: '#'
        }
    }
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: '1',
        title: 'Mastering the Hunt: How to Save $300+ a Year on Premium Dog Food',
        excerpt: 'With premium pet food prices rising across Australia, we show you how to use price comparison, bulk ordering, and the best delivery cycles to keep your budget in check.',
        content: `Premium pet food is a significant expense for Aussie pet parents...`,
        image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800',
        author: 'Sarah Jenkins',
        date: '2026-02-01',
        category: 'Money Saving',
    },
    {
        id: '2',
        title: 'NexGard vs Bravecto: The Ultimate 2026 Australian Value Guide',
        excerpt: 'We analyze the cost-per-month of Australia\'s leading flea, tick, and worming treatments to help you choose the best protection for your best mate.',
        content: `Protecting your dog from paralysis ticks and heartworm...`,
        image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
        author: 'Dr. Mike Thorne',
        date: '2026-02-05',
        category: 'Health',
    },
    {
        id: '3',
        title: 'The Best Scent-Free Cat Litters for Apartment Living',
        excerpt: 'Living in a small space? We compared the top-selling Aussie cat litters for odor control, tracking, and overall value.',
        content: `Apartment living with a cat...`,
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
        author: 'Emily Chen',
        date: '2026-02-08',
        category: 'Lifestyle',
    },
    {
        id: '4',
        title: 'Puppy Socialization in the Digital Age: Where to Start?',
        excerpt: 'Getting your new pup ready for the world is more than just park visits. We explore the best socialization spots in Sydney and Melbourne.',
        content: 'Socialization is the most important part of early puppy development...',
        image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800',
        author: 'Tom Barker',
        date: '2026-02-10',
        category: 'Training',
    },
    {
        id: '5',
        title: '7 Signs Your Senior Dog Needs a Diet Change',
        excerpt: 'As our best mates get older, their nutritional needs shift. Learn how to spot the signs and which senior-specific brands offer the best value.',
        content: 'Your dog\'s metabolism changes significantly after the age of 7...',
        image: 'https://images.unsplash.com/photo-1534361960057-19889db9621e?w=800',
        author: 'Dr. Sarah Wilson',
        date: '2026-02-12',
        category: 'Senior Care',
    },
    {
        id: '6',
        title: 'Raw vs Kibble: The Cost Breakdown for Aussie Families',
        excerpt: 'We do the math on the two most popular feeding methods to find the perfect balance between pet health and bank balance.',
        content: 'Feeding your pet doesn\'t have to be a choice between health and wealth...',
        image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=800',
        author: 'James Baxter',
        date: '2026-02-15',
        category: 'Money Saving',
    }
];
