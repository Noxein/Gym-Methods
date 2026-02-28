import { BottomMenu } from "@/app/components/nav-menu/BottomMenu";
import { getUserLocale } from "@/app/i18n/locale";
import { Metadata } from "next";
import { Locale, NextIntlClientProvider } from "next-intl";

  
export default async function HomeLayout({children}:{children:React.ReactNode}){
    const locale = await getUserLocale() as Locale;
    return(
        <div>
            <NextIntlClientProvider locale={locale}>
                <div>{children}</div>
                <BottomMenu />
            </NextIntlClientProvider>
        </div>
    )
}