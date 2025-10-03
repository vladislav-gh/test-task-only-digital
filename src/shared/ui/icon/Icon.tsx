import { FC } from "react";
import clsx from "clsx";

import { ElProps } from "@Shared/types";

import { IconsCollection, IconsKeys } from "./collection";
import styles from "./styles.module.scss";

export type IconProps = ElProps<"svg"> & {
    k: IconsKeys;
};

export const Icon: FC<IconProps> = ({ className, k, ...restProps }) => {
    const Component = IconsCollection[k];

    if (!Component) {
        return null;
    }

    return <Component className={clsx(styles.icon, className)} {...restProps} />;
};
