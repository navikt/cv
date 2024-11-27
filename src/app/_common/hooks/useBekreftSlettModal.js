import { useState } from "react";

export const useBekreftModal = (initialBeskrivelse) => {
    const [bekreftModalÅpen, setBekreftModalÅpen] = useState(false);
    const [callback, setCallback] = useState(null);
    const [beskrivelse, setBeskrivelse] = useState(initialBeskrivelse || "");

    const toggleBekreftModal = (åpen, callbackAction) => {
        setBekreftModalÅpen(åpen);
        if (åpen && callbackAction) {
            setCallback(() => callbackAction);
        } else {
            setCallback(null);
        }
    };

    const kjørBekreftCallback = () => {
        callback();
        toggleBekreftModal(false);
    };

    return {
        bekreftModalÅpen,
        toggleBekreftModal,
        kjørBekreftCallback,
        beskrivelse,
        setBeskrivelse,
    };
};
