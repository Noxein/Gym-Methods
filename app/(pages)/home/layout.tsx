import { BottomMenu } from "@/app/components/nav-menu/BottomMenu";

export default function HomeLayout({children}:{children:React.ReactNode}){
    return(
        <div>
            <div>{children}</div>
            <BottomMenu />
        </div>
    )
}