import React from 'react';
import { ShieldCheck, Mail, Monitor, Clock, LogOut, KeyRound } from 'lucide-react'; // আইকনের জন্য lucide-react ব্যবহার করা হয়েছে

const ProfilePage = () => {
    // ল্যাব প্রজেক্টের জন্য আমরা স্যাম্পল ডাটা ব্যবহার করছি
    const user = {
        email: "user@example.com",
        lastLogin: "2026-04-18 03:15 PM",
        status: "Secure",
        mfaEnabled: true,
        device: "Chrome on Windows 11"
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
            <div className="max-w-4xl mx-auto">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white">User Dashboard</h1>
                    <button className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition">
                        <LogOut size={18} /> Logout
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* User Info Card */}
                    <div className="md:col-span-1 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mb-4 text-blue-600">
                                <ShieldCheck size={40} />
                            </div>
                            <h2 className="text-lg font-semibold dark:text-white">{user.email}</h2>
                            <span className="mt-2 px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                {user.status}
                            </span>
                        </div>
                        
                        <div className="mt-8 space-y-4">
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                                <Mail size={16} /> {user.email}
                            </div>
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                                <Monitor size={16} /> {user.device}
                            </div>
                        </div>
                    </div>

                    {/* Security Measures Status */}
                    <div className="md:col-span-2 space-y-6">
                        
                        {/* Security Card */}
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <h3 className="text-md font-bold mb-4 flex items-center gap-2 dark:text-white">
                                <KeyRound size={18} className="text-blue-500" /> Active Security Layers
                            </h3>
                            
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                    <div>
                                        <p className="text-sm font-medium dark:text-gray-200">2-Factor Authentication</p>
                                        <p className="text-xs text-gray-500">Extra layer of protection</p>
                                    </div>
                                    <span className="text-xs font-bold text-blue-500">ENABLED</span>
                                </div>

                                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
                                    <div>
                                        <p className="text-sm font-medium dark:text-gray-200">Password Encryption</p>
                                        <p className="text-xs text-gray-500">AES-256 Hashing applied</p>
                                    </div>
                                    <span className="text-xs font-bold text-green-500">ACTIVE</span>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
                            <h3 className="text-md font-bold mb-4 flex items-center gap-2 dark:text-white">
                                <Clock size={18} className="text-orange-500" /> Recent Activity
                            </h3>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                <p>Last successful login: <span className="font-mono text-blue-500">{user.lastLogin}</span></p>
                                <p className="mt-1">Login Location: <span className="text-gray-800 dark:text-gray-200">Dhaka, Bangladesh</span></p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;