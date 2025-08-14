import { CheckIcon, CrossIcon } from "@/app/ui/icons/ExpandIcon";
import { Icon } from "../Icon";

interface CheckobxTrueFalseTypes extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
    typeOfCheckbox: 'red'|'green',
    isChecked: boolean,
    isActive: boolean,
}

function CheckobxTrueFalse({typeOfCheckbox,isChecked,isActive,...rest}:CheckobxTrueFalseTypes) {
    if(typeOfCheckbox==='green') return (
    <div className={`border-1 ${isActive?'border-white bg-[#ffffff22]':'border-borderInteractive'} ${isChecked? 'bg-green':'bg-green-200'} flex items-center justify-center rounded-lg`} {...rest}>
        <Icon>
            <CheckIcon fill="#fff"/>
        </Icon>
    </div>
     );

     return( 
    <div className={`border-1 ${isActive?'border-white bg-[#ffffff22]':'border-borderInteractive'} border-borderInteractive ${isChecked? 'bg-red':'bg-red-200'} flex items-center justify-center rounded-lg`} {...rest}>
        <Icon>
            <CrossIcon fill="#fff" width="20" height="20"/>
        </Icon>
    </div>
     )
}

export default CheckobxTrueFalse;