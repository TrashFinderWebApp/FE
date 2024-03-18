export interface TrashCan {
  lat: number;
  lng: number;
  status: "added" | "waiting" | "removed";
  image?: string;
  description?: string;
}
