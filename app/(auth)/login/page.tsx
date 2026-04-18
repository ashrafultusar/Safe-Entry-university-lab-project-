"use client";

import React, { useState, useEffect } from "react";
import { Lock, Mail, ShieldCheck, ArrowRight, Eye, EyeOff, AlertCircle, Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [lockoutTimer, setLockoutTimer] = useState<number | null>(null);
  const [failedAttempts, setFailedAttempts] = useState(0);
  const router = useRouter();

  // কাউন্টডাউন টাইমার হ্যান্ডেলার (Brute-force protection)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (lockoutTimer !== null && lockoutTimer > 0) {
      interval = setInterval(() => {
        setLockoutTimer((prev) => (prev && prev > 1 ? prev - 1 : null));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockoutTimer]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (lockoutTimer !== null) return; // লকড থাকলে সাবমিট বন্ধ

    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        const errorMsg = res.code || res.error;

        // ১. ২-ফ্যাক্টর অথেন্টিকেশন চেক (OTP Required)
        if (errorMsg.includes("OTP_REQUIRED_")) {
          const targetEmail = errorMsg.split("_")[2];
          router.push(`/verify-otp?email=${encodeURIComponent(targetEmail)}`);
          return;
        }

        // ২. অ্যাকাউন্ট লক চেক
        if (errorMsg.includes("LOCKED_")) {
          const unlockTimeStr = errorMsg.split("_")[1];
          const remainingSeconds = Math.ceil((parseInt(unlockTimeStr) - Date.now()) / 1000);

          if (remainingSeconds > 0) {
            setLockoutTimer(remainingSeconds);
            setError(null);
          } else {
            setError("Account temporarily locked. Please try again.");
          }
        } 
        // ৩. সাধারণ ভুল পাসওয়ার্ড হ্যান্ডলিং
        else {
          const currentAttempts = failedAttempts + 1;
          setFailedAttempts(currentAttempts);

          if (currentAttempts >= 3) {
            setLockoutTimer(20); // ২০ সেকেন্ড ব্লক
            setFailedAttempts(0);
            setError(null);
          } else {
            setError(errorMsg === "CredentialsSignin" ? "Invalid email or password." : errorMsg);
          }
        }
      } else {
        // লগইন সফল
        router.push("/profile");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-md w-full">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/30 mb-4 transition-transform hover:scale-105">
            <ShieldCheck className="text-white" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Safe-Entry
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Secure Multi-Layer Authentication
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800 transition-all">
          
          {/* Error Message Display */}
          {error && !lockoutTimer && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 rounded-xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm animate-in fade-in slide-in-from-top-2">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {/* Lockout Timer Display */}
          {lockoutTimer !== null && (
            <div className="mb-6 p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl flex items-center gap-3 text-orange-700 dark:text-orange-400 text-sm animate-pulse">
              <Lock size={18} />
              <span>
                Security Lock active. Try again in{" "}
                <strong className="font-mono">
                  {Math.floor(lockoutTimer / 60)}:{String(lockoutTimer % 60).padStart(2, '0')}
                </strong>
              </span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
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

            {/* Password Field */}
            <div>
              <div className="flex justify-between mb-2 ml-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <a href="/recovery" className="text-sm text-blue-600 hover:underline font-medium">
                  Forgot?
                </a>
              </div>
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
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-blue-500 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              disabled={loading || lockoutTimer !== null}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition active:scale-[0.98] disabled:bg-gray-400 dark:disabled:bg-gray-800 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Authenticating...
                </>
              ) : lockoutTimer !== null ? (
                <>Locked ({lockoutTimer}s)</>
              ) : (
                <>
                  Secure Login <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Bottom Security Badge */}
          <div className="mt-8 pt-6 border-t border-gray-50 dark:border-gray-800 flex items-center justify-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-widest">
            <ShieldCheck size={14} className="text-green-500" />
            2FA & AES-256 Protection
          </div>
        </div>

        {/* Register Footer */}
        <p className="text-center mt-8 text-gray-600 dark:text-gray-400 text-sm">
          New to Safe-Entry?{" "}
          <a
            href="/register"
            className="text-blue-600 font-bold hover:underline ml-1"
          >
            Create Account
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;