import { FC, ReactNode, useState } from "react";
import clsx from "clsx";

import { ElProps } from "@Shared/types";

import { Circle } from "./circle";
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
    const [currentDateIndex, setCurrentDateIndex] = useState(0);

    const getMinMaxIndex = (index: number) => Math.min(data.length, Math.max(0, index));

    const goToDateByIndex = (index: number) => setCurrentDateIndex(getMinMaxIndex(index));

    const goToNextDate = () => setCurrentDateIndex(prev => getMinMaxIndex(prev + 1));

    const goToPrevDate = () => setCurrentDateIndex(prev => getMinMaxIndex(prev - 1));

    return (
        <section className={clsx(styles.section, className)} {...restProps}>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.years}>
                <div className={styles.yearStart}>{data[0].yearStart}</div>
                <div className={styles.yearEnd}>{data[0].yearEnd}</div>

                <Circle
                    className={styles.circle}
                    currentIndex={currentDateIndex}
                    items={data.map(d => d.name)}
                    onItemClick={goToDateByIndex}
                />
            </div>

            <Controls
                className={styles.controls}
                current={currentDateIndex + 1}
                total={data.length}
                onArrowClick={dir => (dir === "prev" ? goToPrevDate() : goToNextDate())}
                onDotClick={goToDateByIndex}
            />

            <Events
                className={styles.events}
                events={data[currentDateIndex].events.map(e => ({ title: e.year.toString(), text: e.text }))}
            />
        </section>
    );
};
