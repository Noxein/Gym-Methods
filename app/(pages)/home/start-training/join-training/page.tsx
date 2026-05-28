import { getTranslations } from "next-intl/server";

export default async function page({params}:{params: Promise<{[key:string]:string}>}) {
    const t = await getTranslations("Errors")

    return(
        <div className="text-white">{t("Page not found")}</div>
)
}
