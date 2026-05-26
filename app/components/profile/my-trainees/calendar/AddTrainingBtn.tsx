import { Button } from "@/app/components/ui/Button";
import { HideShowHTMLScrollbar } from "@/app/lib/utils";
import { TraineePlan } from "@/app/types";
import { useTranslations } from "next-intl";
import { useState } from "react";
import SelectDatesForTrainingModal from "./SelectDatesForTrainingModal";

type AddTrainingBtnProps = {
    showAddTrainingModal: boolean;
    setShowAddTrainingModal: (value: boolean) => void;
    allTrainings: TraineePlan[]; // tutaj powinien być typ treningu, ale nie mam jeszcze zdefiniowanego, więc daję any
}

function AddTrainingBtn({ showAddTrainingModal, setShowAddTrainingModal, allTrainings }: AddTrainingBtnProps) {

    const handleShowTrainingModal = () => {
        HideShowHTMLScrollbar('hide')
        setShowAddTrainingModal(true);
    }

    const handleCloseTrainingModal = () => {
        HideShowHTMLScrollbar('show')
        setShowAddTrainingModal(false);
    }

    const[selectedTraining, setSelectedTraining] = useState<TraineePlan | null>(null);

    const u = useTranslations('Utils')
    return ( 
        <div>
            <Button blue isPrimary className="w-full mt-2" onClick={handleShowTrainingModal}>{u('addTraining')}</Button>

            {showAddTrainingModal && (
                <div className="fixed w-screen h-screen top-0 left-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50 text-white">
                    <div className=" p-5 rounded-lg w-96 bg-dark overflow-auto max-h-[80vh]">
                        {selectedTraining ? <>
                        <SelectDatesForTrainingModal training={selectedTraining}/>
                        </> : <><h2 className="text-xl font-bold mb-4">{u('addNewTraining')}</h2>
                        <div className="flex flex-col gap-4">
                            {allTrainings.map(training => (
                                <div key={training.id} className="flex items-center">
                                    <p>{training.name} - <span className="text-gray-400">({training.plan.length})</span></p>
                                    <Button blue isPrimary className="ml-auto px-5" onClick={() => setSelectedTraining(training)}>{u("Add")}</Button>
                                    
                                </div>
                            ))}
                        </div>
                        </>
                        }
                        <Button blue className="w-full mt-2" onClick={handleCloseTrainingModal}>{u('close')}</Button>
                    </div>
                </div>
            )}        </div>
     );
}

export default AddTrainingBtn;
