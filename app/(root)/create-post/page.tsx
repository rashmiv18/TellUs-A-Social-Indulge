import CreatePost from "@/components/forms/Post";
import { ImageUpload } from "@/components/image-upload";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import {redirect} from 'next/navigation';
import { useState } from "react";

async function Page() {
    const user = await currentUser();
    if(!user)return null;

    const userInfo = await fetchUser(user.id);
    console.log('User Info:', userInfo);
    if(!userInfo?.onboarded) redirect('/onboarding');
    return(
        <>
        
        <h1 className="head-text">Create Post</h1>
        <h1 className="text-base-semibold text-light-1">Photo</h1>
        <ImageUpload />
        <CreatePost userId={userInfo._id}/>
        </> 
    )
}

export default Page;