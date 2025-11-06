import { BodyLong, Box, Heading, HStack, Link, List } from "@navikt/ds-react";
import { ListItem } from "@navikt/ds-react/List";

function HjemmelIcon() {
    return (
        <svg
            aria-hidden="true"
            style={{ marginTop: "-4.5rem", marginBottom: "4rem" }}
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <rect x="0.000244141" width="64" height="64" rx="32" fill="#7CDAF8" />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.3168 20.2357C33.4056 19.3244 31.9282 19.3244 31.017 20.2357L28.9194 22.3333H20.0002C19.448 22.3333 19.0002 22.781 19.0002 23.3333V35.3333C19.0002 35.5985 19.1056 35.8529 19.2931 36.0404L26.6265 43.3737C27.4445 44.1918 28.3851 44.615 29.3222 44.6453C30.2523 44.6753 31.101 44.3135 31.7074 43.7071C32.0357 43.3787 32.2923 42.9794 32.4539 42.5345L32.6265 42.7071C33.4445 43.5251 34.3851 43.9484 35.3222 43.9786C36.2523 44.0086 37.101 43.6468 37.7074 43.0404C38.047 42.7008 38.3099 42.2851 38.4702 41.8217C39.1582 42.3469 39.908 42.6212 40.6555 42.6453C41.5856 42.6753 42.4343 42.3135 43.0407 41.7071C43.6471 41.1007 44.0089 40.252 43.9789 39.3219C43.9487 38.3848 43.5254 37.4442 42.7074 36.6262L42.4145 36.3333H44.0002C44.5525 36.3333 45.0002 35.8856 45.0002 35.3333V23.3333C45.0002 22.781 44.5525 22.3333 44.0002 22.3333H36.4145L34.3168 20.2357ZM32.7074 26.6262L40.4145 34.3333H43.0002V24.3333H36.0002C35.735 24.3333 35.4807 24.2279 35.2931 24.0404L32.9026 21.6499C32.7724 21.5197 32.5614 21.5197 32.4312 21.6499L26.0811 28L26.8217 28.7406C27.4726 29.3914 28.5279 29.3914 29.1788 28.7406L31.2931 26.6262C31.6837 26.2357 32.3168 26.2357 32.7074 26.6262ZM30.6466 41.3864C30.6352 41.0318 30.4751 40.5557 29.9598 40.0404L27.9598 38.0404C27.5693 37.6499 27.5693 37.0167 27.9598 36.6262C28.3503 36.2357 28.9835 36.2357 29.374 36.6262L34.0407 41.2929C34.556 41.8081 35.0321 41.9682 35.3867 41.9796C35.7482 41.9913 36.0662 41.8531 36.2931 41.6262C36.5201 41.3992 36.6583 41.0813 36.6466 40.7197C36.6352 40.3651 36.4751 39.889 35.9598 39.3737L31.2931 34.7071C30.9026 34.3165 30.9026 33.6834 31.2931 33.2929C31.6837 32.9023 32.3168 32.9023 32.7074 33.2929L39.374 39.9595C39.8893 40.4748 40.3654 40.6349 40.72 40.6463C41.0816 40.658 41.3995 40.5198 41.6265 40.2929C41.8534 40.0659 41.9916 39.7479 41.9799 39.3864C41.9685 39.0318 41.8084 38.5557 41.2931 38.0404L32.0002 28.7475L30.593 30.1548C29.161 31.5867 26.8394 31.5867 25.4075 30.1548L23.9598 28.7071C23.5693 28.3165 23.5693 27.6834 23.9598 27.2929L26.9194 24.3333H21.0002V34.9191L28.0407 41.9595C28.556 42.4748 29.0321 42.6349 29.3867 42.6463C29.7482 42.658 30.0662 42.5198 30.2931 42.2929C30.5201 42.0659 30.6583 41.7479 30.6466 41.3864Z"
                fill="#23262A"
            />
        </svg>
    );
}

