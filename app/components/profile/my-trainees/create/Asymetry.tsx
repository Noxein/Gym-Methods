'use client'
import { Select } from "@/app/components/ui/SelectField";
import CreateTrainingContext from "@/app/context/CreateTrainingContext";
import { useTranslations } from "next-intl";
import { useContext } from "react";

function Asymetry() {
    const t = useTranslations('Home/Profile/My-Trainees/Schemas/Create')

    const { showSideSelection, setShowSideSelection, loading } = useContext(CreateTrainingContext)!

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if(loading) return;
        
        const value = e.target.value;
        if(value === "Yes" && !showSideSelection){
            setShowSideSelection(true)
        }
        if(value === "No" && showSideSelection){
            setShowSideSelection(false)
        }
    }

    return ( 
        <div className="flex flex-col gap-2 mt-2 text-white">
            <p>{t("User needs to have different weights for each side")}?</p>
            <Select labelName={t("Show side selection")+"?"} value={showSideSelection ? "Yes" : "No"} valuesToLoop={["Yes", "No"]} onChange={handleChange}/>
        </div>
     );
}

export default Asymetry;