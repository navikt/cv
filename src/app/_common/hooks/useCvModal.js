import { useEffect, useState } from "react";

export const useCvModal = (
    eksisterendeElementer,
    { oppdaterSeksjon, oppdateringSuksess, oppdateringLaster, oppdateringHarFeil, setVisFeilmelding },
) => {
    const [modalÅpen, setModalÅpen] = useState(false);
    const [gjeldendeIndex, setGjeldendeIndex] = useState(-1);
    const [gjeldendeElement, setGjeldendeElement] = useState(null);
    const [laster, setLaster] = useState(false);
    const [lastendeIndex, setLastendeIndex] = useState(-1);

    useEffect(() => {
        setGjeldendeElement(gjeldendeIndex >= 0 ? eksisterendeElementer[gjeldendeIndex] : null);
    }, [gjeldendeIndex]);

    useEffect(() => {
        if (laster === false) setLastendeIndex(-1);
    }, [laster]);

    useEffect(() => {
        if (oppdateringSuksess || oppdateringHarFeil) oppdaterSeksjon(null);
        if (oppdateringHarFeil) setLaster(false);
        if (oppdateringSuksess && !oppdateringLaster && !oppdateringHarFeil) toggleModal(false);
        if (oppdateringLaster) setLaster(true);
    }, [oppdateringSuksess, oppdateringLaster, oppdateringHarFeil]);

    const toggleModal = (åpen, index) => {
        setGjeldendeIndex(index >= 0 ? index : -1);
        setVisFeilmelding(false);
        setModalÅpen(åpen);
        if (!åpen) setLaster(false);
    };

    const lagreElement = (oppdatertElement) => {
        const oppdaterteElementer = [...eksisterendeElementer];
        if (gjeldendeIndex >= 0) oppdaterteElementer.splice(gjeldendeIndex, 1, oppdatertElement);
        else oppdaterteElementer.push(oppdatertElement);
        oppdaterSeksjon(oppdaterteElementer);
    };

    const slettElement = (index) => {
        const oppdaterteElementer = [...eksisterendeElementer];
        oppdaterteElementer.splice(index, 1);
        setLastendeIndex(index);
        oppdaterSeksjon(oppdaterteElementer);
    };

    return {
        modalÅpen,
        gjeldendeElement,
        toggleModal,
        lagreElement,
        slettElement,
        laster,
        lastendeIndex: laster ? lastendeIndex : -1,
        feilet: oppdateringHarFeil,
    };
};
