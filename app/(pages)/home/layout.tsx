import { Nav } from "@/app/components/Nav";
import { BottomMenu } from "@/app/components/nav-menu/BottomMenu";

export default function HomeLayout({children}:{children:React.ReactNode}){
    return(
        <div>
            <div>{children}</div>
            <div className="hidden ml-4 bg-blue-700"></div>
            <div className="hidden ml-6"></div>
            <div className="hidden ml-12"></div>
            <BottomMenu />
        </div>
    )
}