"use client";

import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, User, ArrowRight, CheckCircle2, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { registerAction } from '@/action/auth';


const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isPending, setIsPending] = useState(false);
    const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (formData: FormData) => {
        setIsPending(true);
        setMessage(null);

        try {
            const result = await registerAction(formData);
            if (result?.error) {
                setMessage({ type: 'error', text: result.error });
            } else {
                setMessage({ type: 'success', text: "Registration successful! Redirecting to login..." });
            }
        } catch (err) {
            setMessage({ type: 'error', text: "An unexpected error occurred. Please try again." });
        } finally {
            setIsPending(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                
                {/* Header Section */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30 mb-4 transition-transform hover:scale-105">
                        <ShieldCheck className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Create Account</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Join our secure entry gateway</p>
                </div>

                {/* Main Card */}
                <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
                    
                    {/* Error/Success Alert Box */}
                    {message && (
                        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 text-sm animate-in fade-in slide-in-from-top-2 ${
                            message.type === 'error' 
                            ? 'bg-red-50 border border-red-100 text-red-600' 
                            : 'bg-green-50 border border-green-100 text-green-600'
                        }`}>
                            {message.type === 'error' ? <AlertCircle size={18} /> : <CheckCircle2 size={18} />}
                            {message.text}
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-5">
                        
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                                Full Name
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                    <User size={18} />
                                </div>
                                <input 
                                    name="name"
                                    type="text" 
                                    required
                                    placeholder="Enter your name"
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                                Email Address
                            </label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">
                                    <Mail size={18} />
                                </div>
                                <input 
                                    name="email"
                                    type="email" 
                                    required
                                    placeholder="name@example.com"
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition dark:text-white"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 ml-1">
                                Password
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
                                    className="w-full pl-11 pr-12 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition dark:text-white"
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            
                            {/* Security Checklist UI */}
                            <div className="mt-4 grid grid-cols-2 gap-y-2 gap-x-4 px-1">
                                <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                                    <CheckCircle2 size={12} className="text-blue-500" /> 8+ Characters
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                                    <CheckCircle2 size={12} className="text-blue-500" /> 1 Uppercase
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                                    <CheckCircle2 size={12} className="text-blue-500" /> 1 Number
                                1 Special Char
                                </div>
                                <div className="flex items-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                                    <CheckCircle2 size={12} className="text-blue-500" /> 1 Special Char
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button 
                            disabled={isPending}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2 transition-all active:scale-[0.98] mt-4"
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Processing...
                                </span>
                            ) : (
                                <>Register Account <ArrowRight size={18} /></>
                            )}
                        </button>
                    </form>

                    {/* Security Footer Notice */}
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800">
                        <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-[0.2em]">
                            <ShieldCheck size={14} className="text-blue-500" />
                            Security Standard: Bcrypt-12
                        </div>
                    </div>
                </div>

                {/* Footer Login Link */}
                <p className="text-center mt-8 text-gray-600 dark:text-gray-400 text-sm">
                    Already have an account? 
                    <a href="/login" className="ml-1.5 text-blue-600 font-bold hover:underline transition-all">Sign In here</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;