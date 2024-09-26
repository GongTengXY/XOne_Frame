/* css module */
declare module "*.css" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.less" {
  const content: { [className: string]: string };
  export default content;
}

declare module "*.scss" {
  const classes: { [key: string]: string };
  export default classes;
}

declare module "*.sass" {
  const classes: { [key: string]: string };
  export default classes;
}

/* Images */
declare module "*.svg" {
  const ref: string;
  export default ref;
}

declare module "*.bmp" {
  const ref: string;
  export default ref;
}

declare module "*.gif" {
  const ref: string;
  export default ref;
}

declare module "*.jpg" {
  const ref: string;
  export default ref;
}

declare module "*.jpeg" {
  const ref: string;
  export default ref;
}

declare module "*.png" {
  const ref: string;
  export default ref;
}
