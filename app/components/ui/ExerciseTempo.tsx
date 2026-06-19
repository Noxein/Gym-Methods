'use client'

import { BlurBackgroundModal } from "@/app/components/BlurBackgroundModal";
import { formatTempo } from "@/app/lib/tempo";
import { HideShowHTMLScrollbar } from "@/app/lib/utils";
import { TempoType } from "@/app/types";
import { CrossIcon } from "@/app/ui/icons/ExpandIcon";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { createPortal } from "react-dom";

type ExerciseTempoTypes = {
    tempo?: TempoType,
    className?: string,
}

export const ExerciseTempo = ({tempo, className = ''}: ExerciseTempoTypes) => {
    const u = useTranslations("Utils")
    const { data } = useSession()
    const [showModal, setShowModal] = useState(false)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)

        return () => {
            HideShowHTMLScrollbar('show')
        }
    }, [])

    if(!tempo || data?.user?.settings?.showtempo !== true) return null

    const handleOpenModal = () => {
        HideShowHTMLScrollbar('hide')
        setShowModal(true)
    }

    const handleCloseModal = () => {
        HideShowHTMLScrollbar('show')
        setShowModal(false)
    }

    return (
        <>
            <span className={`text-xs text-gray-400 flex items-center gap-1 ${className}`}>
                <span>{u("Tempo")}: {formatTempo(tempo)}</span>
                <button
                    type="button"
                    className="flex h-4 w-4 items-center justify-center rounded-full border p-0 border-gray-500 text-[10px] leading-none text-gray-300"
                    onClick={handleOpenModal}
                    aria-label={u("TempoInfoAria")}
                >
                    <span>?</span>
                </button>
            </span>
            {showModal && mounted && createPortal(
                <BlurBackgroundModal className="z-[200]" onClick={handleCloseModal}>
                    <div onClick={e=>e.stopPropagation()} className="mx-5 w-full max-w-sm rounded-lg bg-darkLight p-5 text-white">
                        <div className="mb-4 flex items-center justify-between gap-4">
                            <p className="text-lg font-semibold">{u("TempoInfoTitle")}</p>
                            <button type="button" onClick={handleCloseModal} aria-label={u("close")}>
                                <CrossIcon fill="#9F443C" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-3 text-sm text-marmur">
                            <p>{u("TempoInfoDescription")}</p>
                            <p className="font-semibold text-white">{formatTempo(tempo)}</p>
                            <p>{u("TempoInfoOrder")}</p>
                            <p>{u("TempoInfoValues")}</p>
                            <p>{u("TempoInfoUnit")}</p>
                        </div>
                    </div>
                </BlurBackgroundModal>,
                document.body
            )}
        </>
    )
}
