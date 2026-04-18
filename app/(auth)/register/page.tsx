"use client";

import React, { useState } from 'react';
import { ShieldCheck, Mail, Lock, User, ArrowRight, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { registerAction } from '@/action/auth';


const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);
    const [isPending, setIsPending] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (formData: FormData) => {
        setIsPending(true);
        setMessage(null);
        
        const result = await registerAction(formData);
        
        if (result?.error) {
            setMessage({ type: 'error', text: result.error });
            setIsPending(false);
        } else {
            setMessage({ type: 'success', text: "Registration successful! Redirecting..." });
          
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30 mb-4">
                        <ShieldCheck className="text-white" size={32} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create Account</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Join our secure gateway</p>
                </div>

                <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
                    
                    {/* Error/Success Messages */}
                    {message && (
                        <div className={`mb-6 p-3 rounded-lg text-sm font-medium ${
                            message.type === 'error' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                        }`}>
                            {message.text}
                        </div>
                    )}

                    <form action={handleSubmit} className="space-y-5">
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <User size={18} />
                                </div>
                                <input 
                                    name="name" 
                                    type="text" 
                                    required
                                    placeholder="John Doe"
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition dark:text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                    <Mail size={18} />
                                </div>
                                <input 
                                    name="email" 
                                    type="email" 
                                    required
                                    placeholder="name@example.com"
                                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition dark:text-white"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Create Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
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
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-500 transition"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            
                            <div className="mt-3 space-y-2">
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <CheckCircle2 size={14} className="text-blue-500" /> At least 8 characters
                                </div>
                            </div>
                        </div>

                        <button 
                            disabled={isPending}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition active:scale-95 mt-2"
                        >
                            {isPending ? "Creating Account..." : "Register Now"} <ArrowRight size={18} />
                        </button>
                    </form>

                    <p className="mt-6 text-[10px] text-center text-gray-400 uppercase tracking-widest font-bold italic">
                        🔒 AES-256 Hashing Guaranteed
                    </p>
                </div>

                <p className="text-center mt-6 text-gray-600 dark:text-gray-400 text-sm">
                    Already have an account? <a href="/login" className="text-blue-600 font-semibold hover:underline">Sign In</a>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;