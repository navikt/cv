import { MånedEnum } from "@/app/enums/cvEnums";

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
    else if (adresse && postnummer) return `${adresse}, ${postnummer}`;
    else if (adresse && sted) return `${adresse}, ${sted}`;
    else if (postnummer && sted) return `${postnummer} ${sted}`;
    else return adresse || postnummer || sted || "";
};

// Her trenger vi design for hvordan vi skal reprsentere valgte lokasjoner / yrker i modalen
export const formatterListeAvObjekterTilTekst = (liste, felt) => {
    if (!liste) return "";
    if (typeof liste === "string" || liste instanceof String) return liste;
    let strenger = [];
    liste.forEach((e) => strenger.push(e[felt]));
    return strenger.join(", ");
};

export const formatterDato = (dato) => {
    if (!dato) return "nå";
    const date = new Date(dato);
    return `${MånedEnum[date.getMonth()]} ${date.getFullYear()}`;
};