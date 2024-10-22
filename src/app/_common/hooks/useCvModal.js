import { useEffect, useState } from "react";

export const useCvModal = (
    eksisterendeElementer,
    oppdaterSeksjon,
    oppdateringSuksess,
    oppdateringLaster,
    oppdateringHarFeil,
) => {
    const [modalÅpen, setModalÅpen] = useState(false);
    const [gjeldendeIndex, setGjeldendeIndex] = useState(-1);
    const [gjeldendeElement, setGjeldendeElement] = useState(null);

    useEffect(() => {
        setGjeldendeElement(gjeldendeIndex >= 0 ? eksisterendeElementer[gjeldendeIndex] : null)
    }, [gjeldendeIndex]);

    useEffect(() => {
        if (oppdateringSuksess || oppdateringHarFeil) oppdaterSeksjon(null);
        if (oppdateringSuksess && !oppdateringLaster && !oppdateringHarFeil) toggleModal(false);
    }, [oppdateringSuksess, oppdateringLaster, oppdateringHarFeil]);

    const toggleModal = (åpen, index) => {
        setGjeldendeIndex(index >= 0 ? index : -1);
        setModalÅpen(åpen);
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
        oppdaterSeksjon(oppdaterteElementer);
    };

    return { modalÅpen, gjeldendeElement, toggleModal, lagreElement, slettElement };
};
