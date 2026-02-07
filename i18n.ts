import { notFound } from "next/navigation";
import { getLocale, getRequestConfig } from "next-intl/server";

export const locales = ['en','pl']

export default getRequestConfig(async ({requestLocale}) => {
    let locale = await requestLocale

    if(!locales.includes(locale as any)) notFound();
    // if(!locale) locale = 'pl'

    return {
        messages: (await import(`@/app/messages/${locale}.json`)).default
    }
})