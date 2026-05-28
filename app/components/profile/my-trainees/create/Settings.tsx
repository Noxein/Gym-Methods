'use client'
import { SettingsIcon } from "@/app/ui/icons/ExpandIcon";
import Asymetry from "./Asymetry";
import ImportPlan from "./ImportPlan";
import { Icon } from "@/app/components/Icon";
import { useState } from "react";
import { BlurBackgroundModal } from "@/app/components/BlurBackgroundModal";
import { HideShowHTMLScrollbar } from "@/app/lib/utils";

function Settings() {

    const[settingsOpen,setSettingsOpen] = useState<boolean>(false);

    const openSettings = () => {
        HideShowHTMLScrollbar('hide')
        setSettingsOpen(true);
    }

    const closeSettings = () => {
        HideShowHTMLScrollbar('show')
        setSettingsOpen(false);
    }
    return ( 
        <div className="z-20">
            <Icon onClick={openSettings} role="button">
                <SettingsIcon fill="#fff"/>
            </Icon>
            {settingsOpen && 
            <BlurBackgroundModal onClick={closeSettings}>
                <div onClick={e=>e.stopPropagation()} className="bg-dark p-5 rounded-lg">
                    <Asymetry />
                    <ImportPlan handleSettingsSave={closeSettings} />
                </div>
            </BlurBackgroundModal>}

        </div>
     );
}

export default Settings;