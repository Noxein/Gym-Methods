import { TraineesAndTrainings } from "@/app/types";
import Student from "./Student";
import { useTranslations } from "next-intl";

type MyStudentsProps = {
    trainings: TraineesAndTrainings[]
}

function MyStudents({ trainings }: MyStudentsProps) {
    const t = useTranslations("Home/TrainerHome")
    console.log('trainings', trainings);
    
    return ( 
        <div className="w-full text-white mt-10 px-5">
            <h1 className="text-center text-2xl font-semibold">{t("MyStudents")}</h1>

            <div className="flex flex-col gap-4">
                {trainings.map(info => (
                    <Student key={info.id} info={info}/>
                ))}
            </div>

        </div>
     );
}

export default MyStudents;
