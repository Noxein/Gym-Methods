import { TraineePlan } from "@/app/types";

type SelectDatesForTrainingModalProps = {
    training: TraineePlan // tutaj powinien być typ treningu, ale nie mam jeszcze zdefiniowanego, więc daję any
}

function SelectDatesForTrainingModal({ training }: SelectDatesForTrainingModalProps) {
    return ( 
        <div className="">
            {training.name}

            <div>
                {training.plan.map(plan=>(
                    <div key={plan.id}>
                        {plan.name}
                    </div>
                ))}
            </div>
        </div>
     );
}

export default SelectDatesForTrainingModal;