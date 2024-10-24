import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const MAX_ANTALL_NOTIFIKASJONER = 6;
const NOTIFIKASJON_FADEOUT_MS = 5000; // Husk å endre CSS-animasjon dersom denne endres

export const useNotifikasjoner = () => {
    const [notifikasjoner, setNotifikasjoner] = useState([]);
    const notifikasjonerRef = useRef(notifikasjoner);

    useEffect(() => {
        notifikasjonerRef.current = notifikasjoner;
    }, [notifikasjoner]);

    const slettNotifikasjon = (id, eksisterendeNotifikasjoner) => {
        const oppdaterteNotifikasjoner = [...eksisterendeNotifikasjoner];
        const index = oppdaterteNotifikasjoner.findIndex((e) => e.id === id);
        oppdaterteNotifikasjoner.splice(index, 1);
        setNotifikasjoner(oppdaterteNotifikasjoner);
    };

    const leggTilNotifikasjon = (type, tekst) => {
        const notifikasjonsId = uuidv4();
        const oppdaterteNotifikasjoner = [...notifikasjoner, { id: notifikasjonsId, type: type, tekst: tekst }];
        setNotifikasjoner(oppdaterteNotifikasjoner.slice(0, MAX_ANTALL_NOTIFIKASJONER));
        setTimeout(() => slettNotifikasjon(notifikasjonsId, notifikasjonerRef.current), NOTIFIKASJON_FADEOUT_MS);
    };

    const suksessNotifikasjon = (tekst) => leggTilNotifikasjon("success", tekst);
    const infoNotifikasjon = (tekst) => leggTilNotifikasjon("info", tekst);
    const advarselNotifikasjon = (tekst) => leggTilNotifikasjon("warning", tekst);
    const errorNotifikasjon = (tekst) => leggTilNotifikasjon("error", tekst);

    return { notifikasjoner, suksessNotifikasjon, infoNotifikasjon, advarselNotifikasjon, errorNotifikasjon };
};
