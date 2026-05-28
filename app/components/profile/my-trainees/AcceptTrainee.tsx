import { Button } from "../../ui/Button";
import { useTranslations } from "next-intl";

type TraineeInfo = {
    id: string;
    name: string;
}

type AcceptTraineeProps = {
    traineeInfo: TraineeInfo;
    handleAddTrainee: () => void;
}

function AcceptTrainee({traineeInfo, handleAddTrainee}: AcceptTraineeProps) {
    const t = useTranslations("Home/Profile/My-Trainees")

    return ( <div>
        <h1 className="text-2xl font-medium mb-10 text-center">{t("AcceptTraineeRequest")}</h1>
        {/* List of pending requests to accept */}

        <div className="flex gap-4 mt-4 items-center justify-between px-4 bg-darkLight py-2 rounded shadow-sm shadow-black">
            <div className="font-bold">{traineeInfo.name}</div>
            <Button onClick={handleAddTrainee} className="px-4">{t("Accept")}</Button>
        </div>

    </div> );
}

export default AcceptTrainee;
