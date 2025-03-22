import { v2 as cloudinary } from "cloudinary";
import { ApplicationError } from "@/app/api/utils/errors";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteImages = async (publicIds: string[]) => {
  try {
    return await cloudinary.api.delete_resources(publicIds);
  } catch (e) {
    throw new ApplicationError(
      `Error deleting images: ${(e as Error).message}`,
    );
  }
};
