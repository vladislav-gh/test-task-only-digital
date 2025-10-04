import { FC, ReactNode, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { gsap } from "gsap";

import { ElProps } from "@Shared/types";

import { Circle } from "./circle";
import { Controls } from "./controls";
import { Events } from "./events";
import styles from "./styles.module.scss";

const ANIMATION_YEARS_DURATION = 0.75;

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
    initialIndex?: number;
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
    initialIndex = 0,
    ...restProps
}) => {
    const getMinMaxIndex = (index: number) => Math.min(data.length - 1, Math.max(0, index));

    const initialIndexMinMax = getMinMaxIndex(initialIndex);

    const refSection = useRef<HTMLDivElement>(null);
    const refYearStart = useRef<HTMLDivElement>(null);
    const refYearEnd = useRef<HTMLDivElement>(null);
    const refPrevDateIndex = useRef(initialIndexMinMax);

    const [currentDateIndex, setCurrentDateIndex] = useState(initialIndexMinMax);

    const goToDateByIndex = (index: number) => setCurrentDateIndex(getMinMaxIndex(index));

    const goToNextDate = () => setCurrentDateIndex(prev => getMinMaxIndex(prev + 1));

    const goToPrevDate = () => setCurrentDateIndex(prev => getMinMaxIndex(prev - 1));

    useGSAP(
        () => {
            if (!refSection.current || refPrevDateIndex.current === currentDateIndex) {
                return;
            }

            if (refYearStart.current) {
                gsap.fromTo(
                    refYearStart.current,
                    {
                        innerText: data[refPrevDateIndex.current].yearStart,
                    },
                    {
                        duration: ANIMATION_YEARS_DURATION,
                        innerText: data[currentDateIndex].yearStart,
                        roundProps: "innerText",
                    },
                );
            }

            if (refYearEnd.current) {
                gsap.fromTo(
                    refYearEnd.current,
                    {
                        innerText: data[refPrevDateIndex.current].yearEnd,
                    },
                    {
                        duration: ANIMATION_YEARS_DURATION,
                        innerText: data[currentDateIndex].yearEnd,
                        roundProps: "innerText",
                    },
                );
            }

            refPrevDateIndex.current = currentDateIndex;
        },
        {
            scope: refSection,
            revertOnUpdate: true,
            dependencies: [currentDateIndex],
        },
    );

    return (
        <section ref={refSection} className={clsx(styles.section, className)} {...restProps}>
            <h2 className={styles.title}>{title}</h2>

            <div className={styles.years}>
                <div ref={refYearStart} className={styles.yearStart}>
                    {data[currentDateIndex].yearStart}
                </div>

                <div ref={refYearEnd} className={styles.yearEnd}>
                    {data[currentDateIndex].yearEnd}
                </div>

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
