"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";
// এখানে একটি Server Action বা API তৈরি করতে হবে যা OTP চেক করবে
// সহজ করার জন্য আপনি একটি API route `/api/verify-otp` তৈরি করতে পারেন

export default function VerifyOTP() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn("credentials", {
      redirect: false,
      email,
      otp,
      action: "verify_otp",
    });

    if (res?.error) {
      alert("Invalid or Expired OTP");
    } else {
      // সফল হলে ড্যাশবোর্ডে পাঠাতে হবে
      router.push("/profile");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 p-4">
      <form onSubmit={handleVerify} className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl w-full max-w-sm">
        <div className="text-center mb-6">
          <ShieldCheck className="mx-auto text-blue-600 mb-2" size={40} />
          <h2 className="text-xl font-bold dark:text-white">Verify OTP</h2>
          <p className="text-sm text-gray-500">Sent to {email}</p>
        </div>
        <input
          type="text"
          maxLength={6}
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="000000"
          className="w-full text-center text-2xl tracking-[10px] py-3 bg-gray-50 dark:bg-gray-800 border rounded-xl mb-4 dark:text-white"
          required
        />
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold">
          {loading ? <Loader2 className="animate-spin mx-auto" /> : "Verify & Login"}
        </button>
      </form>
    </div>
  );
}