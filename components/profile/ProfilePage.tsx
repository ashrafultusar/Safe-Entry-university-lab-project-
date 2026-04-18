"use client";

import React from "react";
import {
  ShieldCheck,
  Mail,
  Monitor,
  Clock,
  LogOut,
  KeyRound,
} from "lucide-react";
import { signOut } from "next-auth/react";

// props হিসেবে ইউজার ডাটা নেওয়া হচ্ছে
const ProfilePage = ({ userSession }: { userSession: any }) => {
  const [deviceInfo, setDeviceInfo] = React.useState("Direct Access");
  const [loginTime, setLoginTime] = React.useState("Loading...");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setDeviceInfo(navigator.userAgent || "Unknown Device");
      setLoginTime(new Date().toLocaleString());
    }
  }, []);

  // ডায়নামিক ইউজার ডাটা
  const user = {
    email: userSession?.email || "Unknown Email",
    name: userSession?.name || "User",
    lastLogin: loginTime,
    status: "Secure",
    device: deviceInfo,
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            User Dashboard
          </h1>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition shadow-md active:scale-95"
          >
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
              <h2 className="text-lg font-semibold dark:text-white truncate w-full">
                {user.name}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 truncate w-full">
                {user.email}
              </p>
              <span className="mt-4 px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-bold rounded-full border border-green-200 dark:border-green-800">
                {user.status.toUpperCase()}
              </span>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                <Mail size={16} className="text-blue-500" /> {user.email}
              </div>
              <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400 text-sm">
                <Monitor size={16} className="text-blue-500" />
                <span className="truncate">{user.device}</span>
              </div>
            </div>
          </div>

          {/* Security Measures Status */}
          <div className="md:col-span-2 space-y-6">
            {/* Security Card */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="text-md font-bold mb-4 flex items-center gap-2 dark:text-white">
                <KeyRound size={18} className="text-blue-500" /> Active Security
                Layers
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div>
                    <p className="text-sm font-medium dark:text-gray-200">
                      2-Factor Authentication
                    </p>
                    <p className="text-xs text-gray-500">Protection via OTP</p>
                  </div>
                  <span className="text-[10px] px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 font-bold rounded">
                    ENABLED
                  </span>
                </div>

                <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700">
                  <div>
                    <p className="text-sm font-medium dark:text-gray-200">
                      Password Encryption
                    </p>
                    <p className="text-xs text-gray-500">
                      Bcrypt Cost Factor: 12
                    </p>
                  </div>
                  <span className="text-[10px] px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-600 font-bold rounded">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
              <h3 className="text-md font-bold mb-4 flex items-center gap-2 dark:text-white">
                <Clock size={18} className="text-orange-500" /> Access Logs
              </h3>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>
                  Current Session:{" "}
                  <span className="font-mono text-blue-500 text-xs">
                    {user.lastLogin}
                  </span>
                </p>
                <div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-800 rounded-lg">
                  <p className="text-[11px] text-orange-700 dark:text-orange-400">
                    <strong>Pro Tip:</strong> New device login notifications are
                    sent to your registered email.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
