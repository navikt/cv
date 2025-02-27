import { BodyLong, Heading, Link } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export default function InfoTekst() {
    return (
        <>
            <div className={styles.euresLogo} />
            <BodyLong className={styles.euresTekst}>EURES</BodyLong>
            <Heading level="2" size="large" align="start" spacing>
                CV-deling med den Europeiske jobbmobilitetsportalen
            </Heading>
            <BodyLong size="small" weight="semibold" spacing>
                Hva er den Europeiske Jobbmobilitetsportalen?
            </BodyLong>
            <BodyLong size="small" spacing>
                Den Europeiske Jobbmobilitetsportalen er et tilbud til deg som ønsker å finne en jobb i EU/EØS-området
                og Sveits. Portalen gir deg muligheten til å gjøre CV-en din tilgjengelig for arbeidsgivere i EU/EØS og
                Sveits ved å dele CV-en du har på nav.no.
            </BodyLong>
            <BodyLong size="small" spacing>
                Du kan også registrere din egen konto i den Europeiske Jobbmobilitetsportalen og legge inn CV-en selv.
                Registrerte brukere kan lage søkeprofiler, få varsel på e-post om stillinger eller abonnere på
                nyhetsbrev. Arbeidsgivere kan søke etter aktuelle kandidater. Du kan lese mer om den Europeiske
                Jobbmobilitetsportalen og hvilke muligheter og tjenester som ligger der ved å bruke lenken under.
            </BodyLong>
            <BodyLong spacing>
                Gå til den{" "}
                <Link rel="noopener noreferrer" href="https://eures.europa.eu/index_no" inlineText>
                    Europeiske Jobbmobilitetsportalen
                </Link>
                .
            </BodyLong>

            <div className={styles.hvaVilDuDeleIcon} />
            <Heading className={styles.textDecorationLine} level="3" size="medium" align="start" spacing>
                Velg ut hva du vil dele
            </Heading>
            <BodyLong size="small" spacing>
                Du velger selv ut hva fra CV-en din som du ønsker å dele med den Europeiske jobbmobilitetsportalen. Du
                kan når som helst endre eller slette hva du deler.
            </BodyLong>

            <div className={styles.vilkarIcon} />
            <Heading className={styles.textDecorationLine} level="3" size="medium" align="start" spacing>
                Gjør deg kjent med vilkårene
            </Heading>
            <BodyLong size="small" spacing>
                Hvis du ønsker å dele informasjon med den Europeiske Jobbmobilitetsportalen, må du gjøre deg kjent med
                vilkårene for deling av CV før du samtykker til deling.
            </BodyLong>
            <BodyLong size="small" weight="semibold" spacing>
                Å samtykke er frivillig, og samtykket kan trekkes når som helst.
            </BodyLong>

            <div className={styles.delCVIcon} />
            <Heading className={styles.textDecorationLine} level="3" size="medium" align="start" spacing>
                Del CV-en din
            </Heading>
            <BodyLong className={styles.mb16} size="small">
                Når du deler CV-en din kan arbeidsgivere i EU/EØS og Sveits kontakte deg om jobbmuligheter.
            </BodyLong>
        </>
    );
}
