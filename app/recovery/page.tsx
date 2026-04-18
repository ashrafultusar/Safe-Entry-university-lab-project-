
"use client";
import React, { useState } from "react";
import {Loader2 } from "lucide-react";
import { requestPasswordReset } from "@/action/auth";

const RecoveryPage = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'error' | 'success', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const email = new FormData(e.currentTarget).get("email") as string;
    const res = await requestPasswordReset(email);
    setMessage(res.error ? { type: 'error', text: res.error } : { type: 'success', text: res.success! });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        {message && (
          <div className={`mb-4 p-3 rounded-xl text-sm ${message.type === 'error' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="email" type="email" required placeholder="Enter your email" className="w-full p-3 bg-gray-50 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" />
          <button disabled={loading} className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold flex justify-center items-center gap-2">
            {loading ? <Loader2 className="animate-spin" /> : "Send Reset Link"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default RecoveryPage;