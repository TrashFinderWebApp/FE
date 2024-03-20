import { Transportation } from "./navigate";

export interface ButtonProps {
  content: string;
  type: Transportation;
  icon?: string;
  // eslint-disable-next-line no-unused-vars
  iconComponent?: (...args: any[]) => JSX.Element;
}
