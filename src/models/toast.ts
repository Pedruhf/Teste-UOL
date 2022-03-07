export type Toast = {
  type: string;
  message: string;
  icon?: JSX.Element;
  position: string;
  timeout: number;
}