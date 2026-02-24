"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Chatbot } from "@/components/ui/Chatbot";
import { ModalProvider } from "@/context/ModalContext";
import { AuthProvider } from "@/context/AuthContext";
import { Suspense } from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const authPages = ["/login", "/signup", "/forgot-password", "/reset-password"];
    const isAuthPage = authPages.includes(pathname);

    if (isAuthPage) {
        return (
            <AuthProvider>
                <Suspense fallback={null}>
                    <main className="min-h-screen">{children}</main>
                </Suspense>
            </AuthProvider>
        );
    }

    return (
        <AuthProvider>
            <ModalProvider>
                <div className="flex flex-col min-h-screen">
                    <Header />
                    <Suspense fallback={null}>
                        <main className="grow">
                            {children}
                        </main>
                    </Suspense>
                    <Footer />
                    <Chatbot />
                </div>
            </ModalProvider>
        </AuthProvider>
    );
}

