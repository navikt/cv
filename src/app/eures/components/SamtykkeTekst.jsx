import { BodyLong, List } from "@navikt/ds-react";

export default function SamtykkeTekst() {
    return (
        <>
            <BodyLong size="small" spacing>
                Hvis du ønsker å dele innhold fra CV-en din med den Europeiske Jobbmobilitetsportalen (EURES-portalen)
                må du aktivt samtykke til dette. Nedenfor er hovedpunktene som gjelder for samtykket.
            </BodyLong>
            <List as="ol" size="small">
                <List.Item>
                    Å samtykke er frivillig og har ingen konsekvenser for eventuell oppfølging eller ytelser du mottar
                    fra Nav. Samtykket gis ved å klikke “Jeg samtykker” knappen. Da samtykker du til at dine valgte
                    CV-opplysninger overføres til EURES-portalen.
                </List.Item>
                <List.Item>
                    Du velger selv hvilke innholdskategorier i CV-en din du ønsker å dele, og du kan endre valgene dine
                    når du selv ønsker.
                </List.Item>
                <List.Item>
                    Du kan ikke spesifisere hvilket innhold fra en innholdskategori som du vil dele. Hvis du deler noe
                    innhold fra en kategori, deler du alt innholdet i den kategorien til EURES-portalen. Hvis du gjør en
                    endring eller legger til nytt innhold til en delt kategori, vil dette innholdet bli delt med
                    EURES-portalen.
                </List.Item>
                <List.Item>
                    Ved å samtykke vil mange arbeidsgivere i EU/EØS og Sveits kunne søke på, se og lagre de
                    CV-opplysninger som du velger å dele.
                </List.Item>
                <List.Item>
                    Du kan når som helst trekke samtykket, og stanse din deling med EURES-portalen. Ved å trekke
                    samtykket slettes opplysningene dine hos EURES-portalen.
                </List.Item>
                <List.Item>
                    Hvilke innholdskategorier du velger å dele med EURES-portalen påvirker ikke innholdet ditt eller
                    synligheten til CV-en din hos nav.no
                </List.Item>
                <List.Item>
                    Samtykket ditt slettes automatisk når CV-en din blir inaktiv hos NAV, eller ett år etter din siste
                    oppdatering. CV-en din blir inaktiv hvis du ikke er under oppfølging hos NAV.
                </List.Item>
            </List>
        </>
    );
}
