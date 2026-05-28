'use client'
import { TraineesWithoutPlans } from "@/app/types";
import StudentAvatar from "./StudentAvatar";
import { Icon } from "../../Icon";
import { LeftAngle } from "@/app/ui/icons/ExpandIcon";
import { useRouter } from "next/navigation";

type StudentWithoutPlanProps = {
    trainee: TraineesWithoutPlans
}

function StudentWithoutPlan({ trainee }: StudentWithoutPlanProps) {

    const router = useRouter()

    const handleClick = () => {
        router.push(`/home/profile/my-trainees/${trainee.traineeid}/create`)
    }
    return ( 
        <div className="flex gap-2 cursor-pointer" onClick={handleClick}>
            <StudentAvatar info={{avatarurl: trainee.avatarurl}}/>
            <p className="mt-2">{trainee.username}</p>

            <Icon className="ml-auto self-center">
                <LeftAngle className="rotate-180" fill="#fff" height={'50px'} width={'50px'}/>
            </Icon>
        </div>
     );
}

export default StudentWithoutPlan;