import { FirstSetupFirstStep, FirstSetupSelectedSteps, UserPurposeType } from "@/app/types";
import { Button } from "../ui/Button";
import { useTranslations } from "next-intl";
import { Select } from "../ui/SelectField";
import { CenterComponent } from "../CenterComponent";
import Navigator from "./Navigator";

type PurposeProps = {
    setCurrentStep:React.Dispatch<React.SetStateAction<FirstSetupFirstStep>>,
    purpose:UserPurposeType,
    setPurpose:React.Dispatch<React.SetStateAction<UserPurposeType>>,
}
function Puropse({setCurrentStep,purpose,setPurpose}:PurposeProps) {

    const t = useTranslations("FirstSetup")
    const e = useTranslations("Errors")

    const purposeOptions = ['Casual','Trener','Podopieczny trenera']

    const handlePurposeChange = (e:React.ChangeEvent<HTMLSelectElement>)=>{
        setPurpose(e.target.value as UserPurposeType)
    }
    return ( 
        <CenterComponent>
            <div className="text-white mx-5 mb-20">
                
                    <h1 className="text-3xl font-medium mb-10 text-center">W jakim celu używasz aplikacji?</h1>

                    <Select 
                        labelName={'Typ użytkownika'}
                        valuesToLoop={purposeOptions}
                        name='advancmentlevel'
                        onChange={handlePurposeChange}
                        value={purpose}
                        defaultValue={purpose}
                        />

                    <Navigator 
                        prev={()=>setCurrentStep('language')}
                        next={e=>{setCurrentStep('final');e.preventDefault()}}
                    />
            </div> 
    </CenterComponent>);
}

export default Puropse;