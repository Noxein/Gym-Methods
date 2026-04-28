import { notFound } from "next/navigation";
import { getLocale, getRequestConfig } from "next-intl/server";

export const locales = ['en','pl']

export default getRequestConfig(async () => {
    let locale = await getLocale()

    if(!locales.includes(locale as any)) notFound();
    // if(!locale) locale = 'pl'

    return {
        locale,
        messages: (await import(`@/app/messages/${locale}.json`)).default
    }
})