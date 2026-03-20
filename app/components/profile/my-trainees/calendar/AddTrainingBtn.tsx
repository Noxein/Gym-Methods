type AddTrainingBtnProps = {
    showAddTrainingModal: boolean;
    setShowAddTrainingModal: (value: boolean) => void;
    allTrainings: any[]; // tutaj powinien być typ treningu, ale nie mam jeszcze zdefiniowanego, więc daję any
}

function AddTrainingBtn({ showAddTrainingModal, setShowAddTrainingModal, allTrainings }: AddTrainingBtnProps) {


    return ( 
        <div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full mt-2" onClick={() => setShowAddTrainingModal(true)}>Dodaj trening</button>

            {showAddTrainingModal && (
                <div className="fixed w-screen h-screen top-0 left-0 backdrop-blur-sm bg-black bg-opacity-50 flex items-center justify-center z-50 text-white">
                    <div className=" p-5 rounded-lg w-96">
                        <h2 className="text-xl font-bold mb-4">Dodaj nowy trening</h2>
                        <div>
                            {allTrainings}
                        </div>
                        <button className="bg-red-500 text-white px-4 py-2 rounded-lg w-full" onClick={() => setShowAddTrainingModal(false)}>Zamknij</button>
                    </div>
                </div>
            )}
        </div>
     );
}

export default AddTrainingBtn;