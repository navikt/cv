export const cvHarInnhold = (cv) =>
    cv &&
    !(
        jobbønskerErTomt(cv?.jobboensker) &&
        kategoriErTom(cv?.utdanning) &&
        kategoriErTom(cv?.fagbrev) &&
        kategoriErTom(cv?.arbeidserfaring) &&
        kategoriErTom(cv?.annenErfaring) &&
        kategoriErTom(cv?.andreGodkjenninger) &&
        kategoriErTom(cv?.foererkort) &&
        kategoriErTom(cv?.kompetanser) &&
        kategoriErTom(cv?.kurs) &&
        kategoriErTom(cv?.offentligeGodkjenninger) &&
        kategoriErTom(cv?.spraak) &&
        !cv?.sammendrag
    );

const kategoriErTom = (kategori) => !kategori || kategori?.length === 0;

export const jobbønskerErTomt = (jobbønsker) =>
    !jobbønsker || Object.keys(jobbønsker).length === 0 || jobbønsker?.locations?.length === 0;
