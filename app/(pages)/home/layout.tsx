import { Nav } from "@/app/components/Nav";

export default function HomeLayout({children}:{children:React.ReactNode}){
    return(
        <div>
            <Nav />
            <div className="mt-20">{children}</div>
        </div>
    )
}