export const TrashCanStatusList = [
  "ADDED",
  "REGISTERED",
  "REMOVED",
  "SUGGESTED",
] as const;

export type TrashCanStatus = (typeof TrashCanStatusList)[number];

interface DetailedTrashCanInfo {
  trashcanId: string;
  status: TrashCanStatus;
}

interface OptionalTrashCanInfo {
  imageUrls?: string[];
  description?: string[];
  name?: string;
  category?: string;
  views?: number;
  createdAt?: string;
  count?: number;
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
