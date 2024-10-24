import { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

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
        setNotifikasjoner([...notifikasjoner, { id: notifikasjonsId, type: type, tekst: tekst }]);
        setTimeout(() => slettNotifikasjon(notifikasjonsId, notifikasjonerRef.current), 5000);
    };

    const suksessNotifikasjon = (tekst) => leggTilNotifikasjon("success", tekst);
    const infoNotifikasjon = (tekst) => leggTilNotifikasjon("info", tekst);
    const advarselNotifikasjon = (tekst) => leggTilNotifikasjon("warning", tekst);
    const errorNotifikasjon = (tekst) => leggTilNotifikasjon("error", tekst);

    return { notifikasjoner, suksessNotifikasjon, infoNotifikasjon, advarselNotifikasjon, errorNotifikasjon };
};
