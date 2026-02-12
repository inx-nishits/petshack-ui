"use client";

import Link from "next/link";

export const Logo = ({ className = "" }: { className?: string }) => {
    return (
        <Link href="/" className={`flex items-center gap-2 ${className}`}>
            <div className="relative h-9 xl:h-12 shrink-0">
                <img
                    src="/assets/web-logo.png"
                    alt="Petshack Logo"
                    className="h-full w-auto object-contain"
                    onError={(e) => {
                        // Fallback to text if image fails
                        e.currentTarget.style.display = 'none';
                        const parent = e.currentTarget.parentElement;
                        if (parent) {
                            parent.classList.add('flex', 'items-baseline', 'font-black', 'text-2xl');
                            if (!parent.querySelector('.fallback-text')) {
                                const span1 = document.createElement('span');
                                span1.className = 'text-foreground fallback-text';
                                span1.innerText = 'Pet';
                                const span2 = document.createElement('span');
                                span2.className = 'text-primary fallback-text';
                                span2.innerText = 'Shack';
                                parent.appendChild(span1);
                                parent.appendChild(span2);
                            }
                        }
                    }}
                />
            </div>
        </Link>
    );
};

