import { ChevronRight } from "lucide-react";

const STEPS = [
    {
        id: 1,
        title: "1. Search",
        description: "Use the search tool to find what your furry (or feathery) friend needs.",
        image: "/assets/step-search.png",
        bgColor: "bg-[#EFF8F8]", // Very light teal
    },
    {
        id: 2,
        title: "2. Compare",
        description: "Go through the list to compare prices from trusted Aussie stores.",
        image: "/assets/step-compare.png",
        bgColor: "bg-[#EBF2FF]", // Very light blue
    },
    {
        id: 3,
        title: "3. Click",
        description: "Select the best deal, and we'll take you directly to their product page.",
        image: "/assets/step-click.png",
        bgColor: "bg-[#F3E8FF]", // Very light purple
    },
];

export const HowItWorks = () => {
    return (
        <section className="py-[60px] lg:py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="mb-16">
                    <h2 className="text-[32px] font-black mb-4 text-foreground">How PetShack Works?</h2>
                    <p className="text-gray-500 max-w-5xl leading-relaxed text-[15px] font-medium">
                        With over 40+ pet retailers compared all in one spot, PetShack makes it easier than ever to save both time and money — because we know your pets deserve the best (and so do you!).
                    </p>
                </div>

                <div className="relative flex flex-col md:flex-row gap-6 items-center">
                    {STEPS.map((step, index) => (
                        <div key={step.id} className="flex-1 w-full flex items-center gap-4">
                            <div className={`${step.bgColor} rounded-[2.5rem] p-10 flex flex-col items-center text-center w-full min-h-[420px] shadow-sm transition-transform hover:-translate-y-1`}>
                                <h3 className="text-xl font-black mb-8 text-foreground">{step.title}</h3>

                                <div className="relative w-40 h-40 mb-10">
                                    <img
                                        src={step.image}
                                        alt={step.title}
                                        className="w-full h-full object-contain"
                                    />
                                </div>

                                <p className="text-foreground leading-relaxed font-bold text-[14px] px-2 max-w-[220px]">
                                    {step.description}
                                </p>
                            </div>

                            {/* Arrow between boxes - only on desktop and not for the last item */}
                            {index < STEPS.length - 1 && (
                                <div className="hidden lg:block text-gray-300">
                                    <ChevronRight className="w-6 h-6" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
