import { useEffect, useEffectEvent, useState } from "react";
import { useWindowSize } from "react-use";

import { getBreakpoints } from "@Shared/utils";

export const useBreakpoints = () => {
    const [breakpoints, setBreakpoints] = useState(getBreakpoints());

    const { width } = useWindowSize();

    const checkBreakPoints = useEffectEvent(() => {
        const newBreakpoints = getBreakpoints();

        if (JSON.stringify(breakpoints) !== JSON.stringify(newBreakpoints)) {
            setBreakpoints(newBreakpoints);
        }
    });

    useEffect(() => {
        checkBreakPoints();
    }, [width]);

    return breakpoints;
};
