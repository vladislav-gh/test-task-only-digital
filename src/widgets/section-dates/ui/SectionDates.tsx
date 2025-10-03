import { FC, ReactNode } from "react";
import clsx from "clsx";

import { ElProps } from "@Shared/types";

import { Events } from "./events";
import styles from "./styles.module.scss";

export type SectionDatesProps = ElProps<"section"> & {
    title?: ReactNode;
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
    ...restProps
}) => {
    return (
        <section className={clsx(styles.section, className)} {...restProps}>
            <h2 className={styles.title}>{title}</h2>

            <Events
                events={[
                    {
                        title: "2015",
                        text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
                    },
                    {
                        title: "2016",
                        text: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
                    },
                    {
                        title: "2017",
                        text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
                    },
                    {
                        title: "2015",
                        text: "13 сентября — частное солнечное затмение, видимое в Южной Африке и части Антарктиды",
                    },
                    {
                        title: "2016",
                        text: "Телескоп «Хаббл» обнаружил самую удалённую из всех обнаруженных галактик, получившую обозначение GN-z11",
                    },
                    {
                        title: "2017",
                        text: "Компания Tesla официально представила первый в мире электрический грузовик Tesla Semi",
                    },
                ]}
            />
        </section>
    );
};
