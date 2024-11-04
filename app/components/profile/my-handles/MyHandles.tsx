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
    useEffect(()=>{
        console.log(currentSelectedHanle.current)
    },[currentSelectedHanle.current])

    const handleClickListElement = (handle: {id:string,handlename:string}) => {
        setSelectedHandle(handle)
        setShowEditModal(true)
    }
  return (
    <div className="mx-5 mt-20 text-white">
    <h1 className='text-2xl text-center pb-10'>
        Moje uchwyty
    </h1>

    <div className='flex flex-col gap-2'>
        <ButtonWithIcon className='bg-green' isPrimary buttonText='Dodaj nowy uchwyt' childrenIcon={
            <Icon className='flex justify-center items-center px-1'>
                <PlusIcon />
            </Icon>
        }
        onClick={()=>setShowAddModal(true)}
        />

        {handles.map(handle=>(
            <ListElement 
                key={handle.id}
                elementName={handle.handlename} 
                onClick={()=>handleClickListElement(handle)}
                childrenIcon={
                    <button onClick={(e)=>{e.stopPropagation();setSelectedHandle(handle);handleDeleteItem(handle.id)}}>
                        <Icon className='flex justify-center items-center px-1'>
                            <TrashIcon />
                        </Icon>
                    </button>
                }
                /> 
        ))}
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