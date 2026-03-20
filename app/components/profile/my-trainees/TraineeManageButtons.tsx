'use client'
import { useRouter } from "next/navigation";
import { Button } from "../../ui/Button";

function TraineeManageButtons({id}:{id:string}) {

    const router = useRouter()

    return ( 
        <>
            <Button className="px-2 border-0 mt-4" onClick={() => router.push(`/home/profile/my-trainees/${id}/calendar`)}>Zarządzaj kalendarzem</Button>
            <Button className="px-2 border-0" onClick={() => router.push(`/home/profile/my-trainees/${id}/create`)}>Stwórz nowy trening</Button>
            <Button className="px-2 border-0" onClick={() => router.push(`/home/profile/my-trainees/${id}/history`)}>Historia treningów</Button>
        </>
     );
}

export default TraineeManageButtons;