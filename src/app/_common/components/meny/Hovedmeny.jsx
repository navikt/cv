import { BodyLong, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useState } from "react";

function Hovedmeny() {
    const [activeStep, setActiveStep] = useState(1);

    function onStepChange(i) {
        const element = document.getElementById(i);
        element.scrollIntoView({ behavior: "smooth" });
        setActiveStep(i);
    }

    return (
        <>
            <HStack>
                <a href="#delingAvCV" className={styles.meny} onClick={() => onStepChange(1)}>
                    <HStack align="center">
                        {activeStep === 1 ? (
                            <div className={styles["icon-deling-av-cv--active"]} />
                        ) : (
                            <div className={styles["icon-deling-av-cv"]} />
                        )}
                        <BodyLong style={{ marginLeft: "0.8rem" }} weight="semibold">
                            Deling av CV
                        </BodyLong>
                    </HStack>
                </a>
            </HStack>
            <div className={styles.line} />
            <HStack>
                <a href="#personalia" className={styles.meny} onClick={() => onStepChange(2)}>
                    <HStack align="center">
                        {activeStep === 2 ? (
                            <div className={styles["icon-personalia--active"]} />
                        ) : (
                            <div className={styles["icon-personalia"]} />
                        )}
                        <BodyLong style={{ marginLeft: "0.8rem" }} weight="semibold">
                            Personalia
                        </BodyLong>
                    </HStack>
                </a>
            </HStack>
            <div className={styles.line} />
            <HStack>
                <a href="#jobbonsker" className={styles.meny} onClick={() => onStepChange(3)}>
                    <HStack align="center">
                        {activeStep === 3 ? (
                            <div className={styles["icon-jobbonsker--active"]} />
                        ) : (
                            <div className={styles["icon-jobbonsker"]} />
                        )}
                        <BodyLong style={{ marginLeft: "0.8rem" }} weight="semibold">
                            Jobbønsker
                        </BodyLong>
                    </HStack>
                </a>
            </HStack>
            <div className={styles.line} />
            <HStack>
                <a href="#utdanninger" className={styles.meny} onClick={() => onStepChange(4)}>
                    <HStack align="center">
                        {activeStep === 4 ? (
                            <div className={styles["icon-utdanninger--active"]} />
                        ) : (
                            <div className={styles["icon-utdanninger"]} />
                        )}
                        <BodyLong style={{ marginLeft: "0.8rem" }} weight="semibold">
                            Utdanninger
                        </BodyLong>
                    </HStack>
                </a>
            </HStack>
            <div className={styles.line} />
            <HStack>
                <a href="#fagbrev" className={styles.meny} onClick={() => onStepChange(5)}>
                    <HStack align="center">
                        {activeStep === 5 ? (
                            <div className={styles["icon-fagbrev--active"]} />
                        ) : (
                            <div className={styles["icon-fagbrev"]} />
                        )}
                        <BodyLong style={{ marginLeft: "0.8rem" }} weight="semibold">
                            Fagbrev
                        </BodyLong>
                    </HStack>
                </a>
            </HStack>
            <div className={styles.line} />
            <HStack>
                <a href="#arbeidsforhold" className={styles.meny} onClick={() => onStepChange(6)}>
                    <HStack align="center">
                        {activeStep === 6 ? (
                            <div className={styles["icon-arbeidsforhold--active"]} />
                        ) : (
                            <div className={styles["icon-arbeidsforhold"]} />
                        )}
                        <BodyLong style={{ marginLeft: "0.8rem" }} weight="semibold">
                            Arbeidsforhold
                        </BodyLong>
                    </HStack>
                </a>
            </HStack>
            <div className={styles.line} />
            <HStack>
                <a href="#andreErfaringer" className={styles.meny} onClick={() => onStepChange(7)}>
                    <HStack align="center">
                        {activeStep === 7 ? (
                            <div className={styles["icon-andre-erfaringer--active"]} />
                        ) : (
                            <div className={styles["icon-andre-erfaringer"]} />
                        )}
                        <BodyLong style={{ marginLeft: "0.8rem" }} weight="semibold">
                            Andre erfaringer
                        </BodyLong>
                    </HStack>
                </a>
            </HStack>
            <div className={styles.line} />
            <HStack>
                <a href="#kompetanser" className={styles.meny} onClick={() => onStepChange(8)}>
                    <HStack align="center">
                        {activeStep === 8 ? (
                            <div className={styles["icon-kompetanser--active"]} />
                        ) : (
                            <div className={styles["icon-kompetanser"]} />
                        )}
                        <BodyLong style={{ marginLeft: "0.8rem" }} weight="semibold">
                            Kompetanser
                        </BodyLong>
                    </HStack>
                </a>
            </HStack>
            <div className={styles.line} />
            <HStack>
                <a href="#offentligeGodkjenninger" className={styles.meny} onClick={() => onStepChange(9)}>
                    <HStack align="center">
                        {activeStep === 9 ? (
                            <div className={styles["icon-offentlige-godkjenninger--active"]} />
                        ) : (
                            <div className={styles["icon-offentlige-godkjenninger"]} />
                        )}
                        <BodyLong style={{ marginLeft: "0.8rem" }} weight="semibold">
                            Offentlige godkjenninger
                        </BodyLong>
                    </HStack>
                </a>
            </HStack>
            <div className={styles.line} />
            <HStack>
                <a href="#andreGodkjenninger" className={styles.meny} onClick={() => onStepChange(10)}>
                    <HStack align="center">
                        {activeStep === 10 ? (
                            <div className={styles["icon-andre-godkjenninger--active"]} />
                        ) : (
                            <div className={styles["icon-andre-godkjenninger"]} />
                        )}
                        <BodyLong style={{ marginLeft: "0.8rem" }} weight="semibold">
                            Andre godkjenninger
                        </BodyLong>
                    </HStack>
                </a>
            </HStack>
            <div className={styles.line} />
            <HStack>
                <a href="#sprak" className={styles.meny} onClick={() => onStepChange(11)}>
                    <HStack align="center">
                        {activeStep === 11 ? (
                            <div className={styles["icon-sprak--active"]} />
                        ) : (
                            <div className={styles["icon-sprak"]} />
                        )}
                        <BodyLong style={{ marginLeft: "0.8rem" }} weight="semibold">
                            Språk
                        </BodyLong>
                    </HStack>
                </a>
            </HStack>
            <div className={styles.line} />
            <HStack>
                <a href="#forerkort" className={styles.meny} onClick={() => onStepChange(12)}>
                    <HStack align="center">
                        {activeStep === 12 ? (
                            <div className={styles["icon-forerkort--active"]} />
                        ) : (
                            <div className={styles["icon-forerkort"]} />
                        )}
                        <BodyLong style={{ marginLeft: "0.8rem" }} weight="semibold">
                            Førerkort
                        </BodyLong>
                    </HStack>
                </a>
            </HStack>
            <div className={styles.line} />
            <HStack>
                <a href="#kurs" className={styles.meny} onClick={() => onStepChange(13)}>
                    <HStack align="center">
                        {activeStep === 13 ? (
                            <div className={styles["icon-kurs--active"]} />
                        ) : (
                            <div className={styles["icon-kurs"]} />
                        )}
                        <BodyLong style={{ marginLeft: "0.8rem" }} weight="semibold">
                            Kurs
                        </BodyLong>
                    </HStack>
                </a>
            </HStack>
            <div className={styles.line} />
            <HStack>
                <a href="#sammendrag" className={styles.meny} onClick={() => onStepChange(14)}>
                    <HStack align="center">
                        {activeStep === 14 ? (
                            <div className={styles["icon-sammendrag--active"]} />
                        ) : (
                            <div className={styles["icon-sammendrag"]} />
                        )}
                        <BodyLong style={{ marginLeft: "0.8rem" }} weight="semibold">
                            Sammendrag
                        </BodyLong>
                    </HStack>
                </a>
            </HStack>
        </>
    );
}

export default Hovedmeny;
