// Her trenger vi design for hvordan vi skal reprsentere valgte lokasjoner / yrker i modalen
export const formatterListeAvObjekterTilTekst = (liste, felt) => {
    if (!liste) return "";
    if (typeof liste === "string" || liste instanceof String) return liste;
    let strenger = [];
    liste.forEach((e) => strenger.push(e[felt]));
    return strenger.join(", ");
};
