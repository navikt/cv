import { BodyLong, Box, Heading, HStack, Link, List } from "@navikt/ds-react";
import styles from "@/app/page.module.css";
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

            <BodyLong spacing>
                Du er registrert hos Nav. For at Nav skal gi deg arbeidsrettet oppfølging er det relevant med
                opplysninger om din kompetanse, erfaring og jobbønsker. Når du registrerer CV blir opplysningene synlige
                for Nav.
            </BodyLong>
            <BodyLong spacing>Har du tidligere registrert CV hos Nav kan du oppdatere den.</BodyLong>

            <BodyLong spacing>
                Du kan oppdatere, endre eller slette opplysninger i CV-en din når du vil. Nav har en lovpålagt plikt
                etter{" "}
                <Link rel="noopener noreferrer" inlineText href="https://lovdata.no/dokument/NL/lov/1992-12-04-126">
                    Arkivloven
                </Link>{" "}
                til å oppbevare opplysningene i CV også etter at saksbehandlingen er avsluttet. Du finner informasjon om
                hvordan Nav behandler dine personopplysninger i Personvernerklæring for CV for deg som er{" "}
                <Link rel="noopener noreferrer" inlineText href="https://nav.no/min-cv/personvern">
                    under oppfølging av Nav
                </Link>{" "}
                og i{" "}
                <Link rel="noopener noreferrer" inlineText href="https://www.nav.no/personvernerklaering">
                    Navs generelle Personvernerklæring
                </Link>
                .
            </BodyLong>

            <Heading size="small" spacing level="2">
                Deling av CV med arbeidsgivere
            </Heading>
            <BodyLong spacing>
                Nav bruker CV-en din for å vurdere hvilken hjelp du trenger og kan sende CV-en din til aktuelle
                arbeidsgivere (
                <Link rel="noopener noreferrer" inlineText href="https://lovdata.no/lov/2006-06-16-20/%C2%A714a">
                    Nav-loven
                </Link>{" "}
                og{" "}
                <Link
                    rel="noopener noreferrer"
                    inlineText
                    href="https://lovdata.no/dokument/NL/lov/2004-12-10-76?q=arbeidsmarkedsloven"
                >
                    arbeidsmarkedsloven
                </Link>
                ).
            </BodyLong>

            <Heading size="small" level="3">
                Slik gjør vi det:
            </Heading>
            <List className={styles.mb6}>
                <ListItem className={styles.mb3}>
                    Nav-veilederen kan gjøre et søk som finner CV-er som matcher en ledig stilling eller en jobbmesse.
                </ListItem>
                <ListItem className={styles.mb3}>
                    Hvis Nav-veilederen vurderer at CV-en din passer til en stilling eller jobbmesse, kontakter Nav deg.
                </ListItem>
                <ListItem className={styles.mb3}>
                    Hvis du bekrefter at du er interessert i en stilling du blir kontaktet om, og samtykker til å dele
                    CV med den aktuelle arbeidsgiveren, blir du registrert på en liste som kan sendes til arbeidsgiver.
                    NAV-veilederen som har kontakt med arbeidsgiver ser over de aktuelle CV-ene på listen og sender noen
                    eller alle disse CV-ene til arbeidsgiveren.
                </ListItem>
                <ListItem className={styles.mb3}>
                    Om du er aktuell for jobben, vil arbeidsgiveren kontakte deg.
                </ListItem>
            </List>

            <Heading size="small" spacing level="3">
                Hva kan arbeidsgivere se?
            </Heading>
            <BodyLong spacing>
                Hvis Nav har sendt CV-en din til en arbeidsgiver, kan arbeidsgiveren se CV-opplysningene dine i inntil
                seks måneder. Hvis du slutter å være under oppfølging av Nav før det har gått 6 måneder blir CV-en din
                hos arbeidsgiver automatisk slettet.
            </BodyLong>

            <Heading size="small" level="2">
                Hva skjer hvis du ikke registrerer en CV?
            </Heading>
            <List className={styles.mb6}>
                <ListItem className={styles.mb3}>
                    Du kan risikere at Nav ikke har mulighet til å gi deg oppfølgingen du trenger.
                </ListItem>
                <ListItem className={styles.mb3}>
                    Du kan gå glipp av jobbmuligheter, fordi Nav ikke kan vurdere kompetansen din mot ledige stillinger.
                </ListItem>
                <ListItem className={styles.mb3}>
                    Du kan risikere å miste økonomisk støtte fra Nav, for eksempel dagpenger (
                    <Link rel="noopener noreferrer" inlineText href="https://lovdata.no/lov/1997-02-28-19/%C2%A74-5">
                        Folketrygdloven
                    </Link>
                    ).
                </ListItem>
            </List>

            <Heading size="small" level="2">
                Utarbeide statistikk og analyser
            </Heading>
            <List className={styles.mb6}>
                <ListItem className={styles.mb3}>
                    Vi bruker personopplysninger til å utarbeide statistikk og analyser (
                    <Link
                        rel="noopener noreferrer"
                        href="https://lovdata.no/dokument/NL/lov/2006-06-16-20/KAPITTEL_2#%C2%A74"
                    >
                        Nav-loven
                    </Link>
                    )
                </ListItem>
            </List>

            <BodyLong spacing>
                Hvis du vil lese denne teksten igjen, finner du den under &#34;Deling av CV&#34;-seksjonen.
            </BodyLong>
        </Box>
    );
}
