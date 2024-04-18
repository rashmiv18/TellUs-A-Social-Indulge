import { createUploadthing, type FileRouter } from "uploadthing/next";
import { currentUser } from "@clerk/nextjs"; 

const f = createUploadthing();
 
const getUser = async () => await currentUser();
 
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  media: f({ image: { maxFileSize: "4MB"} })
    .middleware(async ({ req }) => {
      // This code runs on your server before upload
      const user = await getUser();
 
      // If you throw, the user will not be able to upload
      if (!user) throw new Error("Unauthorized");
 
      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload
      console.log("Upload complete for userId:", metadata.userId);
 
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),

  // Add a new endpoint named "Ankit" with its configurations
  imageUploader: f({ 
    // Specify the allowed file types and maximum file size
    // For example, allow only images with a max size of 4MB
    image: { maxFileSize: "4MB" } 
  })
    .middleware(async ({ req }) => {
      // Add any necessary middleware logic here
      // This code runs before upload
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // Add any logic needed after upload is complete
    }),
};

export type OurFileRouter = typeof ourFileRouter;