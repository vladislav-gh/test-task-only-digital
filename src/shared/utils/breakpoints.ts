import type { BreakpointsFlags, BreakpointsState } from "@Shared/types";

import { BREAKPOINTS } from "@Shared/config";

export const getBreakpoints = () =>
    Object.entries(BREAKPOINTS).reduce((acc, [key, value]) => {
        acc[`is${key[0].toUpperCase()}${key.slice(1)}` as BreakpointsFlags] = innerWidth >= value;

        return acc;
    }, {} as BreakpointsState);
