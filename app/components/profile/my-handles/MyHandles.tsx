'use client'
import { useEffect, useRef, useState } from 'react'
import { ListElement } from '../../ui/ListElement';
import { Icon } from '../../Icon';
import { PlusIcon, TrashIcon } from '@/app/ui/icons/ExpandIcon';
import { ButtonWithIcon } from '../../ui/ButtonWithIcon';
import { BlurBackgroundModal } from '../../BlurBackgroundModal';
import { DeleteHandleModal } from './DeleteHandleModal';
import { AddHanleModal } from './AddHandleModal';
import { EditHanleModal } from './EditHandleModal';
import { useTranslations } from 'next-intl';
import { handleTypes } from '@/app/lib/exercise-list';

type MyHandlesTypes = {
    handles: {
        id: string;
        handlename: string;
    }[]
}
export const MyHandles = ({handles}:MyHandlesTypes) => {
    const currentSelectedHanle = useRef<{id:string,handlename:string}>()

    const[showDeleteModal,setShowDeleteModal] = useState(false)
    const[showAddModal,setShowAddModal] = useState(false)
    const[showEditModal,setShowEditModal] = useState(false)


    const handleDeleteItem = (id:string) => {
        setShowDeleteModal(true)
    }
    const setSelectedHandle = (handle:{id:string,handlename:string}) => {
        currentSelectedHanle.current =  handle
    }

    const handleClickListElement = (handle: {id:string,handlename:string}) => {
        setSelectedHandle(handle)
        setShowEditModal(true)
    }
    const t = useTranslations("Home/Profile/My-Handles")
    const h = useTranslations("Handles")
  return (
    <div className="mx-5 mt-20 text-white">
    <h1 className='text-2xl text-center pb-10'>
        {t("MyHandles")}
    </h1>

    <div className='flex flex-col gap-2'>
        <ButtonWithIcon className='bg-green' isPrimary buttonText={t("AddNewHandle")} childrenIcon={
            <Icon className='flex justify-center items-center px-1'>
                <PlusIcon />
            </Icon>
        }
        onClick={()=>setShowAddModal(true)}
        />

        {handles.map(handle=>{
            const handleName = handleTypes.includes(handle.handlename) ? h(handle.handlename) : handle.handlename
            return <ListElement 
                key={handle.id}
                elementName={handleName} 
                onClick={()=>handleClickListElement(handle)}
                childrenIcon={
                    <button onClick={(e)=>{e.stopPropagation();setSelectedHandle(handle);handleDeleteItem(handle.id)}}>
                        <Icon className='flex justify-center items-center px-1'>
                            <TrashIcon />
                        </Icon>
                    </button>
                }
                /> 
})}
    </div>

    {showDeleteModal && <BlurBackgroundModal>
        <DeleteHandleModal handle={currentSelectedHanle.current} hideModal={setShowDeleteModal}/>
    </BlurBackgroundModal>}

    {showAddModal && <BlurBackgroundModal>
        <AddHanleModal hideModal={setShowAddModal}/>
    </BlurBackgroundModal>}

    {showEditModal && <BlurBackgroundModal>
        <EditHanleModal hideModal={setShowEditModal} handle={currentSelectedHanle.current}/>
    </BlurBackgroundModal>}
   
</div>
  )
}