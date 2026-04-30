import { TraineesAndTrainings } from "@/app/types";
import Student from "./Student";

type MyStudentsProps = {
    trainings: TraineesAndTrainings[]
}

function MyStudents({ trainings }: MyStudentsProps) {
    console.log('trainings', trainings);
    
    return ( 
        <div className="w-full text-white mt-10">
            <h1 className="text-center text-2xl font-semibold">MY STUDENTS</h1>

            <div className="flex flex-col gap-4">
                {trainings.map(info => (
                    <Student key={info.id} info={info}/>
                ))}
            </div>

        </div>
     );
}

export default MyStudents;