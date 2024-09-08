import { BottomMenu } from "@/app/components/nav-menu/BottomMenu";
import { Metadata } from "next";

  
export default function HomeLayout({children}:{children:React.ReactNode}){
    return(
        <div>
            <div>{children}</div>
            <BottomMenu />
        </div>
    )
}