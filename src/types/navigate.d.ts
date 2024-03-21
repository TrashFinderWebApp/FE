export interface Coordinate {
  startX: number | null;
  startY: number | null;
  endX: number | null;
  endY: number | null;
}

export type Transportation = "walk" | "car" | "public";
