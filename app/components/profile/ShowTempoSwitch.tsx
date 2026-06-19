'use client'

import { updateShowTempoSetting } from "@/app/actions"
import { TimerIcon } from "@/app/ui/icons/ExpandIcon"
import { useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { Icon } from "../Icon"

type ShowTempoSwitchProps = {
    value?: boolean
    onChange?: (val: boolean) => void
}

export const ShowTempoSwitch = ({ value, onChange }: ShowTempoSwitchProps = {}) => {
    const t = useTranslations("Home/Profile")
    const e = useTranslations("Errors")
    const { data, update } = useSession()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const isControlled = value !== undefined && onChange !== undefined
    const showTempo = isControlled ? value : data?.user?.settings?.showtempo === true
    console.log(data)

    const handleToggle = async () => {
        if (isControlled) {
            onChange!(!showTempo)
            return
        }
        
        setLoading(true)
        setError('')

        const result = await updateShowTempoSetting(!showTempo)
        if(result?.error){
            setError(e(result.error))
            setLoading(false)
            return
        }

        await update({ notEmpty: true })
        setLoading(false)
    }

    return (
        <div className="flex flex-col gap-2">
            <button className="w-full bg-borderInteractive text-marmur border-borderInteractive border-2 rounded-lg text-xl flex" onClick={handleToggle} disabled={loading}>
                <span className="bg-dark flex-1 py-3 px-4 rounded-lg flex items-center justify-between gap-3">
                    <span>{t("ShowTempo")}</span>
                    <span className={`flex h-8 w-14 items-center rounded-full border px-1 transition-all ${showTempo ? 'justify-end border-green bg-green/20' : 'justify-start border-gray-500 bg-transparent'}`}>
                        <span className={`h-5 w-5 rounded-full ${showTempo ? 'bg-green' : 'bg-gray-400'}`}></span>
                    </span>
                </span>
                <Icon className="px-1 flex items-center">
                    <TimerIcon width='30px' height='30px' fill='#fff'/>
                </Icon>
            </button>
            {error && <div className="text-red text-sm px-1">{error}</div>}
        </div>
    )
}
