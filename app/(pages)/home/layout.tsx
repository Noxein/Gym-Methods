import { BottomMenuCasual } from "@/app/components/nav-menu/BottomMenuCasual";
import PurposeMenu from "@/app/components/nav-menu/PurposeMenu";
import { auth } from "@/auth";
  
export default async function HomeLayout({children}:{children:React.ReactNode}){
    const userData = await auth()
    const userPurpose = userData?.user.purpose
    const trainercurrentaccounttype = userData?.user.trainercurrentaccounttype
    console.log(trainercurrentaccounttype)
    return(
        <div >
            <div>{children}</div>
            <PurposeMenu purpose={userPurpose} trainercurrentaccounttype={trainercurrentaccounttype}/>
        </div>
    )
}