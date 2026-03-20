'use client';

import { Input } from "../../ui/Input";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {

}
function SearchBar({ ...rest }: SearchBarProps) {
    return ( 
        <div className="mt-8 mb-0">
            <Input labelName="Szukaj podopiecznych" {...rest}/>
        </div>
     );
}

export default SearchBar;