import { useIsomorphicLayoutEffect } from "react-use";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";

export const ContainerGSAP = () => {
    useIsomorphicLayoutEffect(() => {
        gsap.registerPlugin(useGSAP);
    }, []);

    return null;
};
