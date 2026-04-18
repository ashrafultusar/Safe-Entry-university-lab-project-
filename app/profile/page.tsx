import ProfilePage from '@/components/profile/ProfilePage';
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const page = async () => {
    const session = await auth();

    
    if (!session?.user) {
        redirect("/login");
    }

    return (
        <div>
           
            <ProfilePage userSession={session.user} />
        </div>
    );
};

export default page;