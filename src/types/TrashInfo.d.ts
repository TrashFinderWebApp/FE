interface DetailedTrashCanInfo {
  id: string;
  status: "added" | "registered" | "removed" | "suggested";
}

interface OptionalTrashCanInfo {
  imageList?: string[];
  description?: string;
  name?: string;
  category?: string;
}

interface Radius {
  radius: number;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface Location extends Coordinate {
  address?: string;
  addressDetail?: string;
  distance?: number;
}

export type TrashCanInfo = Location &
  DetailedTrashCanInfo &
  OptionalTrashCanInfo;

export type LocationInfo = Location & OptionalTrashCanInfo;
export type TrashCanRequest = Coordinate &
  Radius &
  Partial<DetailedTrashCanInfo>;

export type TrashCanStatus = DetailedTrashCanInfo["status"];
