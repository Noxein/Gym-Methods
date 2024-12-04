import { useTranslations } from 'next-intl'
import { Icon } from '../Icon'
import { EyeIcon } from '@/app/ui/icons/ExpandIcon'

type ShowHistoryButtonTypes = {
    setShowHistory: React.Dispatch<React.SetStateAction<boolean>>,
    isOpen: boolean,
    loading?: boolean,
}

export const ShowHistoryButton = ({setShowHistory,isOpen,loading}:ShowHistoryButtonTypes) => {
  const t = useTranslations("Home/Add-Exercise/[Exercise-Name]")
  return (
    <button className='bg-dark border-[2px] border-steel text-white p-[1px] w-full rounded-lg flex items-center gap-2 mt-5' onClick={()=>setShowHistory(x=>!x)} disabled={loading}>
        <div className='py-3 bg-dark rounded-lg pl-8 flex-1 text-left'>
            {t("ExerciseHistory")}
        </div>
        <Icon>
          <EyeIcon isOpen={isOpen} />
        </Icon>
    </button>

  )
}