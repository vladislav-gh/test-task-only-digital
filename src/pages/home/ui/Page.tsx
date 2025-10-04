import { SectionDates } from "@Widgets/section-dates";

import { data } from "../data";
import styles from "./styles.module.scss";

export const Page = () => (
    <main className={styles.page}>
        <SectionDates data={data} />
    </main>
);
