"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Chatbot } from "@/components/ui/Chatbot";
import { CompareFloatingBar } from "@/components/ui/CompareFloatingBar";
import { CompareProvider } from "@/context/CompareContext";
import { ModalProvider } from "@/context/ModalContext";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const authPages = ["/login", "/signup", "/forgot-password", "/reset-password"];
    const isAuthPage = authPages.includes(pathname);

    if (isAuthPage) {
        return <main className="min-h-screen">{children}</main>;
    }

    return (
        <ModalProvider>
            <CompareProvider>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <main className="grow">
                        {children}
                    </main>
                    <Footer />
                    <Chatbot />
                    <CompareFloatingBar />
                </div>
            </CompareProvider>
        </ModalProvider>
    );
}

