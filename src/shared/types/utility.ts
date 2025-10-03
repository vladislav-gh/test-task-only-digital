import type { ComponentPropsWithRef, ElementType } from "react";

export type ElProps<T extends ElementType, O extends string = ""> = Omit<ComponentPropsWithRef<T>, O>;
