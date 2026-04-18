"use server"
import { connectDB } from "@/lib/db/dbConfig";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { sendResetPasswordEmail } from "@/lib/mail";


export async function registerAction(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    // ১. সব ফিল্ড পূরণ করা হয়েছে কিনা চেক
    if (!name || !email || !password) {
        return { error: "Please fill in all fields." };
    }

    // ২. পাসওয়ার্ড ভ্যালিডেশন লজিক (Cyber Security Standard)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
        return {
            error: "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character."
        };
    }

    try {
        await connectDB();

        const existingUser = await User.findOne({ email });
        if (existingUser) return { error: "This email is already registered." };

        const hashedPassword = await bcrypt.hash(password, 12);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

    } catch (err) {
        console.error(err);
        return { error: "Registration failed. Please try again." };
    }

    redirect("/login");
}



// action/auth.ts (নতুন অংশ)
export const requestPasswordReset = async (email: string) => {
    await connectDB();
    const user = await User.findOne({ email });
    if (!user) return { error: "User not found with this email." };

    // ১. একটি সিকিউর রিসেট টোকেন তৈরি (যেমন: crypto.randomBytes)
    const resetToken = Math.random().toString(36).substring(2, 15);
    const resetExpires = new Date(Date.now() + 3600000); // ১ ঘণ্টা মেয়াদ

    await User.updateOne(
        { email },
        { resetPasswordToken: resetToken, resetPasswordExpires: resetExpires }
    );

    // ২. ইমেইল পাঠানো
    try {
        await sendResetPasswordEmail(email, resetToken);
        console.log(`Reset link sent: http://localhost:3000/reset-password?token=${resetToken}&email=${email}`);
    } catch (err) {
        console.error("Failed to send reset email:", err);
        return { error: "Failed to send reset email." };
    }

    return { success: "Reset link sent to your email!" };
};

export const resetPasswordAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const token = formData.get("token") as string;
    const newPassword = formData.get("password") as string;

    await connectDB();
    const user = await User.findOne({
        email,
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) return { error: "Invalid or expired reset link." };

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await User.updateOne(
        { email },
        {
            password: hashedPassword,
            resetPasswordToken: null,
            resetPasswordExpires: null,
            loginAttempts: 0 // রিসেট করলে লক খুলে দেওয়া ভালো
        }
    );

    return { success: "Password reset successful!" };
};