"use client";

interface AdBannerProps {
    className?: string;
    label?: string;
}

export const AdBanner = ({ className = "", label = "Advertisement" }: AdBannerProps) => {
    return (
        <div className={`w-full bg-surface border border-dashed border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center group hover:bg-white transition-colors duration-300 ${className}`}>
            <div className="inline-flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-muted-light mb-3 sm:mb-4 bg-white/50 px-2 sm:px-3 py-1 rounded-full border border-border">
                {label}
            </div>
            <div className="w-full max-w-2xl px-2">
                <h4 className="text-lg sm:text-xl font-black text-muted-light mb-1 sm:mb-2 group-hover:text-primary transition-colors">Premium Brand Placement Slot</h4>
                <p className="text-xs sm:text-sm text-muted">Contact PetShack for direct brand partnerships and banner advertising.</p>
            </div>

            {/* Decorative Grid Pattern */}
            <div className="mt-6 sm:mt-8 grid grid-cols-4 gap-2 sm:gap-4 w-full max-w-lg opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 sm:h-12 bg-gray-200 rounded-lg sm:rounded-xl" />
                ))}
            </div>
        </div>
    );
};

