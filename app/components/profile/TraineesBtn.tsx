'use client'
import { UsersIcon } from "@/app/ui/icons/ExpandIcon";
import { LinkBtn } from "./LinkBtn";
import { useTranslations } from "next-intl";

function TraineesBtn() {
      const width = '30px'
  const height = '30px'

  const t = useTranslations("Home/Profile")

    return ( 
        <LinkBtn href='/home/profile/my-trainees' text={t("Trainees")}>
            <UsersIcon width={width} height={height} fill='#fff'/>
        </LinkBtn>
     );
}

export default TraineesBtn;