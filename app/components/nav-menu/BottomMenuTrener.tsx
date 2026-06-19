import { HomeIcon, PlanIcon, ProfileIcon, UsersIcon } from "@/app/ui/icons/ExpandIcon";
import { MenuBtn } from "./MenuBtn";

function BottomMenuTrener() {
    return ( 
            <nav className={`flex fixed bottom-0 justify-between z-40 max-w-mobile w-full mx-auto bg-menubar py-6 border-t-white `}>
                <MenuBtn hrefTo={'/home'}>
                    <HomeIcon />
                </MenuBtn>
        
                <MenuBtn hrefTo={'/home/profile/my-trainees'}>
                    <UsersIcon fill='#D9D9D9'/>
                </MenuBtn>

                <MenuBtn hrefTo={'/home/profile/my-trainees/schemas'}>
                    <PlanIcon fill='#D9D9D9' height="35px" width="35px"/>
                </MenuBtn>
        
                <MenuBtn hrefTo={'/home/profile'}>
                    <ProfileIcon fill='#D9D9D9'/>
                </MenuBtn>
            </nav>
     );
}

export default BottomMenuTrener;