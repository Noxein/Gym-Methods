'use client';

import { useTranslations } from "next-intl";
import { Input } from "../../ui/Input";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {

}
function SearchBar({ ...rest }: SearchBarProps) {

    const t = useTranslations('Home/Profile/My-Trainees')
    return ( 
        <div className="mt-8 mb-0">
            <Input labelName={t('SearchForTrainee')} {...rest}/>
        </div>
     );
}

export default SearchBar;