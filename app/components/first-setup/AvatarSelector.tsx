'use client';
import { useEffect, useRef, useState } from 'react';
import Navigator from "@/app/components/first-setup/Navigator";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop";
import { getCroppedImg } from '@/app/lib/utils';
import { PictureIcon } from '@/app/ui/icons/ExpandIcon';
import { useTranslations } from 'next-intl';
import { ErrorDiv } from '../ui/ErrorDiv';
import { CenterComponent } from '../CenterComponent';

type AvatarSelectorProps = {
    setCurrentStep: React.Dispatch<React.SetStateAction<'language' | 'setavatar' | 'purpose' | 'final'>>
}


    
function AvatarSelector({ setCurrentStep }: AvatarSelectorProps) {

    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const[file,setFile] = useState<File | null>(null)
    const[imageUrl,setImageUrl] = useState<string>('')
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
    const[loading,setLoading] = useState(false)
    const[error,setError] = useState<string>('')

    const t = useTranslations('FirstSetup')
    const e = useTranslations('Errors')

    const inputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFile(file);
        setImageUrl(file ? URL.createObjectURL(file) : '');
    }
    
    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    const blobToDataUrl = (blob: Blob) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });

    const handleDoneCrop = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(loading) return;
        if(error) setError('')
        setLoading(true)

        if (croppedAreaPixels && imageUrl) {
            
            const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
            const base64 = await blobToDataUrl(croppedImage) as string;

            const formData = new FormData();      
            formData.append('string', base64);

            const response = await fetch("/api/upload-avatar", {
                method: "POST",
                body: formData
            });

            if(!response.ok) {
                setError(e("Failed to upload avatar"));
                setLoading(false);
                return;
            }
            setLoading(false)
        }
        setCurrentStep('purpose')
        event.preventDefault()
    }

    const handlePrev = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if(loading) return;
        if(imageUrl) {
            URL.revokeObjectURL(imageUrl)
            return setImageUrl('')
        }
        setCurrentStep('language')
        event.preventDefault()
    }


    return ( 
    <CenterComponent>
        <input type="file" accept='image/*' onChange={handleFileChange} ref={inputRef} className='invisible'/>

        <div className='flex items-center justify-center '>
            <button  className='text-white flex' onClick={() => inputRef.current?.click()}>
                {imageUrl ? t('Change Image') : t('Upload Image')}
                <PictureIcon className='w-6 h-6 ml-2 mx-auto' fill='#fff' />
            </button>
        </div>


        <div className='mt-20'>

        {imageUrl && <Cropper
            style={{containerStyle:{width: '100%', height: '50vh', position: 'relative'}}}
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={1/1}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
        />}
        </div>

        <ErrorDiv error={error} />
        
        <Navigator 
            prev={handlePrev}
            next={handleDoneCrop}
            loading={loading}
        />
    </CenterComponent> );
}

export default AvatarSelector;