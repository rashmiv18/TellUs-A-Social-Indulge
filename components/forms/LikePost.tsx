"use client";
import { useState } from "react";
import Image from "next/image";

interface LikePostProps {
  postId: string;
}

function LikePost({ postId }: LikePostProps) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    // Here, you can make an API call or update state to handle liking the post
    setIsLiked((prev) => !prev);
  };

  return (
    <Image
      src={isLiked ? "/assets/heart-red.svg" : "/assets/heart-gray.svg"}
      alt="heart"
      width={24}
      height={24}
      className="cursor-pointer object-contain"
      onClick={handleLike}
    />
  );
}

export default LikePost;
