import { FC } from "react";
import clsx from "clsx";

import { ElProps } from "@Shared/types";

import styles from "./styles.module.scss";

export type EventProps = ElProps<"article"> & {
    title: string;
    text: string;
};

export const Event: FC<EventProps> = ({ className, title, text, ...restProps }) => {
    return (
        <article className={clsx(styles.event, className)} {...restProps}>
            <h3 className={styles.title}>{title}</h3>

            <p className={styles.text}>{text}</p>
        </article>
    );
};
