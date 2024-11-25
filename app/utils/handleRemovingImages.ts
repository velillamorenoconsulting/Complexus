import axios from "axios";
import { ServerResponse } from "../types/responses";
import { Event } from "../api/entities/event.entity";

export async function handleRemovingImages(
  originalImageList: string[],
  eventId: string,
) {
  try {
    const { data } = await axios.get<ServerResponse<Event>>(
      `${process.env.NEXT_PUBLIC_BE_URL}/event/${eventId}`,
    );
    const newImageList: string[] = data.message.images;
    const imagesToRemove: string[] = originalImageList.filter(
      (image) => !newImageList.includes(image),
    );
    if (imagesToRemove.length) {
      const publicIds: string[] = imagesToRemove.map(
        (imgLink) => imgLink.split("/").pop()!.split(".")[0],
      );

      const { data: result } = await axios.delete(
        `${process.env.NEXT_PUBLIC_BE_URL}/cloudinary`,
        { data: { publicIds } },
      );

      console.log("Images have been removed with success", result);
    }
  } catch (error: any) {
    console.log("There was an error removing the images: ", error);
  }
}
