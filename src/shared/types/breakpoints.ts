import { BREAKPOINTS } from "@Shared/config";

export type BreakpointsFlags = `is${Capitalize<keyof typeof BREAKPOINTS>}`;

export type BreakpointsState = Record<BreakpointsFlags, boolean>;
