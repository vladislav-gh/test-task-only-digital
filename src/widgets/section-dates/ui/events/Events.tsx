import { FC, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Keyboard, Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { BREAKPOINTS } from "@Shared/config";
import { ElProps } from "@Shared/types";
import { Icon } from "@Shared/ui";

import { Event, EventProps } from "../event/Event";
import styles from "./styles.module.scss";

export type EventsProps = ElProps<"div"> & {
    events: Pick<EventProps, "title" | "text">[];
};

export const Events: FC<EventsProps> = ({ className, events, ...restProps }) => {
    const refSwiper = useRef<SwiperRef>(null);
    const refButtonPrev = useRef<HTMLButtonElement>(null);
    const refButtonNext = useRef<HTMLButtonElement>(null);

    const [swiper, setSwiper] = useState<SwiperType | null>(null);

    useEffect(() => {
        swiper?.update();
    }, [swiper]);

    return (
        <div className={clsx(styles.events, className)} {...restProps}>
            <Swiper
                ref={refSwiper}
                className={styles.slider}
                modules={[Keyboard, Mousewheel, Navigation]}
                grabCursor
                slidesPerView="auto"
                spaceBetween={25}
                speed={500}
                keyboard
                mousewheel={{ forceToAxis: true }}
                navigation={{ prevEl: refButtonPrev.current, nextEl: refButtonNext.current }}
                breakpoints={{
                    [BREAKPOINTS.lg]: {
                        slidesPerView: 3,
                        spaceBetween: 80,
                    },
                }}
                onSwiper={setSwiper}
            >
                {events.map((event, eventIndex) => (
                    <SwiperSlide key={event.title + eventIndex} className={styles.slide}>
                        <Event {...event} />
                    </SwiperSlide>
                ))}
            </Swiper>

            <button
                ref={refButtonPrev}
                className={clsx(styles.buttonArrow, styles.buttonArrowPrev)}
                type="button"
                aria-label="Предыдущий слайд"
            >
                <Icon k="angleLeft" />
            </button>

            <button
                ref={refButtonNext}
                className={clsx(styles.buttonArrow, styles.buttonArrowNext)}
                type="button"
                aria-label="Следующий слайд"
            >
                <Icon k="angleRight" />
            </button>
        </div>
    );
};
