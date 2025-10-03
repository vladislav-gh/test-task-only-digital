import { FC } from "react";
import clsx from "clsx";

import { ElProps } from "@Shared/types";
import { Icon, IconProps } from "@Shared/ui";

import styles from "./styles.module.scss";

export type ButtonArrowProps = ElProps<"button"> & {
    icon: IconProps["k"];
};

export const ButtonArrow: FC<ButtonArrowProps> = ({ className, icon, ...restProps }) => {
    return (
        <button className={clsx(styles.buttonArrow, className)} {...restProps}>
            <Icon k={icon} />
        </button>
    );
};
