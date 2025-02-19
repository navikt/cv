import { Loader, Tag } from "@navikt/ds-react";
import { CheckmarkIcon, StarsEuIcon, XMarkIcon } from "@navikt/aksel-icons";
import { formatterDatoEttAarFremITid } from "@/app/_common/utils/stringUtils";

export function DelingTag({ erDelt, deltMed, laster = false, error = false, sistEndret = false, erEures = false }) {
    let icon;
    if (laster) {
        icon = <Loader size="medium" title="Laster..." />;
    } else if (error && erEures && !erDelt) {
        icon = <XMarkIcon aria-hidden />;
    } else if (error || !erDelt) {
        icon = <XMarkIcon aria-hidden />;
    } else if (erEures) {
        icon = <StarsEuIcon aria-hidden />;
    } else {
        icon = <CheckmarkIcon aria-hidden />;
    }

    let variant;
    if (error && erEures && !erDelt) {
        variant = "neutral-moderate";
    } else if (error) {
        variant = "error-moderate";
    } else if (erDelt && !laster) {
        variant = "info";
    } else {
        variant = "neutral-moderate";
    }

    let tekst;
    if (error && erEures && !erDelt) {
        tekst = `CV-en er ikke delt med ${deltMed}`;
    } else if (error) {
        tekst = "Det oppstod en feil";
    } else if (laster) {
        tekst = "Laster status";
    } else if (erEures && erDelt) {
        tekst = `Samtykket ditt utløper: ${formatterDatoEttAarFremITid(sistEndret)}`;
    } else {
        tekst = `CV-en er ${erDelt ? "" : "ikke "}delt med ${deltMed}`;
    }

    return (
        <Tag size="small" variant={variant} icon={icon}>
            {tekst}
        </Tag>
    );
}
