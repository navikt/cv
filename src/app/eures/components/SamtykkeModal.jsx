import { BodyLong, Button, Heading, Link, List, Modal } from "@navikt/ds-react";

export default function SamtykkeModal({ open, setOpen }) {
    return (
        <Modal open={open} onClose={() => setOpen(false)} aria-labelledby="modal-heading">
            <Modal.Header>
                <Heading size="large" level="2" id="modal-heading">
                    Del CV med den Europeiske Jobbmobilitetsportalen - personvernerklæring
                </Heading>
            </Modal.Header>
            <Modal.Body>
                <Heading size="small" level="4" spacing>
                    1. Innledning
                </Heading>
                <BodyLong spacing>
                    Denne tjenesten lar deg overføre CV-en du har på Nav sin tjeneste nav.no til Den Europeiske
                    Jobbmobilitetsportalen (EURES-portalen) slik at arbeidsgivere i EU/EØS + Sveits kan søke etter og
                    finne din CV. Tjenesten er et frivillig tilbud til deg som jobbsøker. Å samtykke er frivillig og har
                    ingen konsekvenser for eventuell oppfølging eller ytelser du mottar fra Nav.
                </BodyLong>
                <BodyLong spacing>
                    Når du deler CV-en din med EURES-portalen, vil personopplysningene dine bli behandlet i henhold til{" "}
                    <Link inlineText rel="noopener noreferrer" href="https://lovdata.no/dokument/NL/lov/2018-06-15-38">
                        Personopplysningsloven
                    </Link>
                    ,{" "}
                    <Link
                        inlineText
                        rel="noopener noreferrer"
                        href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32016R0679"
                    >
                        forordning (EU) 2016/679
                    </Link>{" "}
                    og{" "}
                    <Link
                        inlineText
                        rel="noopener noreferrer"
                        href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=celex%3A32001R0045"
                    >
                        forordning (EF) nr. 45/2001
                    </Link>{" "}
                    når det gjelder behandlingen som utføres av EU-kommisjonen.
                </BodyLong>
                <BodyLong spacing>
                    Du kan når som helst trekke tilbake samtykket ditt. Trekker du samtykket stopper delingen, og
                    opplysningene dine slettes hos EURES-portalen. Se avsnitt 8 for mer informasjon.
                </BodyLong>
                <BodyLong spacing>
                    Hvis du er under 15 år, og ønsker frivillig å overføre CV-en din, må du ha samtykke fra en foresatt.
                </BodyLong>

                <Heading size="small" level="4" spacing>
                    2. Formålet med behandlingen
                </Heading>
                <BodyLong spacing>
                    EURES-portalen gjør informasjon og digitale tjenester tilgjengelig for jobbsøkere som ønsker å finne
                    en jobb eller andre muligheter i EU/EØS + Sveits, og for arbeidsgivere som ønsker å finne kandidater
                    i andre land innen EU/EØS + Sveits. For ytterligere opplysninger om tjenester som er tilgjengelige
                    direkte på EURES-portalen, gå til{" "}
                    <Link inlineText rel="noopener noreferrer" href="https://eures.europa.eu/index_no">
                        eures.europa.eu
                    </Link>
                    .
                </BodyLong>

                <Heading size="xsmall" level="5" spacing>
                    2.1 Tjenesten er tilgjengelig for brukere med en CV på nav.no
                </Heading>
                <BodyLong spacing>
                    Når du er under oppfølging av Nav og har registrert din CV på nav.no, kan du frivillig velge å
                    overføre din CV til EURES-portalen. CV-en blir da tilgjengelig for kandidatsøk.
                </BodyLong>
                <BodyLong spacing>
                    Ved overføring fra nav.no er det en kopi av hele eller deler av din CV på nav.no som blir overført
                    til EURES-portalen. Endring i hva som er delt gjøres på nav.no. Se også avsnitt 8.
                </BodyLong>

                <Heading size="small" level="4" spacing>
                    3. Hvem har ansvar for hva når det gjelder behandling av personopplysningene du deler med EURES
                    Portalen?
                </Heading>
                <BodyLong spacing>
                    Det Europeiske Samordningskontoret for EURES er plassert hos Den Europeiske
                    Arbeidsmarkedsmyndigheten. I{" "}
                    <Link
                        inlineText
                        rel="noopener noreferrer"
                        href="https://eur-lex.europa.eu/legal-content/DA/TXT/?uri=celex:32001R0045"
                    >
                        henhold til forordning (EF) nr. 45/2001
                    </Link>
                    , er kontoret behandlingsansvarlig for opplysningene på EURES-portalen. Organet er ansvarlig for
                    utvikling, støtte og drift av EURES-portalen og for tekniske og organisatoriske tiltak som innføres
                    for å sikre tilstrekkelig sikkerhet for personopplysningene. Forvaltning av systemet kan settes ut
                    til eksterne selskaper eller organisasjoner som opptrer som databehandler på vegne av Det Europeiske
                    samordningskontoret for EURES.
                </BodyLong>
                <BodyLong spacing>
                    Den Nasjonale Samordningsenheten for EURES i Norge ligger hos Arbeids og- Velferdsdirektoratet
                    (Nav). Det er direktoratet som er behandlingsansvarlig for den samordna kanalen som brukes ved
                    overføring av din CV. Der det er relevant, kan vi også yte tjenester til arbeidsgivere som har
                    tilgang til dataene gjennom EURES-portalens API-er.
                </BodyLong>
                <BodyLong spacing>
                    Som jobbsøker har du selv ansvar for kvaliteten på opplysningene du legger inn. Du kan når som helst
                    få tilgang til, endre, fjerne og slette opplysningene dine. Ytterligere informasjon om dette er gitt
                    nedenfor i avsnitt 8.
                </BodyLong>

                <Heading size="small" level="4" spacing>
                    4. Hvilke personopplysninger samles inn og deles med EURES-portalen, og hvordan blir de brukt?
                </Heading>
                <BodyLong spacing>
                    Personopplysningene du som jobbsøker samtykker til å overføre til EURES-portalen, vil bli brukt i
                    søkemotoren, og kan bli vist som et resultat av vellykkede søk. Du kan imidlertid bestemme at alle
                    eller utvalgte personopplysninger skal skjules og ikke vises til mottakerne.
                </BodyLong>

                <Heading size="xsmall" level="5" spacing>
                    4.1 Følgende personopplysninger kan bli overført til EURES-portalen
                </Heading>
                <BodyLong>Innholdskategorier du kan dele er:</BodyLong>
                <List as="ul">
                    <List.Item>Personalia (navn, e-post, telefonnummer, adresse, fødselsdato)</List.Item>
                    <List.Item>utdanning</List.Item>
                    <List.Item>arbeidsforhold</List.Item>
                    <List.Item>kurs</List.Item>
                    <List.Item>sammendraget ditt i CV</List.Item>
                    <List.Item>førerkort</List.Item>
                    <List.Item>godkjenninger</List.Item>
                    <List.Item>kompetanser (nøkkelord fra din CV)</List.Item>
                    <List.Item>språk</List.Item>
                    <List.Item>jobbønsker og geografisk område du ønsker å jobbe</List.Item>
                </List>
                <BodyLong spacing>
                    På siden “CV-deling med EURES-portalen” kan du fritt velge hvilke av disse innholdskategoriene du
                    ønsker å dele.
                </BodyLong>
                <BodyLong spacing>
                    Dersom din CV på EURES-portalen ikke inneholder kontaktinformasjon slik som e-post eller
                    telefonnummer, kan Nav videreformidle en forespørsel fra en EURES-medlemsorganisasjon eller en
                    arbeidsgiver for å få kontakt med deg. Det vil kun skje i de tilfeller der din CV matcher med en
                    stilling. Du bestemmer selv om du ønsker å besvare henvendelsen fra EURES-medlemsorganisasjonen
                    eller arbeidsgiveren.
                </BodyLong>

                <Heading size="xsmall" level="5" spacing>
                    4.2 Følgende opplysninger kan ikke søkes etter av arbeidsgivere
                </Heading>
                <BodyLong spacing>
                    Opplysninger som er knyttet til kandidatens nasjonalitet, fødselsdato eller alder, navn og
                    kontaktopplysninger, herunder navn og kontaktopplysninger for tidligere og nåværende arbeidsgivere,
                    kan ikke søkes etter av arbeidsgivere, men arbeidsgivere kan se dem i CV-en din, dersom du har delt
                    det.
                </BodyLong>

                <Heading size="small" level="4" spacing>
                    5. Hvordan registreres opplysningene og av hvem?
                </Heading>
                <BodyLong spacing>
                    Opplysningene registreres av deg når du legger inn din CV på Nav sin CV-tjeneste på nav.no. Om du
                    ønsker å dele CV opplysningene dine med EURES-portalen, administrerer du delingen og hva som deles
                    ved å benytte tjenesten «CV-deling med EURES-portalen» på nav.no.
                </BodyLong>
                <BodyLong spacing>
                    Dersom du samtykker til deling, vil Nav overføre opplysningene til EURES-portalen.
                </BodyLong>

                <Heading size="small" level="4" spacing>
                    6. Rettslig grunnlag for behandlingen
                </Heading>
                <BodyLong spacing>
                    <Link inlineText rel="noopener noreferrer" href="https://lovdata.no/static/NLX3/32016r0589.pdf">
                        Forordning (EU) 2016/589
                    </Link>{" "}
                    (EURES-forordningen), særlig kapittel III, utgjør det rettslige grunnlaget for behandling av
                    opplysninger som er beskrevet i denne personvernerklæringen. Forordningen gir generelle vilkår for
                    behandlingen, og fastsetter at formålet med behandlingen er å gjøre det mulig å matche ledige
                    stillinger mot jobbsøknader og CV-er.
                </BodyLong>

                <Heading size="small" level="4" spacing>
                    7. Hvem har tilgang til dine personopplysninger, og hvem får se dem?
                </Heading>
                <BodyLong spacing>
                    Opplysninger om jobbsøkernes CV-er gjøres tilgjengelig på EURES-portalen for søke-, matchings- og
                    visningsformål, for arbeidsgivere som er registrert og bekreftet av nettstedets administrator på
                    vegne av behandlingsansvarlig, og for ansatte som arbeider i godkjente eller utpekte
                    EURES-medlemsorganisasjoner.
                </BodyLong>

                <Heading size="xsmall" level="5" spacing>
                    7.1 Tilgang på EURES-portalen
                </Heading>
                <BodyLong spacing>
                    Opplysninger som overføres til EURES-portalen, lagres i en database i EU-kommisjonens datasenter i
                    Europa. Tilgang til dataene beskyttes av autentiseringsmekanismer, enten direkte på EURES-portalen
                    eller gjennom EURES-medlemsorganisasjonene via programmeringsgrensesnitt (API-er).
                </BodyLong>
                <BodyLong spacing>
                    Arbeidsgivere kan få tilgang til CV-er som er lastet opp eller overført til EURES-portalen, enten
                    direkte på EURES-portalen eller via tilsvarende tjenester som tilbys av EURES-medlemsorganisasjoner.
                </BodyLong>

                <Heading size="xsmall" level="5" spacing>
                    7.2 Tilgang via tjenestene til andre EURES- medlemmer eller partnere via API
                </Heading>
                <BodyLong spacing>
                    Opplysninger kan også gjøres tilgjengelig for organisasjoner som er EURES-medlemsorganisasjoner.
                    EURES-medlemsorganisasjoner kan være offentlige arbeidsmarkedsetater i andre land, og andre
                    arbeidsformidlingstjenester og organisasjoner som tilbyr tjenester til jobbsøkere og arbeidsgivere.
                    Oversikt over EURES-medlemmer (som tilbyr alle EURES tjenestene) eller EURES-partnere (som tilbyr
                    enkelte av EURES tjenestene), kan du få her:{" "}
                    <Link
                        inlineText
                        rel="noopener noreferrer"
                        href="https://eures.europa.eu/eures-services/eures-members-and-partners-your-country_no"
                    >
                        https://eures.europa.eu/eures-services/eures-members-and-partners-your-country_no
                    </Link>
                </BodyLong>
                <BodyLong spacing>
                    Det betyr at CV-en du har delt med EURES-portalen, kan deles videre med andre
                    EURES-medlemsorganisasjoner. I så tilfelle kan opplysninger om jobbsøkernes CV-er også gjøres
                    tilgjengelig for søke-, matchings- og visningsformål på deres tjenester.
                </BodyLong>

                <Heading size="xsmall" level="5" spacing>
                    7.3 Vilkår for arbeidsgivere
                </Heading>
                <BodyLong spacing>
                    Arbeidsgivere som ønsker å få tilgang på opplysningene dine, kan bare gjøre dette hvis de har
                    godtatt og forpliktet seg til å rette seg etter de felles vilkårene som er fastsatt for bruk.
                </BodyLong>

                <Heading size="small" level="4" spacing>
                    8. Hvordan kan du kontrollere, endre eller slette opplysningene dine?
                </Heading>
                <BodyLong spacing>
                    En CV som er overført til EURES-portalens CV-database sammen med instrukser for behandling og
                    visning som beskrevet over i avsnitt 4, er de samme opplysningene du har gitt i CV-en som er
                    opprettet her på nav.no. Du kan når som helst kontrollere, endre eller slette de delte opplysningene
                    ved å logge inn på nav.no, og utføre ønskede endringer.
                </BodyLong>
                <BodyLong spacing>
                    Har du en aktiv deling av CV med EURES-portalen, og gjør endringer på CV-en din på nav.no så
                    synkroniseres endringene med den CV som er delt med EURES-portalen. Dette er merket tydelig i din CV
                    på nav.no. Slik har du full oversikt over hva du deler med EURES-portalen.
                </BodyLong>
                <BodyLong spacing>
                    Hvis du bestemmer deg for å slette CV-en på nav.no, vil den også bli slettet på EURES-portalen. Du
                    kan også når som helst bestemme at du med umiddelbar virkning vil trekke tilbake eller endre hva du
                    ønsker å overføre til EURES-portalen. Hvis du trekker samtykket ditt tilbake, vil kopien av CV-en
                    som er overført til EURES-portalen slettes der uten at det påvirker opplysningene som ligger på
                    nav.no.
                </BodyLong>

                <Heading size="small" level="4" spacing>
                    9. Hvor lenge oppbevares opplysningene?
                </Heading>
                <BodyLong spacing>
                    CV-er som overføres til EURES-portalen, vil bare bli lagret og være tilgjengelig der så lenge den
                    opprinnelige CV-en som ble opprettet på nav.no er tilgjengelig. Hvis du sletter dataene på nav.no
                    eller trekker samtykket tilbake, vil også opplysningene dine på EURES-portalen slettes.
                </BodyLong>
                <BodyLong>Samtykket og opplysningene du deler slettes automatisk når:</BodyLong>
                <List as="ul">
                    <List.Item>
                        samtykke ikke oppdateres etter ett år. Ved å oppdatere ditt samtykke, forskyves den automatiske
                        slettingen med 1 år.
                    </List.Item>
                    <List.Item>
                        du ikke lengre er under oppfølging av Nav. Om du deler CV med EURES-portalen mens du er under
                        oppfølging av Nav, blir du inaktiv når du ikke lenger er under oppfølging av Nav, da slettes
                        også opplysningene du deler.
                    </List.Item>
                    <List.Item>
                        dersom du trekker samtykket til deling med EURES-portalen mens du fortsatt er under oppfølging
                        av Nav, slettes opplysningene du deler fra EURES-portalen.
                    </List.Item>
                </List>
                <BodyLong spacing>
                    Dersom du ønsker å fortsette å ha din CV hos EURES-portalen, også etter du er blitt inaktiv på
                    nav.no,{" "}
                    <Link
                        inlineText
                        rel="noopener noreferrer"
                        href="https://eures.europa.eu/jobseekers/create-your-europass_no"
                    >
                        kan du fra EURES-portalen opprette en egen Europass-profil
                    </Link>
                    . Denne profilen kan du så dele med EURES-portalen. Dette gjelder uavhengig av om du er under
                    oppfølging av Nav. En slik profil blir ikke opprettet ved overføring av CV fra nav.no. CV-en blir da
                    tilgjengelig for kandidatsøk på samme måte som en CV som er overført fra nav.no.
                </BodyLong>
                <BodyLong spacing>
                    Som tiltak mot dataforfalskning og feil på maskinvare og programvare vil det daglig bli tatt
                    sikkerhetskopier av CV-databasen på EURES-portalen. Personopplysninger i sikkerhetskopier blir ikke
                    utlevert annet enn i tilfeller der databasen må gjenopprettes, og vil uansett ikke bli oppbevart i
                    mer enn én måned.
                </BodyLong>
                <BodyLong spacing>
                    Når CV-en din er slettet eller du har trukket tilbake samtykket til overføring til EURES-portalen,
                    vil EURES-portalen oppbevare et begrenset sett med opplysninger som bare vil bli brukt for
                    forsknings- og statistikkformål. Opplysningene anonymiseres slik at den registrerte ikke kan
                    identifiseres. Når dataene er anonymisert, regnes de ikke lenger som personopplysninger og omfattes
                    derfor ikke av denne personvernerklæringen.
                </BodyLong>

                <Heading size="small" level="4" spacing>
                    10. Kontaktopplysninger og klageadgang
                </Heading>
                <BodyLong spacing>
                    EURES-portalen administreres av Det Europeiske Samordningskontoret for EURES, som forvaltes av Den
                    Europeiske arbeidsmarkedsmyndigheten.
                </BodyLong>
                <BodyLong spacing>
                    Alle spørsmål, klager og andre henvendelser om opplysninger som er overført til og behandles på
                    EURES-portalen, rettes til den behandlingsansvarlige på følgende e-postadresse:{" "}
                    <Link inlineText rel="noopener noreferrer" href="mailto:empl-eures@ec.europa.eu">
                        empl-eures@ec.europa.eu
                    </Link>
                    .
                </BodyLong>
                <BodyLong spacing>
                    Den Nasjonale Samordningsenheten for EURES ligger i Norge hos Arbeids- og velferdsdirektoratet.
                    Direktoratet har ansvaret for å føre tilsyn med driften av den samordna kanalen som overfører CV-en
                    din til EURES-portalen. De kan kontaktes gjennom postboksadresse: Postboks 354, 8601 Mo i Rana.
                </BodyLong>
                <BodyLong spacing>
                    Nav leverer denne tjenesten, og er det organet som mottar og overfører din CV til EURES-portalen.
                    Anmodninger om innsyn, endring eller sletting av opplysninger og begrensning av behandlingen samt
                    dataportabilitet skal rettes til Nav.
                </BodyLong>
                <BodyLong spacing>
                    Du kan kontakte Nav ved å ringe 55553333. Du kan også logge inn på{" "}
                    <Link inlineText rel="noopener noreferrer" href="https://www.nav.no">
                        nav.no
                    </Link>{" "}
                    og bruke tjenesten{" "}
                    <Link
                        inlineText
                        rel="noopener noreferrer"
                        href="https://www.nav.no/person/kontakt-oss/nb/skriv-til-oss"
                    >
                        Skriv til oss
                    </Link>{" "}
                    om du foretrekker det. Der besvares henvendelser om personopplysninger fra deg kostnadsfritt og
                    senest innen 30 dager.
                </BodyLong>
                <BodyLong spacing>
                    Personvernombudet i Nav kan gi deg råd og veiledning om hvordan vi behandler personopplysninger, og
                    hjelpe deg med å ivareta dine personverninteresser.{" "}
                    <Link inlineText rel="noopener noreferrer" href="https://www.nav.no/personvernombudet">
                        Se hvordan du kan kontakte personvernombudet
                    </Link>
                    .
                </BodyLong>
                <BodyLong spacing>
                    I tilfelle tvist med hensyn til behandlingen av dine personopplysninger kan klagen rettes til EUs
                    datatilsyn. For ytterligere opplysninger og kontaktdetaljer, se:{" "}
                    <Link
                        inlineText
                        rel="noopener noreferrer"
                        href="https://edps.europa.eu/data-protection/our-role-supervisor/complaints"
                    >
                        https://edps.europa.eu/data-protection/our-role-supervisor/complaints
                    </Link>
                    .
                </BodyLong>
                <BodyLong spacing>
                    Eller nasjonalt til Datatilsynet:{" "}
                    <Link
                        inlineText
                        rel="noopener noreferrer"
                        href="https://www.datatilsynet.no/om-datatilsynet/kontakt-oss"
                    >
                        https://www.datatilsynet.no/om-datatilsynet/kontakt-oss
                    </Link>
                    .
                </BodyLong>
            </Modal.Body>
            <Modal.Footer>
                <Button type="button" onClick={() => setOpen(false)}>
                    Lukk
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
