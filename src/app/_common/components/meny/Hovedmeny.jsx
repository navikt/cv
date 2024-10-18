import { BodyLong, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
import { useEffect, useRef, useState } from "react";
import { SeksjonsIdEnum } from "@/app/_common/enums/cvEnums";

function Hovedmeny() {
    const [activeSection, setActiveSection] = useState();
    const sections = useRef([]);

    const onSectionChange = (i) => {
        const element = document.getElementById(i);
        element.scrollIntoView({ behavior: "smooth" });
    };

    const handleScroll = () => {
        const scrollY = window.scrollY + 1;
        let newActiveSection = null;
        sections.current.forEach((section) => {
            const sectionOffsetTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollY >= sectionOffsetTop && scrollY < sectionOffsetTop + sectionHeight) {
                newActiveSection = section.id;
            }
        });

        setActiveSection(newActiveSection);
    };

    useEffect(() => {
        sections.current = document.querySelectorAll("[data-section]");
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <HStack>
                <a
                    href="#personalia"
                    className={styles.meny}
                    onClick={() => onSectionChange(SeksjonsIdEnum.PERSONALIA)}
                >
                    <HStack align="center">
                        {activeSection === SeksjonsIdEnum.PERSONALIA ? (
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
                <a
                    href="#jobbonsker"
                    className={styles.meny}
                    onClick={() => onSectionChange(SeksjonsIdEnum.JOBBØNSKER)}
                >
                    <HStack align="center">
                        {activeSection === SeksjonsIdEnum.JOBBØNSKER ? (
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
                <a
                    href="#utdanninger"
                    className={styles.meny}
                    onClick={() => onSectionChange(SeksjonsIdEnum.UTDANNING)}
                >
                    <HStack align="center">
                        {activeSection === SeksjonsIdEnum.UTDANNING ? (
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
                <a href="#fagbrev" className={styles.meny} onClick={() => onSectionChange(SeksjonsIdEnum.FAGBREV)}>
                    <HStack align="center">
                        {activeSection === SeksjonsIdEnum.FAGBREV ? (
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
                <a
                    href="#arbeidsforhold"
                    className={styles.meny}
                    onClick={() => onSectionChange(SeksjonsIdEnum.ARBEIDSFORHOLD)}
                >
                    <HStack align="center">
                        {activeSection === SeksjonsIdEnum.ARBEIDSFORHOLD ? (
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
                <a
                    href="#andreErfaringer"
                    className={styles.meny}
                    onClick={() => onSectionChange(SeksjonsIdEnum.ANDRE_ERFARINGER)}
                >
                    <HStack align="center">
                        {activeSection === SeksjonsIdEnum.ANDRE_ERFARINGER ? (
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
                <a
                    href="#kompetanser"
                    className={styles.meny}
                    onClick={() => onSectionChange(SeksjonsIdEnum.KOMPETANSER)}
                >
                    <HStack align="center">
                        {activeSection === SeksjonsIdEnum.KOMPETANSER ? (
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
                <a
                    href="#offentligeGodkjenninger"
                    className={styles.meny}
                    onClick={() => onSectionChange(SeksjonsIdEnum.OFFENTLIGE_GODKJENNINGER)}
                >
                    <HStack align="center">
                        {activeSection === SeksjonsIdEnum.OFFENTLIGE_GODKJENNINGER ? (
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
                <a
                    href="#andreGodkjenninger"
                    className={styles.meny}
                    onClick={() => onSectionChange(SeksjonsIdEnum.ANDRE_GODKJENNINGER)}
                >
                    <HStack align="center">
                        {activeSection === SeksjonsIdEnum.ANDRE_GODKJENNINGER ? (
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
                <a href="#sprak" className={styles.meny} onClick={() => onSectionChange(SeksjonsIdEnum.SPRÅK)}>
                    <HStack align="center">
                        {activeSection === SeksjonsIdEnum.SPRÅK ? (
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
                <a href="#forerkort" className={styles.meny} onClick={() => onSectionChange(SeksjonsIdEnum.FØRERKORT)}>
                    <HStack align="center">
                        {activeSection === SeksjonsIdEnum.FØRERKORT ? (
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
                <a href="#kurs" className={styles.meny} onClick={() => onSectionChange(SeksjonsIdEnum.KURS)}>
                    <HStack align="center">
                        {activeSection === SeksjonsIdEnum.KURS ? (
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
                <a
                    href="#sammendrag"
                    className={styles.meny}
                    onClick={() => onSectionChange(SeksjonsIdEnum.SAMMENDRAG)}
                >
                    <HStack align="center">
                        {activeSection === SeksjonsIdEnum.SAMMENDRAG ? (
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
            <div className={styles.line} />
            <HStack>
                <a
                    href="#delingAvCV"
                    className={styles.meny}
                    onClick={() => onSectionChange(SeksjonsIdEnum.DELING_AV_CV)}
                >
                    <HStack align="center">
                        {activeSection === SeksjonsIdEnum.DELING_AV_CV ? (
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
        </>
    );
}

export default Hovedmeny;
