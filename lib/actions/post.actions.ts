"use server"

import { Supermercado_One } from "next/font/google";
import Post from "../models/post.model";
import { connectToDB } from "../mongoose";
import { revalidatePath } from "next/cache";
import User from "../models/user.model";

interface Params {
    text: string,
    author: string,
    communityId: string | null,
    path: string,
}


export async function CreatePost({ text, author, communityId, path }: Params) {
    try {
        connectToDB();

        const createdPost = await Post.create({
            text,
            author,
            community: null,
        });

        await User.findByIdAndUpdate(author, {
            $push: { posts: createdPost._id }
        })

        revalidatePath(path);

    } catch (error: any) {
        throw new Error('Error creating post: ${error.message}')
    }

};