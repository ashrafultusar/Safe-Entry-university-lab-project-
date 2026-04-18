"use server"
import { connectDB } from "@/lib/db/dbConfig";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation"; 


export async function registerAction(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
        return { error: "All fields are required" };
    }

    if (password.length < 8) {
        return { error: "Password must be at least 8 characters" };
    }

    try {
        await connectDB();

        // ইউজার অলরেডি আছে কিনা চেক করা
        const existingUser = await User.findOne({ email });
        if (existingUser) return { error: "User already exists" };

        // পাসওয়ার্ড হ্যাশ করা (Security)
        const hashedPassword = await bcrypt.hash(password, 12);

        // ডাটাবেজে সেভ করা
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        
    } catch (err) {
        return { error: "Something went wrong" };
    }

  
    redirect("/login");
}