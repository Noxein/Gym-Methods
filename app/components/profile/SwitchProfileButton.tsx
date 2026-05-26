'use client'
import { useTranslations } from "next-intl";
import { Icon } from "../Icon";
import { switchAccount } from "@/app/actions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserPurposeType } from "@/app/types";

interface button extends React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  text: string,
  children: React.ReactNode,
  purpose: UserPurposeType
  trainercurrentaccounttype?: string | null
}

function SwitchProfileButton({text, children,purpose, trainercurrentaccounttype, ...rest}:button) {
    const u = useTranslations("Utils")

    const router = useRouter()

    const { update } = useSession();

    const handleSwitchAccount = async () => {
        await switchAccount()

        const newType:UserPurposeType = trainercurrentaccounttype === 'Trener' ? 'Casual' : 'Trener'
        await update({purpose: newType})

        router.push('/home')
    }
  return(
        <button {...rest} className={`w-full bg-borderInteractive text-marmur border-borderInteractive border-2 text-center rounded-lg text-xl flex relative`} onClick={handleSwitchAccount}>
        {/* <div className="absolute text-sm -top-2 left-2 bg-dark px-2"> {u('New')} !</div> */}
        <span className={`bg-dark flex-1 py-3 rounded-lg`}>
          {text}
        </span>
        <Icon className="px-1 flex items-center">
          {children}
        </Icon>
      </button>
      )
}

export default SwitchProfileButton;