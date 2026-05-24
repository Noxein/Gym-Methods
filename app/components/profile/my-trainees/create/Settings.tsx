'use client'
import { SettingsIcon } from "@/app/ui/icons/ExpandIcon";
import Asymetry from "./Asymetry";
import ImportPlan from "./ImportPlan";
import { Icon } from "@/app/components/Icon";
import { useState } from "react";
import { BlurBackgroundModal } from "@/app/components/BlurBackgroundModal";

function Settings() {

    const[settingsOpen,setSettingsOpen] = useState<boolean>(false);

    return ( 
        <div className="z-20">
            <Icon onClick={() => setSettingsOpen(!settingsOpen)} role="button">
                <SettingsIcon fill="#fff"/>
            </Icon>
            {settingsOpen && 
            <BlurBackgroundModal onClick={(e)=> setSettingsOpen(false)}>
                <div onClick={e=>e.stopPropagation()} className="bg-dark p-5 rounded-lg">
                    <Asymetry />
                    <ImportPlan handleSettingsSave={() => setSettingsOpen(false)} />
                </div>
            </BlurBackgroundModal>}

        </div>
     );
}

export default Settings;