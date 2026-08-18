export const formatPrice = (value: number) =>
  `৳${value.toLocaleString("en-BD")}`;

export const cn = (...classes: Array<string | false | null | undefined>) =>
  classes.filter(Boolean).join(" ");
