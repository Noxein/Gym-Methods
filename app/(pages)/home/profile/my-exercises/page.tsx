import { getUserExercises } from "@/app/actions";
import { MyExercises } from "@/app/components/profile/my-exercises/MyExercises";
import { MetaDataTranslations } from "@/app/lib/utils";

export async function generateMetadata() {
  const t = await MetaDataTranslations()
   
    return {
      title: t('My exercises')
    };
  }

export default async function page(props:{searchParams: Promise<{showAddModal: string}>}) {
    const searchParams = await props.searchParams;
    const exercises = await getUserExercises()
    const showModal = !!(searchParams && searchParams.showAddModal || false)
    return(
        <MyExercises exercises={exercises} showAddModal={showModal}/>
    )
} 