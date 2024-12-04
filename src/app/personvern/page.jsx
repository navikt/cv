import { BodyLong, Box, Heading, HStack, Link, VStack, List, BodyShort } from "@navikt/ds-react";
import "@navikt/ds-css";
import styles from "@/app/page.module.css";
import { Pictogram } from "@/app/_common/components/HeaderPanel";
import { ListItem } from "@navikt/ds-react/List";
import { ArrowUndoIcon } from "@navikt/aksel-icons";

async function Page() {
    return (
        <VStack>
            <Box as="header" borderWidth="0 0 4 0" borderColor="surface-info" background="surface-default">
                <HStack gap="3" justify="center" align="center" className={styles.mb9}>
                    <Pictogram />
                    <Heading level="1" size="large">
                        Min CV - Personvernserklæring
                    </Heading>
                </HStack>
            </Box>
            <VStack gap="4" align="center" className={styles.mb6}>
                <HStack className={[styles.mainPanelElement, styles.mt6]}>
                    <Link href="/min-cv">
                        <ArrowUndoIcon aria-hidden />
                        Tilbake til Min CV
                    </Link>
                </HStack>
                <Box background="surface-default" padding="10" className={[styles.box, styles.mt3]}>
                    <VStack className={styles.mt3}>
                        <Heading size="large" level="2" spacing>
                            Personvernerklæring for CV for deg som er under oppfølging fra Nav
                        </Heading>

                        <BodyShort size="small">Publisert 9. desember 2024 </BodyShort>

                        <BodyLong spacing className={styles.mt3}>
                            <span className={styles.italic}>Oppfølging</span> betyr veiledning og hjelp fra Nav til å
                            skaffe ny jobb eller beholde jobben. Dette får du dersom du har registrert deg som
                            arbeidssøker hos Nav.
                        </BodyLong>

                        <List title="Innhold" headingTag="h3" className={styles.mb6}>
                            <ListItem>
                                <Link href="#informasjon">Hvilke personopplysninger samler vi inn?</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#formaal">Hvilke formål brukes personopplysningene til?</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#lagring">Hvor lenge lagres opplysningene?</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#rettslig">
                                    Hva er det rettslige grunnlaget for behandlingen av personopplysninger?
                                </Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#eures">CV-deling med den Europeiske Jobbmobilitetsportalen</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#rettigheter">Hvilke rettigheter har du?</Link>
                            </ListItem>
                            <ListItem>
                                <Link href="#kontakt">Ta kontakt med Nav</Link>
                            </ListItem>
                        </List>

                        <Heading size="medium" level="3" spacing id="informasjon">
                            Hvilke personopplysninger samler vi inn?
                        </Heading>
                        <Heading size="small" level="4" spacing>
                            Personalia
                        </Heading>
                        <BodyLong>
                            Når du tar i bruk CV på nav.no, innhenter vi grunnleggende personalia fra folkeregisteret:
                        </BodyLong>
                        <List
                            className={styles.mb3}
                            title={<span className={styles.visuallyhidden}>Personalia</span>}
                            headingTag="span"
                        >
                            <ListItem>Navn</ListItem>
                            <ListItem>Telefonnummer</ListItem>
                            <ListItem>E-postadresse</ListItem>
                            <ListItem>Bostedsadresse</ListItem>
                        </List>

                        <BodyLong spacing>
                            Disse opplysningene er nødvendige for at vi skal kunne opprette en CV for deg. Dersom du
                            ikke ønsker at vi behandler disse opplysningene, vil vi ikke kunne opprette en CV. Du kan
                            redigere opplysningene vi har om deg, men det vil ikke påvirke dine registrerte data i
                            folkeregisteret.
                        </BodyLong>
                        <BodyLong spacing>
                            Mens du er innlogget vil innloggingsinformasjon du avgir oppbevares i en informasjonskapsel,
                            som gjør at du forblir innlogget hele tiden mens du er inne på våre sider.
                        </BodyLong>

                        <Heading size="small" level="4" spacing>
                            CV-opplysninger
                        </Heading>
                        <BodyLong>Du kan registrere følgende CV-opplysninger i vår CV-tjeneste:</BodyLong>
                        <List
                            className={styles.mb3}
                            title={
                                <span className={styles.visuallyhidden}>
                                    Opplysninger du kan registrere i CV-tjenesten
                                </span>
                            }
                            headingTag="span"
                        >
                            <ListItem>Jobbønsker</ListItem>
                            <ListItem>Utdanninger</ListItem>
                            <ListItem>Fagbrev</ListItem>
                            <ListItem>Arbeidsforhold</ListItem>
                            <ListItem>Andre erfaringer</ListItem>
                            <ListItem>Kompetanser</ListItem>
                            <ListItem>Offentlige godkjenninger</ListItem>
                            <ListItem>Andre godkjenninger</ListItem>
                            <ListItem>Språk</ListItem>
                            <ListItem>Førerkort</ListItem>
                            <ListItem>Kurs</ListItem>
                            <ListItem>Sammendrag</ListItem>
                        </List>

                        <BodyLong spacing>Du kan når som helst endre eller slette opplysningene i din CV.</BodyLong>

                        <Heading size="medium" level="3" spacing id="formaal">
                            Hvilke formål brukes personopplysningene til?
                        </Heading>

                        <Heading size="small" level="4" spacing>
                            Velfungerende arbeidsmarked
                        </Heading>
                        <BodyLong spacing>
                            Nav skal bidra til et velfungerende arbeidsmarked gjennom en åpen plattform for
                            arbeidsmarkedet. Vi lagrer og behandler personopplysninger for å gjøre det enklere for
                            jobbsøkere å finne jobb og for arbeidsgivere å skaffe arbeidskraft. Dette er i tråd med Navs
                            samfunnsoppdrag om å få flere i arbeid.
                        </BodyLong>

                        <Heading size="small" level="4" spacing>
                            Statistikk og kunnskap om arbeidsmarkedet
                        </Heading>
                        <BodyLong spacing>
                            Nav benytter opplysningene fra CV til å utvikle statistikk og kunnskap om arbeidsmarkedet.
                        </BodyLong>

                        <Heading size="small" level="4" spacing>
                            Arbeidsrettet oppfølging fra Nav
                        </Heading>
                        <BodyLong spacing>
                            Nav behandler personopplysningene til deg som er under oppfølging fra Nav, for å kunne
                            hjelpe deg å raskere komme i arbeid. Dette er i tråd med de lovpålagte oppgavene vi har.
                            Opplysningene du oppgir i din CV, kan brukes som en del av en vurdering av dine rettigheter
                            til tjenester og ytelser fra Nav. Dette omfatter arbeidsformidling, vurdering av ditt
                            bistandsbehov, arbeidsevne og rett til dagpenger.
                        </BodyLong>

                        <Heading size="medium" level="3" spacing id="lagring">
                            Hvor lenge lagres opplysningene?
                        </Heading>
                        <BodyLong spacing>
                            Opplysningene oppbevares og behandles så lenge du er under oppfølging av Nav. Nav har en
                            lovpålagt plikt til å oppbevare opplysningene i CV også etter at oppfølgingen, eller
                            saksbehandlingen, er avsluttet jf. Arkivloven § 6.
                        </BodyLong>

                        <Heading size="medium" level="3" spacing id="rettslig">
                            Hva er det rettslige grunnlaget for behandlingen av personopplysninger?
                        </Heading>
                        <BodyLong spacing>
                            Utøvelse av offentlig myndighet, jf. Nav-loven § 4 og arbeidsmarkedsloven § 10. Nav
                            behandler personopplysninger for å utøve offentlig myndighet som følger av bestemmelser i
                            Nav-loven og arbeidsmarkedsloven om arbeidsrettet oppfølging.
                        </BodyLong>
                        <BodyLong spacing>
                            Dersom Nav-medarbeidere finner en relevant stilling for deg, kan de spørre deg om de kan
                            dele din CV med denne arbeidsgiveren. Personopplysningene deles ikke med arbeidsgiveren før
                            du godtar dette, og du kan kontakte Nav når som helst for å be om at opplysningene ikke
                            lenger deles med arbeidsgiveren. CV gjøres utilgjengelig for arbeidsgiver 6 måneder etter at
                            CV deles med arbeidsgiveren.
                        </BodyLong>

                        <Heading size="medium" level="3" spacing id="eures">
                            CV-deling med den Europeiske Jobbmobilitetsportalen
                        </Heading>
                        <BodyLong spacing>
                            Dersom du ønsker kan du dele CV-en din med arbeidsgivere nasjonalt eller i EU/EØS og Sveits,
                            gjennom den den Europeiske Jobbmobilitetsportalen (EURES-portalen). EURES er også
                            behandlingsansvarlig ved slik deling.
                        </BodyLong>
                        <BodyLong spacing>
                            Du velger selv hvilke opplysninger fra CV-en din som du ønsker å dele med den Europeiske
                            jobbmobilitetsportalen. Du kan når som helst endre eller slette hva du deler.
                        </BodyLong>

                        <Heading size="small" level="4" spacing>
                            Våre databehandlere
                        </Heading>
                        <BodyLong spacing>
                            For å kunne tilby våre tjenester benytter vi databehandlere, som innebærer at vi deler dine
                            personopplysninger med disse. Dette gjelder for eksempel IT-leverandører som har avtaler med
                            Nav.
                        </BodyLong>

                        <Heading size="medium" level="3" spacing id="rettigheter">
                            Hvilke rettigheter har du?
                        </Heading>

                        <Heading size="small" level="4" spacing>
                            Rett til innsyn og retting
                        </Heading>
                        <BodyLong spacing>
                            Du har rett til å få vite hvilke personopplysninger vi har om deg og be om retting av
                            uriktige opplysninger. Du kan logge deg inn på nav.no/min-cv for å se mange av opplysningene
                            vi har registrert om deg. For innsyn i personopplysninger ut over dette, må du{" "}
                            <Link inlineText rel="noopener noreferrer" href="https://www.nav.no/kontaktoss">
                                ta kontakt med oss på nav.no
                            </Link>
                            .
                        </BodyLong>

                        <Heading size="small" level="4" spacing>
                            Rett til å protestere og rett til sletting
                        </Heading>
                        <BodyLong spacing>
                            Du har rett til å protestere mot behandlingen av dine personopplysninger. For å protestere,
                            tar du kontakt med Nav. Nav vil da slutte å behandle opplysningene dine og eventuelt slette
                            dem, med mindre det er tungtveiende grunner til at Nav likevel må behandle dem.
                        </BodyLong>
                        <BodyLong spacing>
                            I helt spesielle tilfeller vil du kunne ha rett til å få slettet opplysninger om deg. For at
                            vi skal kunne slette personopplysninger om deg, forutsetter det at Nav ikke har en lovpålagt
                            plikt etter arkivloven eller annen lovgivning til å lagre opplysningene.
                        </BodyLong>

                        <Heading size="small" level="4" spacing>
                            Rett til begrensning av behandlingen
                        </Heading>
                        <BodyLong spacing>
                            Du har rett til å be om at Nav midlertidig stopper behandlingen av dine opplysninger, dersom
                            du mener at opplysningene vi har om deg er feil, eller du mener at vår behandling av
                            opplysningene er ulovlig. Det samme gjelder dersom du mener at vi ikke trenger
                            opplysningene.
                        </BodyLong>

                        <Heading size="medium" level="3" spacing id="kontakt">
                            Ta kontakt med Nav
                        </Heading>

                        <BodyLong spacing>
                            Dersom du har spørsmål om rettighetene dine eller har flere spørsmål om personvern, kan du
                            lese{" "}
                            <Link inlineText rel="noopener noreferrer" href="https://www.nav.no/personvernerklaering">
                                Personvernerklæring for Nav
                            </Link>{" "}
                            eller{" "}
                            <Link inlineText rel="noopener noreferrer" href="https://www.nav.no/kontaktoss">
                                ta kontakt med oss på nav.no
                            </Link>
                            .
                        </BodyLong>
                    </VStack>
                </Box>

                <HStack className={[styles.mainPanelElement, styles.mt6]}>
                    <Link href="/min-cv">
                        <ArrowUndoIcon aria-hidden />
                        Tilbake til Min CV
                    </Link>
                </HStack>
            </VStack>
        </VStack>
    );
}

export default Page;
