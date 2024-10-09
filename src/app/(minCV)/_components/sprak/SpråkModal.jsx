import { Button, Heading, HStack, Modal, Select } from "@navikt/ds-react";
import { useEffect, useState } from "react";
import { Typeahead } from "@/app/(minCV)/_components/typeahead/Typeahead";
import { SpråkEnum } from "@/app/_common/enums/cvEnums";
import styles from "@/app/page.module.css";
import { TypeaheadEnum } from "@/app/_common/enums/typeaheadEnums";

export default function SpråkModal({ modalÅpen, toggleModal, språk, lagreSpråk }) {
    const [valgtSpråk, setValgtSpråk] = useState(språk || null);
    const [muntligEvne, setMuntligEvne] = useState("IKKE_OPPGITT");
    const [skriftligEvne, setSkriftligEvne] = useState("IKKE_OPPGITT");

    useEffect(() => {
        const oppdaterSpråk = (språk) => {
            setValgtSpråk(språk);
            setMuntligEvne(språk?.oralProficiency || "IKKE_OPPGITT");
            setSkriftligEvne(språk?.writtenProficiency || "IKKE_OPPGITT");
        };
        oppdaterSpråk(språk || []);
    }, [språk]);

    const lagre = async () => {
        await lagreSpråk({
            language: valgtSpråk.language || valgtSpråk.title,
            iso3Code: valgtSpråk.iso3Code || valgtSpråk.kode,
            oralProficiency: muntligEvne,
            writtenProficiency: skriftligEvne,
        });
        setValgtSpråk(null);
    };

    const oppdaterValgtSpråk = (verdi, erValgt) => {
        setValgtSpråk(erValgt ? verdi : null);
    };

    return (
        <Modal
            open={modalÅpen}
            aria-label="Legg til fagbrev"
            onClose={() => toggleModal(false)}
            width="medium"
            className={"overflow-visible"}
        >
            <Modal.Header closeButton={true}>
                <Heading align="start" level="3" size="medium">
                    <HStack gap="1" align="center">
                        Legg til språk
                    </HStack>
                </Heading>
            </Modal.Header>
            <Modal.Body style={{ padding: "1rem 2.8rem 2.5rem 2.8rem" }} className={"overflow-visible"}>
                <Typeahead
                    className={styles.mb6}
                    label={"Språk"}
                    valgtVerdi={valgtSpråk?.language || valgtSpråk?.title}
                    oppdaterValg={oppdaterValgtSpråk}
                    type={TypeaheadEnum.SPRÅK}
                    forhåndshentet={true}
                />
                <Select
                    id="Muntlig"
                    label="Muntlig"
                    className={styles.mb6}
                    value={muntligEvne}
                    onChange={(e) => setMuntligEvne(e.target.value)}
                >
                    {Object.keys(SpråkEnum).map((e) => (
                        <option key={e} value={e}>
                            {SpråkEnum[e]}
                        </option>
                    ))}
                </Select>
                <Select
                    id="Skriftlig"
                    label="Skriftlig"
                    className={styles.mb6}
                    value={skriftligEvne}
                    onChange={(e) => setSkriftligEvne(e.target.value)}
                >
                    {Object.keys(SpråkEnum).map((e) => (
                        <option key={e} value={e}>
                            {SpråkEnum[e]}
                        </option>
                    ))}
                </Select>
            </Modal.Body>
            <Modal.Footer>
                <HStack gap="4">
                    <Button variant="secondary" onClick={() => toggleModal(false)}>
                        Avbryt
                    </Button>
                    <Button variant="primary" onClick={() => lagre(valgtSpråk)}>
                        Lagre
                    </Button>
                </HStack>
            </Modal.Footer>
        </Modal>
    );
}
