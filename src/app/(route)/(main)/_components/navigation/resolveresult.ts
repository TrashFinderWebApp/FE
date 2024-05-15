/* eslint-disable import/prefer-default-export */
import { LocationInfo } from "@/types/trashinfo";
import { Place } from "@/types/navigate";

export const resolveKakaoResult = (
  result: Place,
): LocationInfo & { id: string } => ({
  latitude: Number(result.y),
  longitude: Number(result.x),
  address: result.road_address_name,
  name: result.place_name,
  category: result.category_group_name,
  id: result.id,
});
