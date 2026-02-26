"use client"
import { useEffect, useRef, useState } from "react";
import { CenterComponent } from "@/app/components/CenterComponent";
import { Input } from "../../ui/Input";
import Navigator from "../Navigator";
import { FirstSetupFirstStep } from "@/app/types";
import { setCookie, updateTraineeInfo, userID } from "@/app/actions";
import { WSString } from "@/app/lib/utils";
import { Button } from "../../ui/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AccesCode from "../../ui/AccesCode";

type TraineeProps = {
    setCurrentStep: React.Dispatch<React.SetStateAction<FirstSetupFirstStep>>,
    jwt?: string
}
function Trainee({setCurrentStep,jwt}: TraineeProps) {

    const ws = useRef<WebSocket | null>(null);
    const[stateOfWs,setStateOfWs] = useState<'idle'|'waitingForResponse'|'error'|'finish'>('idle');
    const navigation = useRouter()

    const handleTraineeSave = async() => {
        // update db with trainee info

        await updateTraineeInfo()
        navigation.push('/home');
    }

    useEffect(() => {
        ws.current = new WebSocket(WSString);
        ws.current.onopen = async () => {
            ws.current?.send(JSON.stringify({type:"SET_JWT", userid: await userID(),requstedKey: true}))
        };
        ws.current.onclose = () => console.log("ws closed");

        ws.current.onmessage = async (event) => {
            const message = JSON.parse(event.data);
            console.log("ws message:", message);
            if(message.type === "SET_JWT_SUCCESS"){
                await setCookie('jwt', message.token);
            }

            if(message.type === "TRAINEE_CONNECT_CORRECT"){
                setStateOfWs('waitingForResponse');
            }

            if(message.type === "PAIRING_SUCCESS"){
                setStateOfWs('finish');
                handleTraineeSave()
            }

            if(message.type === "RESET_TRAINING_CODE"){
                setStateOfWs('idle');
                setTrainerCode(['','','','','','']);
                setCurrentIndex(0);
            }
        }

        const wsCurrent = ws.current;

        return () => {
            wsCurrent.close();
        };
    }, []);
    
    const[trainerCode,setTrainerCode] = useState<string[]>(['','','','','','']);
    const[currentIndex,setCurrentIndex] = useState<number>(0);

    const handleNext = async () => {
        if(!ws.current) return;
        console.log('jwt', jwt);
        const fullCode = trainerCode.join('');
        ws.current.send(JSON.stringify({type:"TRAINEE_CONNECT_CODE", code: fullCode}));
    };
    

    const handleBack = () => {
        setCurrentStep('purpose');
    }

    const handleInputChange = (e:React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key === 'Backspace'){
            if(currentIndex===0 && trainerCode[0]==='') return;
            const newTrainerCode = [...trainerCode];

            if(trainerCode[currentIndex]===''){
                newTrainerCode[currentIndex-1] = '';
                setTrainerCode(newTrainerCode);
                setCurrentIndex(currentIndex-1);
            } else {
                newTrainerCode[currentIndex] = '';
                setTrainerCode(newTrainerCode);
            }
            return
        }
        if(currentIndex>=5) {
            const fullCode = trainerCode.join('') + e.key.toUpperCase();
            ws.current?.send(JSON.stringify({type:"TRAINEE_CONNECT_CODE", code: fullCode}));

        };
        const value = e.key.toUpperCase();
        console.log(value)

        const newTrainerCode = [...trainerCode];
        newTrainerCode[currentIndex] = value;
        setTrainerCode(newTrainerCode);
        if(currentIndex < 5) {
            setCurrentIndex(currentIndex + 1);
        }
    }


    return ( 
        <CenterComponent className="justify-center items-center">
            <div className="text-white w-full px-5 flex flex-col gap-6">
                { stateOfWs === 'idle' && <div>
                    <h1 className="text-3xl font-medium mb-10 text-center">Podaj kod trenera</h1>

                    <div className="flex justify-between gap-4 relative">
                        <input className='opacity-0 absolute w-full h-12' onKeyDown={handleInputChange} autoFocus/>

                        {trainerCode.map((codeChar,idx)=>(
                            <div key={idx} className="border p-2 flex-1 rounded border-notSelected text-2xl text-center font-mono shadow-md shadow-black">
                                {currentIndex===idx&&currentIndex<5&&<span className="blinking-cursor">|</span>}
                                {codeChar}
                                
                            </div>
                        ))}
                    </div>
                </div>}

                { stateOfWs === 'waitingForResponse' && <div>
                    <h1 className="text-3xl font-medium mb-10 text-center">Czekam na odpoweiedź trenera... </h1>
                </div>}
                
                { stateOfWs === 'finish' && <div>
                    <h1 className="text-3xl font-medium mb-10 text-center">Połączono z trenerem! </h1>

                    <p>Zaraz zostaniesz przeniesiony do strony głównej.</p>
                </div>}


                <Navigator 
                    next={handleNext}
                    prev={handleBack}
                />
            </div>
        </CenterComponent>
 );
}

export default Trainee;