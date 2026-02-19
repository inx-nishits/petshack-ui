"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { NotifyMeModal } from "@/components/ui/NotifyMeModal";
import { AlertModal } from "@/components/ui/AlertModal";

interface ModalContextType {
    openNotifyModal: (productName: string, targetPrice: number) => void;
    showAlert: (message: string, title?: string) => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [config, setConfig] = useState<{ isOpen: boolean; productName: string; targetPrice: number }>({
        isOpen: false,
        productName: "",
        targetPrice: 0,
    });

    const [alertConfig, setAlertConfig] = useState<{ isOpen: boolean; message: string; title: string }>({
        isOpen: false,
        message: "",
        title: "Alert"
    });

    const openNotifyModal = (productName: string, targetPrice: number) => {
        setConfig({ isOpen: true, productName, targetPrice });
    };

    const closeNotifyModal = () => {
        setConfig(prev => ({ ...prev, isOpen: false }));
    };

    const showAlert = (message: string, title: string = "Alert") => {
        setAlertConfig({ isOpen: true, message, title });
    };

    const closeAlert = () => {
        setAlertConfig(prev => ({ ...prev, isOpen: false }));
    };

    return (
        <ModalContext.Provider value={{ openNotifyModal, showAlert }}>
            {children}
            <NotifyMeModal
                isOpen={config.isOpen}
                onClose={closeNotifyModal}
                productName={config.productName}
                targetPrice={config.targetPrice}
            />
            <AlertModal
                isOpen={alertConfig.isOpen}
                onClose={closeAlert}
                message={alertConfig.message}
                title={alertConfig.title}
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
