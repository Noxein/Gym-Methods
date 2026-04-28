import { BottomMenu } from "@/app/components/nav-menu/BottomMenu";
import { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";

  
export default function HomeLayout({children}:{children:React.ReactNode}){
    return(
        <div>
            <NextIntlClientProvider >
                <div>{children}</div>
                <BottomMenu />
            </NextIntlClientProvider>
        </div>
    )
}