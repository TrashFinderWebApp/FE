export interface ButtonProps<T> {
  content: string;
  type: T;
  icon?: string;
  // eslint-disable-next-line no-unused-vars
  iconComponent?: (...args: any[]) => JSX.Element;
}
