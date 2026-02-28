import { NextResponse } from "next/server";
import cloudinary from "cloudinary";
import { blob } from "stream/consumers";
import { updateAvatar } from "@/app/actions";


cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function POST(request: Request) {
    try{
        const formData = await request.formData();
        const file = formData.get('string') as string; // base64 string

        if(!file){
            return NextResponse.json({ success: false, message: "No file uploaded" }, { status: 400 });
        }
        //here cloudinary upload logic
        
        const uploadResult = await cloudinary.v2.uploader.upload(file, {
            folder: "avatars",
            public_id: `avatar_${Date.now()}`,
            overwrite: true,
            resource_type: "image"
        }).then(async result=>{
            const publicID = result.public_id;
            const secureUrl = result.secure_url;
            
            await updateAvatar(secureUrl, publicID);

            return NextResponse.json({ success: true, message: "Image uploaded successfully" }, { status: 200 });
        });
        return NextResponse.json({ success: true, data: uploadResult });
    }catch(err){
        console.log(err)
            return NextResponse.json({ success: false, message: "Something went wrong" }, { status: 500 });
    }
}

