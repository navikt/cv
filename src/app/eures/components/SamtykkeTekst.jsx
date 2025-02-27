import { BodyLong, Link, List } from "@navikt/ds-react";

export default function SamtykkeTekst() {
    return (
        <>
            <BodyLong size="small" spacing>
                Hvis du ønsker å dele innholdet fra CV-en din med den Europeiske Jobbmobilitetsportalen må du aktivt
                samtykke til dette. Nedenfor er hovedpunktene som gjelder for samtykket.
            </BodyLong>
            <List as="ol" size="small">
                <List.Item>
                    Å samtykke er frivillig og har ingen konsekvenser for eventuell oppfølging eller ytelser du mottar
                    fra Nav. Samtykket gis ved å klikke “Jeg samtykker” knappen. Da samtykker du til at dine valgte
                    CV-opplysningene overføres til den Europeiske jobbmobiltetsportalen.
                </List.Item>
                <List.Item>
                    Du velger selv hvilke innholdskategorier i CV-en din du ønsker å dele, og du kan endre valgene dine
                    når du selv ønsker.
                </List.Item>
                <List.Item>
                    Du kan ikke spesifisere hvilket innhold fra en innholdkategori som du vil dele. Hvis du deler noe
                    innhold i fra en kategori, deler du alt innholdet i den kategorien til Den Europeiske
                    Jobbmobilitetsportalen. Hvis du gjør en endring eller legger til nytt innhold til en delt kategori,
                    vil dette innholdet bli delt med den Europeiske Jobbmobilitetsportalen.
                </List.Item>
                <List.Item>
                    Ved å samtykke vil mange arbeidsgivere i EU/EØS og Sveits kunne søke på, se og lagre de
                    CV-opplysninger som du velger å dele.
                </List.Item>
                <List.Item>
                    Du kan når som helst trekke samtykket, og stanse din deling med den Europeiske
                    Jobbmobilitetsportalen. Ved å trekke samtykke slettes opplysningene dine hos den Europeiske
                    Jobbmobilitetsportalen.
                </List.Item>
                <List.Item>
                    Hvilke innholdskategorier du velger å dele i den Europeiske Jobbmobilitetsportalen påvirker ikke
                    innholdet ditt eller synligheten til CV-en din hos nav.no
                </List.Item>
                <List.Item>
                    Samtykket ditt slettes automatisk når CV-en din blir inaktiv hos NAV, eller ett år etter din siste
                    oppdatering. CV-en din blir inaktiv hvis du ikke er under oppfølging hos NAV, eller hvis du ikke
                    mottar oppfølging og selv trekker samtykket ditt på{" "}
                    <Link inlineText rel="noopener noreferrer" href="https://arbeidsplassen.nav.no/">
                        arbeidsplassen.no
                    </Link>
                </List.Item>
            </List>
        </>
    );
}
