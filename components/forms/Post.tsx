"use client"

import { useForm } from "react-hook-form";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage, } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { PostValidation } from "@/lib/validations/post";
import { CreatePost } from "@/lib/actions/post.actions";
import { useOrganization } from "@clerk/nextjs";
import ImageUpload from "../image-upload";
import { SetStateAction, useState } from "react";
import { Button } from "../ui/button";

interface Props {
  user: {
    id: string;
    objectId: string;
    username: string;
    name: string;
    bio: string;
    image: string;
  };
  btnTitle: string;
}

function Post({ userId }: { userId: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const { organization } = useOrganization();
  const [imageUrl, setImageUrl] = useState<string>("");

  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      post: "",
      accountId: userId,
    },
  });

  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    await CreatePost({
      text: values.post,
      imageLink: imageUrl,
      author: userId,
      communityId: organization ? organization.id : null,
      path: pathname,
    });
    router.push("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values) => onSubmit(values))} className="mt-10 flex flex-col justify-start gap-10">
        <FormField
          control={form.control}
          name="post"
          render={({ field }) => (
            <FormItem className="flex flex-col w-full gap-3">
              <FormLabel className="text-base-semibold text-light-1">Content</FormLabel>
              <FormControl className="no-focus border border-dark-4 bg-dark-2 text-light-2">
                <Textarea rows={15} {...field} />
              </FormControl>
              <FormLabel className="text-base-semibold text-light-1">Photo</FormLabel>
              <ImageUpload onImageUpload={(url: SetStateAction<string>) => setImageUrl(url)} />
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="bg-primary-500">
          Create Post
        </Button>
      </form>
    </Form>
  );
};

export default Post;

