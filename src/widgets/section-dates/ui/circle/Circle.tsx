import { CSSProperties, FC } from "react";
import clsx from "clsx";

import { ElProps } from "@Shared/types";

import styles from "./styles.module.scss";

export type CircleProps = ElProps<"div"> & {
    currentIndex: number;
    items: string[];
    onItemClick: (index: number) => void;
};

export const Circle: FC<CircleProps> = ({ className, currentIndex, items, onItemClick, ...restProps }) => {
    return (
        <div
            className={clsx(styles.circle, className)}
            style={{ "--count": items.length } as CSSProperties}
            {...restProps}
        >
            <div className={styles.inner} style={{ "--current-index": currentIndex } as CSSProperties}>
                {items.map((item, index) => (
                    <button
                        key={item + index}
                        className={clsx(styles.item, {
                            [styles.itemActive]: index === currentIndex,
                        })}
                        style={
                            {
                                "--index": index,
                            } as CSSProperties
                        }
                        type="button"
                        onClick={() => onItemClick(index)}
                    >
                        <span className={styles.itemInner}>{index + 1}</span>

                        <span className={styles.itemText}>{item}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
