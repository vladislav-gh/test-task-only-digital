import { FC, ReactNode } from "react";
import clsx from "clsx";

import { ElProps } from "@Shared/types";

import { Controls } from "./controls";
import { Events } from "./events";
import styles from "./styles.module.scss";

type DataItemEvent = {
    year: number;
    text: string;
};

type DateItem = {
    name: string;
    yearStart: number;
    yearEnd: number;
    events: DataItemEvent[];
};

type SectionDatesData = DateItem[];

export type SectionDatesProps = ElProps<"section"> & {
    title?: ReactNode;
    data: SectionDatesData;
};

export const SectionDates: FC<SectionDatesProps> = ({
    className,
    title = (
        <>
            Исторические
            <br />
            даты
        </>
    ),
    data,
    ...restProps
}) => {
    return (
        <section className={clsx(styles.section, className)} {...restProps}>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.years}>
                <div className={styles.yearStart}>{data[0].yearStart}</div>
                <div className={styles.yearEnd}>{data[0].yearEnd}</div>
            </div>

            <Controls
                className={styles.controls}
                current={1}
                total={data.length}
                onArrowClick={() => {}}
                onDotClick={() => {}}
            />

            <Events
                className={styles.events}
                events={data[0].events.map(e => ({ title: e.year.toString(), text: e.text }))}
            />
        </section>
    );
};
