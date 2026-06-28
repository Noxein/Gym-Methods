import { getCookie, setCookie, userID } from "@/app/actions";
import { WSString } from "@/app/lib/utils";
import { get } from "http";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import AcceptTrainee from "./AcceptTrainee";
import AccesCode from "../../ui/AccesCode";
import { SmallLoaderDiv } from "../../ui/SmallLoaderDiv";
import { Button } from "../../ui/Button";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

function AddTraineeModal() {
    const t = useTranslations("Home/Profile/My-Trainees")
    const u = useTranslations("Utils")

    const ws = useRef<WebSocket | null>(null);
    const navigation = useRouter()

    const[key,setKey] = useState<string>('');
    const[processStep,setProcessStep] = useState<'generateKey' | 'acceptTrainee' | 'finish'>('generateKey');
    const[traineeInfo,setTraineeInfo] = useState<{id:string,name:string}>({id:'1',name:'qwe@qwe.com'});
    const[loadingKey,setLoadingKey] = useState<boolean>(true);
    
    useEffect(() => {
        ws.current = new WebSocket(`${WSString}/pairUsers`);
        ws.current.onopen = async () => {
            ws.current?.send(JSON.stringify({type:"SET_JWT", userid: await userID(), requestedKey: true}))
            //comes back ws.onmessage with jwtoken 
        };
        ws.current.onclose = () => console.log("ws closed");

        ws.current.onmessage = async (event) => {
            const message = JSON.parse(event.data);

            if(message.type === "PAIR_SUCCESSFULLY"){
                setProcessStep('acceptTrainee');
                setTraineeInfo(message.traineeInfo);
            }

            console.log("ws message:", message);

            if(message.type === "SET_JWT_SUCCESS"){
                await setCookie('jwt', message.token);
                // should also contain random genetated 6 key code to connect trainee with trainer
                setKey(message.requestedKey);
                setLoadingKey(false);
            }

            if(message.type === "SET_JWT_FAILURE"){
                console.log("JWT setting failed in AddTraineeModal ws");
            }

            if(message.type === "PAIRING_FAILURE"){
                console.log("Pairing failed in AddTraineeModal ws");
            }

            if(message.type === "PAIRING_SUCCESS"){
                console.log("Trainee connected successfully");
                setProcessStep('finish');
            }
        }

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, []);

    const handleAddTrainee = async () => {
        ws.current?.send(JSON.stringify({type:"CONFIRM_PAIRING",jwt: await getCookie('jwt'),code: key}));
    }
    return ( 
        <div onClick={e=>e.stopPropagation()} className="w-full max-w-mobile mx-5">
            {processStep === 'generateKey' && <div>
                    <h1 className="text-3xl font-medium mb-10 text-center">{t("YourTrainerCode")}</h1>
                    {loadingKey && <SmallLoaderDiv loading />}
                    <AccesCode trainerCode={key}/>
                </div>}

            {processStep === 'acceptTrainee' && <AcceptTrainee traineeInfo={traineeInfo} handleAddTrainee={handleAddTrainee} />}

            {processStep === 'finish' && <div>
                <h1 className="text-3xl font-medium mb-10 text-center">{t("TraineeAddedSuccessfully")}</h1>

                <div className="flex gap-4">
                    <Button className="flex-1" isPrimary onClick={()=>navigation.push(`/home/profile/my-trainees/${traineeInfo.id}/create`)}>{u("AddTraining")}</Button>
                    <Button className="flex-1" isPrimary onClick={()=>navigation.push('/home')}>{u("Homepage")}</Button>
                </div>

            </div>}

        </div>
     );
}

export default AddTraineeModal;
