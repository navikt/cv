import { MånedEnum, TidsenhetEnum } from "@/app/_common/enums/cvEnums";
import sanitizeHtml from "sanitize-html";

export const formatterTelefon = (telefonnummer) => {
    if (telefonnummer.length === 8 || telefonnummer.length === 11) {
        const harLandskode = telefonnummer.length === 11 && telefonnummer.includes("+");
        const landskode = harLandskode ? `${telefonnummer.substring(0, 3)} ` : "";
        const nummer = harLandskode ? telefonnummer.substring(3) : telefonnummer;

        return `${landskode}${nummer.substring(0, 3)} ${nummer.substring(3, 5)} ${nummer.substring(nummer.length - 3)}`;
    }

    return telefonnummer;
};

export const formatterAdresse = (adresse, postnummer, sted) => {
    if (adresse && postnummer && sted) return `${adresse}, ${postnummer} ${sted}`;
    if (adresse && postnummer) return `${adresse}, ${postnummer}`;
    if (adresse && sted) return `${adresse}, ${sted}`;
    if (postnummer && sted) return `${postnummer} ${sted}`;
    return adresse || postnummer || sted || "";
};

export const formatterListeAvObjekterTilTekst = (liste, felt) => {
    if (!liste) return "";
    if (typeof liste === "string" || liste instanceof String) return liste;
    const strenger = [];
    liste.forEach((e) => strenger.push(e[felt]));
    return strenger.join(", ");
};

export const formatterDato = (dato) => {
    if (!dato) return "nå";
    const date = new Date(dato);
    return `${MånedEnum[date.getMonth()]} ${date.getFullYear()}`;
};

export const formatterFullDatoMedFallback = (dato, fallback = "nå") => formatterFullDato(dato) || fallback;

export const formatterFullDato = (dato) => {
    if (!dato) return null;
    const date = new Date(dato);
    return `${date.getDate()}. ${MånedEnum[date.getMonth()].toLowerCase()} ${date.getFullYear()}`;
};

export const formatterDatoEttAarFremITid = (dato) => {
    const date = new Date(dato);
    const day = `0${date.getDate()}`.slice(-2);
    const month = `0${date.getMonth() + 1}`.slice(-2);
    const year = date.getFullYear() + 1;
    return `${day}.${month}.${year}`;
};

export const formatterTidsenhet = (enhet, antall) => {
    if (antall > 1) {
        const endelse = enhet.slice(-1) === "E" ? "r" : "er";
        return `${TidsenhetEnum[enhet]}${antall > 1 && endelse}`;
    }
    return TidsenhetEnum[enhet];
};

export const storForbokstav = (str) => str.charAt(0).toUpperCase() + str.slice(1);

export const fjernHtmlTags = (str) => {
    const formattertString = str?.replace(/<br \/>/g, "\n") || "";
    return sanitizeHtml(formattertString, { allowedTags: [] });
};
