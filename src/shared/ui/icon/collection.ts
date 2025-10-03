import AngleLeft from "./images/angle-left.svg";
import AngleRight from "./images/angle-right.svg";

export const IconsCollection = {
    angleLeft: AngleLeft,
    angleRight: AngleRight,
} as const;

export type IconsKeys = keyof typeof IconsCollection;
