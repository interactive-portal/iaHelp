export type ObjectLight = {
  value?: string;
  icon?: string;
  className?: string;
  style?: React.CSSProperties;
};

export type ObjectFull = {
  title?: ObjectLight;
  description?: ObjectLight;
  mainImage?: ObjectLight;
};

export type CloudinaryProvider =
  | "motonews"
  | "motoautozar1"
  | "motoautozar2"
  | "motoautozar3";
