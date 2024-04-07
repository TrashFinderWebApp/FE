interface DetailedTrashCanInfo {
  id: string;
  status: "added" | "waiting" | "removed";
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
  lat: number;
  lng: number;
}

export interface Location extends Coordinate {
  address: string;
  address_detail?: string;
  distance?: number;
}

export type TrashCanInfo = Location &
  DetailedTrashCanInfo &
  OptionalTrashCanInfo;

export type LocationInfo = Location & OptionalTrashCanInfo;
export type TrashCanRequest = Coordinate &
  Radius &
  Partial<DetailedTrashCanInfo>;
