import { useEffect, useRef } from "react";
import { ErrorSummary } from "@navikt/ds-react";
import styles from "../../page.module.css";

export function ValidationErrors({
    heading = "Du må rette opp i følgende feil i skjemaet",
    headingTag = "h2",
    shouldAutoFocusErrors,
    validationErrors,
}) {
    const errorSummaryRef = useRef();
    useEffect(() => {
        if (errorSummaryRef.current && shouldAutoFocusErrors) {
            errorSummaryRef.current.focus();
        }
    }, [validationErrors]);

    if (Object.entries(validationErrors) < 1) {
        return null;
    }

    return (
        <ErrorSummary
            ref={errorSummaryRef}
            heading={heading}
            headingTag={headingTag}
            className={[styles.mt6, styles.errorSummary]}
        >
            {Object.entries(validationErrors).map(([key, val]) => (
                <ErrorSummary.Item
                    key={key}
                    href={`#${key}`}
                    onClick={(e) => {
                        e.preventDefault();

                        const ref = document.getElementById(key);
                        ref.classList.add("scroll-margin");
                        ref.scrollIntoView({ behavior: "smooth" });
                        ref.focus({ preventScroll: true });
                    }}
                >
                    {val}
                </ErrorSummary.Item>
            ))}
        </ErrorSummary>
    );
}
