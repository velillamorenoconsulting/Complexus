import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const deleteImages = async (publicIds: string[]) => {
  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    return result;
  } catch (e) {
    console.error(e);
  }
};
