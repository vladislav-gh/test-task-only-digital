import { FC, useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { gsap } from "gsap";
import { Keyboard, Mousewheel, Navigation } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { Swiper as SwiperType } from "swiper/types";

import { BREAKPOINTS } from "@Shared/config";
import { useBreakpoints } from "@Shared/hooks";
import { ElProps } from "@Shared/types";
import { Icon } from "@Shared/ui";

import { ANIMATION_CHANGE_DURATION } from "../../config";
import { Event, EventProps } from "../event/Event";
import styles from "./styles.module.scss";

export type EventsProps = ElProps<"div"> & {
    events: Pick<EventProps, "title" | "text">[];
};

export const Events: FC<EventsProps> = ({ className, events, ...restProps }) => {
    const refEvents = useRef<HTMLDivElement>(null);
    const refButtonPrev = useRef<HTMLButtonElement>(null);
    const refButtonNext = useRef<HTMLButtonElement>(null);
    const refSwiper = useRef<SwiperRef>(null);

    const [swiper, setSwiper] = useState<SwiperType | null>(null);
    const [dataEvents, setDataEvents] = useState<EventsProps["events"]>(events);

    const { isLg } = useBreakpoints();

    useEffect(() => {
        swiper?.update();
    }, [swiper]);

    useGSAP(
        () => {
            if (!refEvents.current || JSON.stringify(events) === JSON.stringify(dataEvents)) {
                return;
            }

            swiper?.slideTo(0);

            gsap.timeline()
                .to(refEvents.current, {
                    duration: ANIMATION_CHANGE_DURATION / 2,
                    opacity: 0,
                    y: isLg ? 0 : 30,
                    onComplete() {
                        setDataEvents(events);
                    },
                })
                .to(refEvents.current, {
                    duration: ANIMATION_CHANGE_DURATION / 2,
                    opacity: 1,
                    y: 0,
                });
        },
        {
            scope: refEvents,
            dependencies: [events, isLg],
        },
    );

    return (
        <div ref={refEvents} className={clsx(styles.events, className)} {...restProps}>
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
                {dataEvents.map((event, eventIndex) => (
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
