"use client";

interface AdBannerProps {
    className?: string;
    label?: string;
}

export const AdBanner = ({ className = "", label = "Advertisement" }: AdBannerProps) => {
    return (
        <div className={`w-full bg-surface border border-dashed border-border rounded-3xl p-8 flex flex-col items-center justify-center text-center group hover:bg-white transition-colors duration-300 ${className}`}>
            <div className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-light mb-4 bg-white/50 px-3 py-1 rounded-full border border-border">
                {label}
            </div>
            <div className="w-full max-w-2xl">
                <h4 className="text-xl font-black text-muted-light mb-2 group-hover:text-primary transition-colors">Premium Brand Placement Slot</h4>
                <p className="text-sm text-muted">Contact PetShack for direct brand partnerships and banner advertising.</p>
            </div>

            {/* Decorative Grid Pattern */}
            <div className="mt-8 grid grid-cols-4 gap-4 w-full opacity-10 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-12 bg-gray-200 rounded-xl" />
                ))}
            </div>
        </div>
    );
};

