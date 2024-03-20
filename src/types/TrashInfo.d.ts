export interface TrashCan {
  title?: string;
  lat: number;
  lng: number;
  status: "added" | "waiting" | "removed";
  address?: string;
  imageList?: string[];
  description?: string;
}
