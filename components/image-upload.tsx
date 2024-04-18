'use client'

import { UploadButton, UploadDropzone } from "@/src/utils/uploadthing"
import Image from "next/image";
import { useState } from "react"

export const ImageUpload = () => {
 const [imageUrl, setImageUrl] = useState<string>('')
  return (
    <div>
    <UploadDropzone endpoint='media' 
    onClientUploadComplete={(res) => {
      console.log("Files: ", res);
      alert("Upload Completed");
      setImageUrl(res[0].url);
    }}
    onUploadError={(error: Error) => {
      alert(`ERROR! ${error.message}`);
    }} />

    {imageUrl.length ? <div>
      <Image src={imageUrl} alt='my image' width={500} height={300}/>
      </div> : null}
    </div>
  );
};
