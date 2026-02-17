"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { NotifyMeModal } from "@/components/ui/NotifyMeModal";

interface ModalContextType {
    openNotifyModal: (productName: string, targetPrice: number) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState<{ isOpen: boolean; productName: string; targetPrice: number }>({
        isOpen: false,
        productName: "",
        targetPrice: 0,
    });

    const openNotifyModal = (productName: string, targetPrice: number) => {
        setConfig({ isOpen: true, productName, targetPrice });
    };

    const closeNotifyModal = () => {
        setConfig(prev => ({ ...prev, isOpen: false }));
    };

    return (
        <ModalContext.Provider value={{ openNotifyModal }}>
            {children}
            <NotifyMeModal
                isOpen={config.isOpen}
                onClose={closeNotifyModal}
                productName={config.productName}
                targetPrice={config.targetPrice}
            />
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error("useModal must be used within a ModalProvider");
    }
    return context;
}
