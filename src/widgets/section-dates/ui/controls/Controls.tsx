import { FC } from "react";
import clsx from "clsx";

import { ElProps } from "@Shared/types";
import { Icon } from "@Shared/ui";

import styles from "./styles.module.scss";

const formatNumberWithZero = (num: number | string) => String(num).padStart(2, "0");

export type ControlsProps = ElProps<"div"> & {
    current: number;
    total: number;
    onArrowClick: (dir: "prev" | "next") => void;
    onDotClick: (index: number) => void;
};

export const Controls: FC<ControlsProps> = ({ className, current, total, onArrowClick, onDotClick, ...restProps }) => {
    return (
        <div className={clsx(styles.controls, className)} {...restProps}>
            <div className={styles.group}>
                <div className={styles.counter}>
                    {formatNumberWithZero(current)}/{formatNumberWithZero(total)}
                </div>

                <div className={styles.arrows}>
                    <button
                        className={styles.buttonArrow}
                        type="button"
                        aria-label="Предыдущие даты"
                        disabled={current === 1}
                        onClick={() => onArrowClick("prev")}
                    >
                        <Icon k="angleLeft" />
                    </button>

                    <button
                        className={styles.buttonArrow}
                        type="button"
                        aria-label="Следующие даты"
                        disabled={current === total}
                        onClick={() => onArrowClick("next")}
                    >
                        <Icon k="angleRight" />
                    </button>
                </div>
            </div>

            <div className={styles.dots}>
                {Array.from({ length: total }, (_, i) => i + 1).map(i => (
                    <button
                        key={i}
                        className={clsx(styles.dot, {
                            [styles.dotActive]: i === current,
                        })}
                        type="button"
                        onClick={() => onDotClick(i - 1)}
                    />
                ))}
            </div>
        </div>
    );
};
