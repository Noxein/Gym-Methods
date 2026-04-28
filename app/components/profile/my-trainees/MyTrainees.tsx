'use client';
import { PlusIcon } from "@/app/ui/icons/ExpandIcon";
import { Icon } from "../../Icon";
import { ButtonWithIcon } from "../../ui/ButtonWithIcon";
import AddTrainee from "./AddTrainee";

function MyTrainees() {
    return ( 
        <main className="mx-5 mt-20 flex justify-center flex-col text-white gap-5 text-center">
            <p className="text-3xl">Moi podopieczni</p>
            <AddTrainee />
        </main> );
}

export default MyTrainees;