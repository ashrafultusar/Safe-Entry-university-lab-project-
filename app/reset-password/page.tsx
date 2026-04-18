"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ShieldCheck, Lock, ArrowRight, Eye, EyeOff, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { resetPasswordAction } from '@/action/auth';

const ResetPasswordForm = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [showPassword, setShowPassword] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsPending(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        // URL থেকে পাওয়া ডাটা ফর্মে ইনজেক্ট করা হচ্ছে
        formData.append("token", token || "");
        formData.append("email", email || "");

        try {
            const result = await resetPasswordAction(formData);
            if (result?.error) {
                setMessage({ type: 'error', text: result.error });
            } else {
                setMessage({ type: 'success', text: "Password changed successfully! Redirecting..." });
                setTimeout(() => router.push("/login"), 3000);
            }
        } catch (err) {
            setMessage({ type: 'error', text: "Something went wrong. Please try again." });
        } finally {
            setIsPending(false);
        }
    };

    if (!token || !email) {
        return (
            <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-100 text-red-600">
                <AlertCircle className="mx-auto mb-2" />
                Invalid reset link. Please request a new one.
            </div>
        );
    }

    return (
        <div className="max-w-md w-full">
            {/* Header */}
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg mb-4">
                    <Lock className="text-white" size={32} />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">New Password</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Set a strong password for your account</p>
            </div>

            {/* Form Card */}
            <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
                {message && (
                    <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-2 ${
                        message.type === 'error' ? 'bg-red-50 text-red-600 border border-red-100' : 'bg-green-50 text-green-600 border border-green-100'
                    }`}>
                        {message.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                        {message.text}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
                            New Password
                        </label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                <Lock size={18} />
                            </div>
                            <input 
                                name="password"
                                type={showPassword ? "text" : "password"} 
                                required
                                placeholder="••••••••"
                                className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition dark:text-white"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button 
                        disabled={isPending}
                        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                    >
                        {isPending ? (
                            <Loader2 className="animate-spin" size={20} />
                        ) : (
                            <>Update Password <ArrowRight size={18} /></>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-green-500" />
                    End-to-End Encrypted
                </div>
            </div>
        </div>
    );
};

// Next.js এ useSearchParams ব্যবহার করলে Suspense দিয়ে র‍্যাপ করা নিরাপদ
export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
            <Suspense fallback={<Loader2 className="animate-spin text-blue-600" size={40} />}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}