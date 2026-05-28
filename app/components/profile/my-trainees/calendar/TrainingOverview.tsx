import { Input } from "@/app/components/ui/Input";
import TraineeCalendarContext from "@/app/context/TraineeCalendarContext";
import { exercisesArr } from "@/app/lib/exercise-list";
import { nameTrimmer } from "@/app/lib/utils";
import { TraineePlan } from "@/app/types";
import { isSameDay } from "date-fns";
import { useTranslations } from "next-intl";
import { useContext } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'

type TrainingOverviewProps = {
    training: TraineePlan,
    selectedDate: Date,
}

function TrainingOverview({ training, selectedDate }: TrainingOverviewProps) {

    const { plans,setPlans, setUpdatedPlansIds } = useContext(TraineeCalendarContext)!

    const handleDateChange = (date: Date | null, index: number) => {
        if(!date) return;
        const newDate = new Date(date);
        if (!isNaN(newDate.getTime())) {
            selectedDate = newDate;
        }

        let plansCopy = structuredClone(plans);
        const trainingIndex = plansCopy.findIndex(pln => pln.id === training.id);

        if (trainingIndex === -1) return;

        plansCopy[trainingIndex].plan[index].date = newDate;


        setPlans(plansCopy);
        setUpdatedPlansIds((prev) => [...prev, training.id]);

    }

    const u = useTranslations("Utils")
    const t = useTranslations("DefaultExercises")
    return ( 
        <div key={training.id} className="text-white mt-2">
            <div>{training.name}</div>

            <div>
                {training.plan.map((pln, index) => (
                    isSameDay(pln.date, selectedDate) && (
                        <div key={index} className="text-gray-400 ml-4">
                            {pln.exercises.map((exercise, exerciseIndex) => {
                                const translatedExerciseName = exercisesArr.includes(exercise.exercisename) ? t(nameTrimmer(exercise.exercisename)) : exercise.exercisename;
                                return (
                                    <div key={exercise.id}>{translatedExerciseName}</div>
                                );
                            })}
                            <div className="mt-2">
                                <DatePicker selected={pln.date} onSelect={(date) => handleDateChange(date, index)} />
                                {/* <Input labelName={u("Date")} type="date" value={new Date(pln.date).toISOString().split("T")[0]} onChange={e=>e.target.value && handleDateChange(e,index)}/> */}
                            </div>
                        </div>
                        
                    )
                ))}
            </div>
        </div>
     );
}

export default TrainingOverview;