'use client';
import { PlusIcon } from "@/app/ui/icons/ExpandIcon";
import { Icon } from "../../Icon";
import { ButtonWithIcon } from "../../ui/ButtonWithIcon";
import { useState } from "react";
import { BlurBackgroundModal } from "../../BlurBackgroundModal";
import AddTraineeModal from "./AddTraineeModal";

function AddTrainee() {
    const[showModal,setShowModal] = useState(true);
    return ( 
        <>
            <ButtonWithIcon 
                onClick={() => setShowModal(true)}
                buttonText="Add trainee"
                childrenIcon={
                    <Icon className="flex items-center justify-center">
                        <PlusIcon />
                    </Icon>
                }
                isPrimary
            />
            {showModal && 
            <BlurBackgroundModal onClick={()=>setShowModal(false)}>
                <AddTraineeModal />
            </BlurBackgroundModal>}
        </>
     );
}

export default AddTrainee;