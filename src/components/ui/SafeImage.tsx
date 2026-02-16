"use client";

import { useState, useEffect } from "react";
import { ImageOff } from "lucide-react";

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}

export const SafeImage = ({ src, alt, className, fallbackSrc = "/assets/placeholder.png", ...props }: SafeImageProps) => {
    const [error, setError] = useState(false);
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src);
        setError(false);
    }, [src]);

    const handleError = () => {
        setError(true);
        if (fallbackSrc) {
            setImgSrc(fallbackSrc);
        }
    };

    if (error && !fallbackSrc) {
        return (
            <div className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}>
                <ImageOff className="w-6 h-6" />
            </div>
        );
    }

    return (
        <img
            src={imgSrc}
            alt={alt}
            className={className}
            onError={handleError}
            {...props}
        />
    );
};
