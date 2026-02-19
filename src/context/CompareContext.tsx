"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types';
import { useModal } from './ModalContext';

// SOW: Maximum 4 products for comparison
const MAX_COMPARE = 4;

interface CompareContextType {
    compareList: Product[];
    addToCompare: (product: Product) => void;
    removeFromCompare: (productId: string) => void;
    isInCompare: (productId: string) => boolean;
    clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export const CompareProvider = ({ children }: { children: ReactNode }) => {
    const [compareList, setCompareList] = useState<Product[]>([]);
    const { showAlert } = useModal();

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('petshack_compare');
        if (saved) {
            try {
                setCompareList(JSON.parse(saved));
            } catch (e) {
                console.error("Failed to parse compare list", e);
            }
        }
    }, []);

    // Save to local storage on change
    useEffect(() => {
        localStorage.setItem('petshack_compare', JSON.stringify(compareList));
    }, [compareList]);

    const addToCompare = (product: Product) => {
        if (compareList.length >= MAX_COMPARE) {
            showAlert(`You can compare up to ${MAX_COMPARE} products. Remove an item to add a new one.`, "Comparison Limit");
            return;
        }
        if (!compareList.find(p => p.id === product.id)) {
            setCompareList([...compareList, product]);
        }
    };

    const removeFromCompare = (productId: string) => {
        setCompareList(compareList.filter(p => p.id !== productId));
    };

    const isInCompare = (productId: string) => {
        return compareList.some(p => p.id === productId);
    };

    const clearCompare = () => {
        setCompareList([]);
    };

    return (
        <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
            {children}
        </CompareContext.Provider>
    );
};

export const useCompare = () => {
    const context = useContext(CompareContext);
    if (context === undefined) {
        throw new Error('useCompare must be used within a CompareProvider');
    }
    return context;
};