export default function Hjemmelstekst() {
    return (
        <Box>
            <HStack justify="center">
                <HjemmelIcon />
            </HStack>

            <Heading spacing size="large" level="2" id="modal-heading">
                Hvilke formål brukes personopplysningene til?
            </Heading>

            <Heading size="small" level="3" spacing>
                Velfungerende arbeidsmarked
            </Heading>
            <BodyLong spacing>
                Nav skal bidra til et velfungerende arbeidsmarked gjennom en åpen plattform for arbeidsmarkedet. Vi
                lagrer og behandler personopplysninger for å gjøre det enklere for jobbsøkere å finne jobb og for
                arbeidsgivere å skaffe arbeidskraft. Dette er i tråd med Navs samfunnsoppdrag om å få flere i arbeid.
            </BodyLong>

            <Heading size="small" level="3" spacing>
                Arbeidsrettet oppfølging fra Nav
            </Heading>
            <BodyLong spacing>
                Nav behandler personopplysningene til deg som er under oppfølging fra Nav, for å kunne hjelpe deg å
                raskere komme i arbeid. Dette er i tråd med de lovpålagte oppgavene vi har. Opplysningene du oppgir i
                din CV, kan brukes som en del av en vurdering av dine rettigheter til tjenester og ytelser fra Nav.
                Dette omfatter arbeidsformidling, vurdering av ditt bistandsbehov, arbeidsevne og rett til dagpenger.
            </BodyLong>

            <Heading size="small" level="3" spacing>
                Deling av CV med arbeidsgivere
            </Heading>
            <BodyLong spacing>
                Nav bruker CV-en din for å vurdere hvilken hjelp du trenger og kan sende CV-en din til aktuelle
                arbeidsgivere (
                <Link
                    inlineText
                    rel="noopener noreferrer"
                    href="https://lovdata.no/dokument/NL/lov/2006-06-16-20/KAPITTEL_3#%C2%A714a"
                >
                    Nav-loven
                </Link>{" "}
                og{" "}
                <Link
                    inlineText
                    rel="noopener noreferrer"
                    href="https://lovdata.no/dokument/NL/lov/2004-12-10-76?q=arbeidsmarkedsloven"
                >
                    arbeidsmarkedsloven
                </Link>
                ).
            </BodyLong>

            <BodyLong weight="semibold">Slik gjør vi det:</BodyLong>
            <List as="ul">
                <ListItem>
                    Nav-veilederen kan gjøre et søk som finner CV-er som matcher en ledig stilling eller en jobbmesse.
                </ListItem>
                <ListItem>
                    Hvis Nav-veilederen vurderer at CV-en din passer til en stilling eller jobbmesse, kontakter Nav deg.
                </ListItem>
                <ListItem>
                    Hvis du bekrefter at du er interessert i en stilling du blir kontaktet om, og samtykker til å dele
                    CV med den aktuelle arbeidsgiveren, blir du registrert på en liste som kan sendes til arbeidsgiver.
                    NAV-veilederen som har kontakt med arbeidsgiver ser over de aktuelle CV-ene på listen og sender noen
                    eller alle disse CV-ene til arbeidsgiveren.
                </ListItem>
                <ListItem>Om du er aktuell for jobben, vil arbeidsgiveren kontakte deg.</ListItem>
            </List>

            <Heading size="xsmall" level="4" spacing>
                Hva kan arbeidsgivere se?
            </Heading>

            <BodyLong spacing>
                Hvis Nav har sendt CV-en din til en arbeidsgiver, kan arbeidsgiveren se CV-opplysningene dine i inntil
                seks måneder. Hvis du slutter å være under oppfølging av Nav før det har gått 6 måneder blir CV-en din
                hos arbeidsgiver automatisk slettet.
            </BodyLong>

            <Heading size="large" spacing level="2">
                Hvilke personopplysninger samler vi inn?
            </Heading>

            <Heading size="small" level="3" spacing>
                Personalia
            </Heading>
            <BodyLong>
                Når du tar i bruk CV på nav.no, innhenter vi grunnleggende personalia fra folkeregisteret og kontakt- og
                reservasjonsregisteret (KRR):
            </BodyLong>
            <List as="ul">
                <ListItem>Navn</ListItem>
                <ListItem>Telefonnummer</ListItem>
                <ListItem>E-postadresse</ListItem>
                <ListItem>Bostedsadresse</ListItem>
            </List>
            <BodyLong spacing>
                Disse opplysningene er nødvendige for at vi skal kunne opprette en CV for deg. Dersom du ikke ønsker at
                vi behandler disse opplysningene, vil vi ikke kunne opprette en CV. Du kan redigere opplysningene vi har
                om deg, men det vil ikke påvirke dine registrerte data i folkeregisteret eller KRR.
            </BodyLong>
            <BodyLong spacing>
                Mens du er innlogget vil innloggingsinformasjon du avgir oppbevares i en informasjonskapsel, som gjør at
                du forblir innlogget hele tiden mens du er inne på våre sider.
            </BodyLong>

            <Heading size="small" level="3" spacing>
                CV-opplysninger
            </Heading>
            <BodyLong>Du kan registrere følgende CV-opplysninger i vår CV-tjeneste:</BodyLong>
            <List as="ul">
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

            <Heading size="large" spacing level="2">
                Hvor lenge lagres opplysningene dine hos Nav?
            </Heading>
            <BodyLong spacing>
                Opplysningene oppbevares og behandles så lenge du er under oppfølging av Nav. Nav har en lovpålagt plikt
                til å oppbevare opplysningene i CV også etter at oppfølgingen, eller saksbehandlingen, er avsluttet, jf.
                Arkivloven § 6.
            </BodyLong>

            <Heading size="large" spacing level="2">
                Hva er det rettslige grunnlaget for behandlingen av personopplysninger?
            </Heading>
            <BodyLong spacing>
                Utøvelse av offentlig myndighet etter GDPR art 6 bokstav e, har nasjonal forankring i Nav-loven § 4 og
                arbeidsmarkedsloven § 10. Nav behandler personopplysninger for å utøve offentlig myndighet som følger av
                bestemmelser i Nav-loven og arbeidsmarkedsloven om arbeidsrettet oppfølging.
            </BodyLong>
            <BodyLong spacing>
                Dersom Nav-medarbeidere finner en relevant stilling for deg, kan de spørre deg om de kan dele din CV med
                denne arbeidsgiveren. Personopplysningene deles ikke med arbeidsgiveren før du godtar dette, og du kan
                kontakte Nav når som helst for å be om at opplysningene ikke lenger deles med arbeidsgiveren. CV gjøres
                utilgjengelig for arbeidsgiver 6 måneder etter at CV deles med arbeidsgiveren.
            </BodyLong>

            <Heading size="large" spacing level="2">
                CV-deling med den Europeiske Jobbmobilitetsportalen
            </Heading>
            <BodyLong spacing>
                Dersom du ønsker kan du dele CV-en din med arbeidsgivere nasjonalt eller i EU/EØS og Sveits, gjennom den
                Europeiske Jobbmobilitetsportalen (EURES-portalen). EURES er behandlingsansvarlig ved slik deling.
            </BodyLong>
            <BodyLong spacing>
                Du velger selv hvilke opplysninger fra CV-en din som du ønsker å dele med EURES-portalen. Du kan når som
                helst endre eller slette hva du deler.
            </BodyLong>

            <Heading size="small" level="3">
                Våre databehandlere
            </Heading>
            <BodyLong spacing>
                For å kunne tilby våre tjenester benytter vi databehandlere, som innebærer at vi deler dine
                personopplysninger med disse. Dette gjelder for eksempel IT-leverandører som har avtaler med Nav. For å
                lese mer om hvilke eksterne leverandører som leverer tjenester til Nav, se{" "}
                <Link inlineText rel="noopener noreferrer" href="https://www.nav.no/personvernerklaering#hvem">
                    Navs generelle personvernerklæring
                </Link>
                .
            </BodyLong>

            <Heading size="large" spacing level="2">
                Hvilke rettigheter har du?
            </Heading>
            <Heading size="small" level="3">
                Rett til informasjon
            </Heading>
            <BodyLong>
                Du har rett til å få klar og forståelig informasjon om hvordan personopplysningene dine behandles:
            </BodyLong>
            <List as="ul">
                <ListItem>hvordan opplysningene vil bli behandlet</ListItem>
                <ListItem>når vi innhenter personopplysninger fra deg</ListItem>
                <ListItem>formålet personopplysningene skal brukes til</ListItem>
                <ListItem>hvem vi utleverer personopplysningene til</ListItem>
                <ListItem>hvilke rettigheter du har</ListItem>
            </List>

            <Heading size="small" level="3">
                Rett til innsyn og retting
            </Heading>
            <BodyLong spacing>
                Du har rett til å få vite hvilke personopplysninger vi har om deg og be om retting av uriktige
                opplysninger. Du kan logge deg inn på nav.no/min-cv for å se mange av opplysningene vi har registrert om
                deg. For innsyn i personopplysninger ut over dette, må du{" "}
                <Link inlineText rel="noopener noreferrer" href="https://www.nav.no/kontaktoss">
                    ta kontakt med oss på nav.no
                </Link>
                .
            </BodyLong>

            <Heading size="small" level="3">
                Rett til å protestere og rett til sletting
            </Heading>
            <BodyLong spacing>
                Du har rett til å protestere mot behandlingen av dine personopplysninger. For å protestere, tar du
                kontakt med Nav. Nav vil da slutte å behandle opplysningene dine og eventuelt slette dem, med mindre det
                er tungtveiende grunner til at Nav likevel må behandle dem.
            </BodyLong>
            <BodyLong spacing>
                I helt spesielle tilfeller vil du kunne ha rett til å få slettet opplysninger om deg. For at vi skal
                kunne slette personopplysninger om deg, forutsetter det at Nav ikke har en lovpålagt plikt etter
                arkivloven eller annen lovgivning til å lagre opplysningene.
            </BodyLong>

            <Heading size="small" level="3">
                Rett til begrensning av behandlingen
            </Heading>
            <BodyLong spacing>
                Du har rett til å be om at Nav midlertidig stopper behandlingen av dine opplysninger, dersom du mener at
                opplysningene vi har om deg er feil, eller du mener at vår behandling av opplysningene er ulovlig. Det
                samme gjelder dersom du mener at vi ikke trenger opplysningene.
            </BodyLong>

            <Heading size="small" level="3">
                Rett til dataportabilitet
            </Heading>
            <BodyLong spacing>
                Du kan be om å få overført en kopi av personopplysningene som du har registrert om deg i et strukturert,
                maskinlesbart format.
            </BodyLong>

            <Heading size="large" spacing level="2">
                Ta kontakt med Nav
            </Heading>
            <BodyLong spacing>
                Dersom du har spørsmål om rettighetene dine eller har flere spørsmål om personvern, kan du lese{" "}
                <Link inlineText rel="noopener noreferrer" href="https://www.nav.no/personvernerklaering">
                    Personvernerklæring for Nav
                </Link>{" "}
                eller{" "}
                <Link inlineText rel="noopener noreferrer" href="https://www.nav.no/kontaktoss">
                    ta kontakt med oss på nav.no
                </Link>
                .
            </BodyLong>
        </Box>
    );
}
