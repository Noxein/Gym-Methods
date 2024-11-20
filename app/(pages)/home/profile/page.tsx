import { Profile } from "@/app/components/profile/Profile";
import { auth } from "@/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profil",
};
  
export default async function page() {
    const email = (await auth())!.user?.email!
    return(
        <Profile email={email}/>
    )
}