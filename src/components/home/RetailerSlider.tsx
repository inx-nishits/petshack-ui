import React from 'react';

const RETAILERS = [
    { name: 'Pet Circle', logo: '/assets/stores-logo/pet-circle.webp' },
    { name: 'Petbarn', logo: '/assets/stores-logo/petbarn.webp' },
    { name: 'PETstock', logo: '/assets/stores-logo/petstock.webp' },
    { name: 'Budget Pet Products', logo: '/assets/stores-logo/budget-pet-products.webp' },
    { name: 'The Animal Pharmacy', logo: '/assets/stores-logo/theanimalpharmacy.webp' },
    { name: 'The Vet Shed', logo: '/assets/stores-logo/thevetshed.webp' },
    { name: 'Vet-n-Pet Direct', logo: '/assets/stores-logo/vet-n-pet-direct.webp' },
    { name: 'My Pet Warehouse', logo: '/assets/stores-logo/mpw.webp' },
    { name: 'Petchemist', logo: '/assets/stores-logo/petchemist.webp' },
    { name: 'Lucky Pet', logo: '/assets/stores-logo/luckypet.webp' },
    { name: 'Pet City', logo: '/assets/stores-logo/petcity.webp' },
    { name: 'Pet O', logo: '/assets/stores-logo/peto.webp' },
    { name: 'RSPCA', logo: '/assets/stores-logo/rspca.webp' },
    { name: 'Pet Station', logo: '/assets/stores-logo/petstation.webp' },
    { name: 'Petso', logo: '/assets/stores-logo/petso.webp' },
];

export const RetailerSlider = () => {
    // Triple the list to ensure a smooth infinite scroll
    const scrollingList = [...RETAILERS, ...RETAILERS, ...RETAILERS];

    return (
        <section className="py-6 bg-white overflow-hidden border-b border-gray-50 relative z-10">
            <div className="relative flex overflow-x-hidden">
                <div className="flex animate-marquee whitespace-nowrap items-center py-4">
                    {scrollingList.map((retailer, index) => (
                        <div
                            key={index}
                            className="mx-10 lg:mx-16 flex items-center justify-center group cursor-default h-12 lg:h-16 shrink-0"
                        >
                            <img
                                src={retailer.logo}
                                alt={retailer.name}
                                title={retailer.name}
                                className="h-full w-auto object-contain transition-all duration-500 group-hover:scale-110"
                            />
                        </div>
                    ))}
                </div>

                {/* Second set for seamless loop */}
                <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap items-center h-full py-4">
                    {scrollingList.map((retailer, index) => (
                        <div
                            key={`clone-${index}`}
                            className="mx-10 lg:mx-16 flex items-center justify-center group cursor-default h-12 lg:h-16 shrink-0"
                        >
                            <img
                                src={retailer.logo}
                                alt={retailer.name}
                                title={retailer.name}
                                className="h-full w-auto object-contain transition-all duration-500 group-hover:scale-110"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

