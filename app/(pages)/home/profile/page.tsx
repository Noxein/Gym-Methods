import { Profile } from "@/app/components/profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profil",
};
  
export default function page() {
    return(
        <Profile />
    )
}