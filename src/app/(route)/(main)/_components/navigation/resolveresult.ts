/* eslint-disable import/prefer-default-export */
import { Location, Place } from "@/types/navigate";

export const resolveKakaoResult = (result: Place): Location => ({
  latitude: Number(result.y),
  longitude: Number(result.x),
  address: result.road_address_name,
  name: result.place_name,
  id: result.id,
  category: result.category_group_name,
});
