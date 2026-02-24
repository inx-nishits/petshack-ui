import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { LoginContent } from "@/components/auth/LoginContent";

export default function LoginPage() {
    return (
        <Suspense fallback={
            <AuthLayout>
                <div className="flex items-center justify-center p-20">
                    <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                </div>
            </AuthLayout>
        }>
            <LoginContent />
        </Suspense>
    );
}
