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

export interface Location {
  lat: number;
  lng: number;
  address: string;
  address_detail?: string;
  distance?: number;
}

export type TrashCanInfo = Location &
  DetailedTrashCanInfo &
  OptionalTrashCanInfo;

export type LocationInfo = Location & OptionalTrashCanInfo;
