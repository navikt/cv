import { Loader, Tag } from "@navikt/ds-react";
import { CheckmarkIcon, XMarkIcon } from "@navikt/aksel-icons";
import styles from "@/app/page.module.css";

export function DelingTag({ erDelt, deltMed, laster = false, error = false }) {
    let icon;
    if (laster) {
        icon = <Loader size="medium" title="Laster..." />;
    } else if (error || !erDelt) {
        icon = <XMarkIcon aria-hidden />;
    } else {
        icon = <CheckmarkIcon aria-hidden />;
    }

    let variant;
    if (error) {
        variant = "error-moderate";
    } else if (erDelt && !laster) {
        variant = "success-moderate";
    } else {
        variant = "neutral-moderate";
    }

    let tekst;
    if (error) {
        tekst = "Det oppstod en feil";
    } else if (laster) {
        tekst = "Laster status";
    } else {
        tekst = `CV-en er ${erDelt ? "" : "ikke "}delt med ${deltMed}`;
    }

    return (
        <Tag variant={variant} icon={icon} className={styles.roundedTag}>
            {tekst}
        </Tag>
    );
}
