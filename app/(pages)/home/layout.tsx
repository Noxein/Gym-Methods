import { Nav } from "@/app/components/Nav";

export default function HomeLayout({children}:{children:React.ReactNode}){
    return(
        <div>
            <Nav />
            <div className="mt-20">{children}</div>
            <div className="hidden pl-4 bg-blue-700"></div>
            <div className="hidden pl-8"></div>
            <div className="hidden pl-12"></div>
        </div>
    )
}