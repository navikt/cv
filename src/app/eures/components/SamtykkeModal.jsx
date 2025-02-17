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
                    Jobbmobilitetsportalen (EURES Portalen) slik at arbeidsgivere i EU/EØS + Sveits kan søke på og finne
                    din CV. Tjenesten er et frivillig tilbud til deg som jobbsøker. Å samtykke er frivillig og har ingen
                    konsekvenser for eventuell oppfølging eller ytelser du mottar fra Nav.
                </BodyLong>
                <BodyLong spacing>
                    Når du deler CV-en din med den Europeiske Jobbmobilitetsportalen, vil personopplysningene dine bli
                    behandlet i henhold til{" "}
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
                    Du kan når som helst trekke tilbake samtykket ditt. Trekker du samtykket stopper delingen og
                    opplysningene dine slettes hos den Europeiske Jobbmobilitetsportalen. Se avsnitt 7 for mer
                    informasjon.
                </BodyLong>
                <BodyLong spacing>Hvis du er under 15 år, må du ha samtykke fra en foresatt.</BodyLong>
                <Heading size="small" level="4" spacing>
                    2. Formålet med databehandlingen
                </Heading>
                <BodyLong spacing>
                    Den Europeiske Jobbmobilitetsportalen gjør informasjon og digitale tjenester tilgjengelig for
                    jobbsøkere som ønsker å finne en jobb eller andre muligheter i Europa (EU/EØS + Sveits), for
                    arbeidsgivere som ønsker å finne kandidater i andre land innen EU/EØS + Sveits. For ytterligere
                    opplysninger om tjenester som er tilgjengelige direkte på Den Europeiske Jobbmobilitetsportalen, gå
                    inn på{" "}
                    <Link inlineText rel="noopener noreferrer" href="https://eures.europa.eu/index_no">
                        eures.europa.eu
                    </Link>
                </BodyLong>
                <Heading size="xsmall" level="5" spacing>
                    2.1 Tjenesten er tilgjengelig for brukere med en CV på nav.no
                </Heading>
                <BodyLong spacing>
                    Som jobbsøker kan du selv velge å opprette en konto (jobbsøkerprofil) direkte på Den Europeiske
                    Jobbmobilitetsportalen eures.europa.eu, en slik konto blir ikke opprettet ved overføring av CV fra
                    nav.no.
                </BodyLong>
                <BodyLong spacing>
                    Jobbsøkere som har registrert sin CV på nav.no, kan også velge å overføre sin CV til Den Europeiske
                    Jobbmobilitetsportalen. CV-en blir da tilgjengelig for kandidatsøk på samme måte som en CV som er
                    lagt direkte inn på den Europeiske Jobbmobilitetsportalen.
                </BodyLong>
                <BodyLong spacing>
                    Ved overføring fra nav.no er det en kopi av hele eller deler av din CV på nav.no som blir overført
                    til Den Europeiske Jobbmobilitetsportalen. Endring i hva som er delt gjøres på nav.no. Se også
                    avsnitt 7.
                </BodyLong>
                <Heading size="small" level="4" spacing>
                    3. Rettslig grunnlag for databehandlingen
                </Heading>
                <BodyLong spacing>
                    <Link inlineText rel="noopener noreferrer" href="https://lovdata.no/static/NLX3/32016r0589.pdf">
                        Forordning (EU) 2016/589
                    </Link>{" "}
                    “EURES-forordningen”, særlig kapittel III, utgjør det rettslige grunnlaget for behandlingen av
                    opplysninger som er innsamlet i henhold til denne personvernerklæringen. Forordningen definerer
                    formålet med behandlingen, nemlig å gjøre det mulig å matche ledige stillinger mot jobbsøknader og
                    CV-er, og fastsetter generelle vilkår for behandlingen. Ytterligere bestemmelser om databehandlingen
                    med hensyn til roller og ansvarsområder for de ulike partene som er involvert i behandlingen, er
                    fastsatt i{" "}
                    <Link
                        inlineText
                        rel="noopener noreferrer"
                        href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32017D1257"
                    >
                        Kommisjonens gjennomføringsbeslutning (EU) 2017/1257.
                    </Link>
                </BodyLong>
                <Heading size="small" level="4" spacing>
                    4. Hvilke personopplysninger samles inn og deles med den Europeiske Jobbmobilitetsportalen, og
                    hvordan blir de brukt?
                </Heading>
                <BodyLong spacing>
                    Personopplysningene du som jobbsøker samtykker til å overføre til Den Europeiske
                    Jobbmobilitetsportalen, vil bli brukt i søkemotoren på Den Europeiske Jobbmobilitetsportalen og kan
                    bli vist som et resultat av vellykkede søk. Du kan imidlertid bestemme at alle eller utvalgte
                    personopplysninger skal skjules og ikke vises til mottakerne angitt i punkt 5 under.
                </BodyLong>
                <Heading size="xsmall" level="5" spacing>
                    4.1 Følgende personopplysninger kan bli overført til Den Europeiske Jobbmobilitetsportalen:
                </Heading>
                <BodyLong spacing>
                    Du kan velge hvilke innholdskategorier i CV-en du ønsker å dele. Innholdskategorier du kan dele kan
                    være: Personalia (Navn, e-post, telefonnummer, adresse), fødselsdato, utdanning, arbeidsforhold,
                    kurs, sammendraget ditt i CV, førerkort, sertifiseringer og sertifikater, kompetanseord (nøkkelord
                    fra din CV), språk, jobbønsker og geografisk område du ønsker å jobbe.
                </BodyLong>
                <BodyLong spacing>
                    På siden “CV-deling med den Europeiske Jobbmobilitetsportalen” kan du fritt velge hvilke av disse
                    innholdskategoriene du ønsker å dele.{" "}
                </BodyLong>
                <BodyLong spacing>
                    Dersom din CV ikke inneholder e-post eller telefonnummer, eller du ikke deler “personalia” vil ikke
                    interesserte arbeidsgivere kunne kontakte deg.
                </BodyLong>
                <Heading size="xsmall" level="5" spacing>
                    4.2 Følgende opplysninger kan ikke søkes etter av arbeidsgivere
                </Heading>
                <BodyLong spacing>
                    Opplysninger som er knyttet til kandidatens nasjonalitet, fødselsdato eller alder, navn og
                    kontaktopplysninger, herunder navn og kontaktopplysninger for tidligere og nåværende arbeidsgivere.
                    Kan ikke søkes etter av arbeidsgivere, men arbeidsgivere kan se de i CV-en din, dersom du har delt
                    det.
                </BodyLong>
                <Heading size="small" level="4" spacing>
                    5. Hvordan registreres opplysningene og av hvem?
                </Heading>
                <BodyLong spacing>
                    Opplysningene registreres av deg når du legger inn din CV på Nav sin CV-tjeneste på nav.no. Om du
                    ønsker å dele CV opplysningene dine med den Europeiske Jobbmobilitetsportalen, administrerer du
                    delingen og hva som deles ved å benytte tjenesten «Del CV med den Europeiske Jobbmobilitetsportalen»
                    på nav.no. Samtykker du til deling, så overfører Nav opplysningene til den Europeiske
                    Jobbmobilitetsportalen.
                </BodyLong>
                <Heading size="small" level="4" spacing>
                    6. Hvem har tilgang til dine personopplysninger, og hvem får se dem?
                </Heading>
                <BodyLong spacing>
                    Opplysninger som overføres til Den Europeiske Jobbmobilitetsportalen, lagres i en database i
                    EU-kommisjonen datasenter. Tilgang til dataene beskyttes av autentiseringsmekanismer, enten direkte
                    på Den Europeiske Jobbmobilitetsportalen eller gjennom organisasjonene som er EURES-medlemmer og
                    -partnere via programmeringsgrensesnitt (API-er). Serverne befinner seg i EU-kommisjonen datasenter,
                    der programmet ligger.
                </BodyLong>
                <BodyLong spacing>
                    Arbeidsgivere kan få tilgang til CV-er som er lastet opp eller overført til Den Europeiske
                    Jobbmobilitetsportalen, enten direkte på Den Europeiske Jobbmobilitetsportalen eller via tilsvarende
                    tjenester som tilbys av organisasjoner som er EURES-medlemmer eller -partnere.
                </BodyLong>
                <Heading size="xsmall" level="5" spacing>
                    6.1 Tilgang på Den Europeiske Jobbmobilitetsportalen
                </Heading>
                <BodyLong spacing>
                    Opplysninger om jobbsøkernes CV-er gjøres tilgjengelig på Den Europeiske Jobbmobilitetsportalen for
                    søke-, matchings- og visningsformål, for arbeidsgivere som er registrert og bekreftet av nettstedets
                    administrator på vegne av behandlingsansvarlig, og for ansatte som arbeider i organisasjoner som er
                    EURES-medlemmer eller -partnere.
                </BodyLong>
                <Heading size="xsmall" level="5" spacing>
                    6.2 Tilgang via tjenestene til andre EURES- medlemmer eller partnere.
                </Heading>
                <BodyLong spacing>
                    Opplysninger kan også gjøres tilgjengelig for organisasjoner som er EURES-medlemmer og -partnere.
                    EURES-medlemmer eller –partnere kan være offentlige sysselsettingstjenester i andre land, og andre
                    sysselsettingstjenester og organisasjoner som tilbyr tjenester til jobbsøkere og arbeidsgivere.
                    Oversikt over EURES-medlemmer (som tilbyr alle EURES tjenestene) eller EURES-partnere (som tilbyr
                    enkelte av EURES tjenestene), kan du få her:{" "}
                    <Link
                        inlineText
                        rel="noopener noreferrer"
                        href="https://ec.europa.eu/eures/public/no/eures-in-your-country"
                    >
                        https://ec.europa.eu/eures/public/no/eures-in-your-country
                    </Link>
                </BodyLong>
                <BodyLong spacing>
                    Det betyr at CV-en du har delt med den Europeiske Jobbmobilitetsportalen, kan deles videre med andre
                    EURES-medlemmer eller partnere. I så tilfelle kan opplysninger om jobbsøkernes CV-er også gjøres
                    tilgjengelig for søke-, matchings- og visningsformål på deres tjenester.
                </BodyLong>
                <Heading size="xsmall" level="5" spacing>
                    6.3 Vilkår for arbeidsgivere
                </Heading>
                <BodyLong spacing>
                    Arbeidsgivere som ønsker å få tilgang på opplysningene dine, kan bare gjøre dette hvis de har
                    godtatt og forpliktet seg til å rette seg etter de felles vilkårene som er fastsatt for bruk.
                </BodyLong>
                <Heading size="small" level="4" spacing>
                    7. Hvem har ansvar for hva når det gjelder behandling av personopplysningene du deler med den
                    Europeiske Jobbmobilitetsportalen?
                </Heading>
                <BodyLong spacing>
                    Det europeiske EURES-samordningskontoret, som ligger under EU-kommisjonens Generaldirektorat for
                    sysselsetting, sosiale spørsmål og inkludering, er “behandlingsansvarlig” i{" "}
                    <Link
                        inlineText
                        rel="noopener noreferrer"
                        href="https://eur-lex.europa.eu/legal-content/DA/TXT/?uri=celex:32001R0045"
                    >
                        henhold til forordning (EF) nr. 45/2001
                    </Link>{" "}
                    for opplysningene på Den Europeiske Jobbmobilitetsportalen. Dette organet er ansvarlig for
                    utvikling, støtte og drift av Den Europeiske Jobbmobilitetsportalen og for tekniske og
                    organisatoriske tiltak som innføres for å sikre tilstrekkelig sikkerhet for personopplysningene, og
                    særlig den fortrolige behandling og integritet som er påkrevet. Utvikling, støtte og drift av
                    systemet kan settes ut til eksterne selskaper eller organisasjoner som opptrer som “databehandler”
                    på vegne av Det europeiske samordningskontoret.
                </BodyLong>
                <BodyLong spacing>
                    Det nasjonale EURES-samordningskontoret i Norge ligger hos Arbeids og- Velferdsdirektoratet. Det er
                    direktoratet som er behandlingsansvarlig i henhold til den generelle personvernsforordningen for den
                    samordna kanalen som brukes ved overføring av din CV fra EURES-medlemmenes og -partnernes systemer
                    til Den Europeiske Jobbmobilitetsportalen.
                </BodyLong>
                <BodyLong spacing>
                    Arbeids- og velferdsdirektoratet (Nav) er i henhold til den generelle personvernsforordningen
                    behandlingsansvarlig for systemene som brukes ved innsamling av opplysninger fra jobbsøkere og
                    overføring av dem til Den Europeiske Jobbmobilitetsportalen. Der det er relevant, kan vi også yte
                    tjenester til arbeidsgivere som har tilgang til dataene gjennom Den Europeiske
                    Jobbmobilitetsportalens API-er.
                </BodyLong>
                <BodyLong spacing>
                    Som jobbsøker har du selv ansvar for kvaliteten på opplysningene du legger inn. Du kan når som helst
                    få tilgang til, endre, fjerne og slette opplysningene dine. Ytterligere informasjon om dette er gitt
                    nedenfor i avsnitt 8.
                </BodyLong>
                <Heading size="small" level="4" spacing>
                    8. Hvordan kan du kontrollere, endre eller slette opplysningene dine?
                </Heading>
                <BodyLong spacing>
                    En CV som er overført til Den Europeiske Jobbmobilitetsportalens CV-database sammen med instrukser
                    for behandling og visning som beskrevet over i avsnitt 4, er en kopi av opplysningene du har gitt i
                    CV-en som er opprettet her på nav.no. Du kan når som helst kontrollere, endre eller slette delte
                    opplysningene ved å logge inn på nav.no, utføre ønskede endringer, så overføres endringene til Den
                    Europeiske Jobbmobilitetsportalen.
                </BodyLong>
                <BodyLong spacing>
                    Har du en aktiv deling av CV med Den Europeiske Jobbmobilitetsportalen, og gjør endringer på CV-en
                    din på nav.no så synkroniseres endringene med den CV som er delt med Den Europeiske
                    Jobbmobilitetsportalen. Dette er merket tydelig i din CV på nav.no. Slik at du har full oversikt
                    over hva du deler med den Europeiske Jobbmobilitetsportalen.
                </BodyLong>
                <BodyLong spacing>
                    Hvis du bestemmer deg for å slette CV-en på nav.no, vil den også bli slettet på Den Europeiske
                    Jobbmobilitetsportalen. Du kan også når som helst bestemme at du med umiddelbar virkning vil trekke
                    tilbake eller endre hva du ønsker å overføre til Den Europeiske Jobbmobilitetsportalen. Hvis du
                    trekker samtykket ditt tilbake, vil kopien av CV-en som er overført til Den Europeiske
                    Jobbmobilitetsportalen, slettes på Den Europeiske Jobbmobilitetsportalen, men opplysningene som
                    ligger på nav.no, berøres ikke.
                </BodyLong>
                <Heading size="small" level="4" spacing>
                    9. Hvor lenge oppbevares opplysningene?
                </Heading>
                <BodyLong spacing>
                    CV-er som overføres til Den Europeiske Jobbmobilitetsportalen, vil bare bli lagret og være
                    tilgjengelig der så lenge den opprinnelige CV-en som ble opprettet på nav.no, er tilgjengelig. Hvis
                    du sletter dataene på nav.no eller trekker samtykket tilbake, vil opplysningene dine på Den
                    Europeiske Jobbmobilitetsportalen slettes.
                </BodyLong>
                <BodyLong>Samtykket og opplysningene du deler slettes automatisk når:</BodyLong>
                <List as="ul">
                    <List.Item>
                        Etter et år. Ved å oppdatere ditt samtykke, forskyves den automatiske slettingen med 1 år.
                    </List.Item>
                    <List.Item>
                        Om du er under oppfølging av Nav når du tar i bruk tjenestene på nav.no, blir du inaktiv når du
                        ikke lenger er under oppfølging av Nav, og da slettes opplysningene du deler.
                    </List.Item>
                    <List.Item>
                        Dersom du ikke er under oppfølging av Nav, og har frivillig samtykket til å ta i bruk tjenestene
                        på nav.no, blir du inaktiv om du sletter dette samtykket, da slettes opplysningene du deler.
                    </List.Item>
                </List>
                <BodyLong spacing>
                    Dersom du ønsker å fortsette å ha din CV hos den Europeiske Jobbmobilitetsportalen, også etter du er
                    blitt inaktiv på nav.no, kan du opprette en egen profil direkte hos den Europeiske
                    Jobbmobilitetsportalen.
                </BodyLong>
                <BodyLong spacing>
                    Som tiltak mot dataforfalskning og feil på maskinvare og programvare vil det daglig bli tatt
                    sikkerhetskopier av CV-databasen på Den Europeiske Jobbmobilitetsportalen. Personopplysninger i
                    sikkerhetskopier blir ikke utlevert annet enn i tilfeller der databasen må gjenopprettes, og vil
                    uansett ikke bli oppbevart i mer enn én måned.
                </BodyLong>
                <BodyLong spacing>
                    Når CV-en din er slettet eller du har trukket tilbake samtykket til overføring til Den Europeiske
                    Jobbmobilitetsportalen, vil den Europeiske Jobbmobilitetsportalen likevel oppbevare et begrenset
                    sett med opplysninger. Disse vil bare bli brukt for forsknings- og statistikkformål. Opplysningene
                    anonymiseres slik at den registrerte ikke kan identifiseres. Opplysningene betraktes da ikke lenger
                    som personopplysninger.
                </BodyLong>
                <Heading size="small" level="4" spacing>
                    10. Kontaktopplysninger og klageadgang
                </Heading>
                <BodyLong spacing>
                    Den Europeiske Jobbmobilitetsportalen administreres av Det Europeiske Samordningskontoret for EURES,
                    som ligger under EU-kommisjonens Generaldirektorat for sysselsetting, sosiale spørsmål og
                    inkludering.
                </BodyLong>
                <BodyLong spacing>
                    Alle spørsmål, klager og andre henvendelser om opplysninger som er overført til og behandles på Den
                    Europeiske Jobbmobilitetsportalen, rettes til den behandlingsansvarlige på følgende e-postadresse:{" "}
                    <Link inlineText rel="noopener noreferrer" href="mailto:empl-eures@ec.europa.eu">
                        empl-eures@ec.europa.eu
                    </Link>
                </BodyLong>
                <BodyLong spacing>
                    EURES’ nasjonale samordningskontor ligger i Norge hos Arbeids- og velferdsdirektoratet. De har
                    ansvaret for å føre tilsyn med driften av den samordna kanalen som overfører CV-en din til Den
                    Europeiske Jobbmobilitetsportalen. De kan kontaktes gjennom postboksadresse: Postboks 354, 8601 Mo i
                    Rana
                </BodyLong>
                <BodyLong spacing>
                    Nav leverer denne tjenesten, og er det organet som mottar og overfører din CV til Den Europeiske
                    Jobbmobilitetsportalen. Anmodninger om innsyn, endring eller sletting av opplysninger og begrensning
                    av behandlingen samt dataportabilitet skal rettes til Nav.
                </BodyLong>
                <BodyLong spacing>
                    Du kan kontakte Nav ved å ringe 55553333. Du kan også logge inn på{" "}
                    <Link inlineText rel="noopener noreferrer" href="https://www.nav.no">
                        nav.no
                    </Link>{" "}
                    og bruke tjenesten.{" "}
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
                    <Link
                        inlineText
                        rel="noopener noreferrer"
                        href="https://www.nav.no/no/nav-og-samfunn/om-nav/personvern-i-arbeids-og-velferdsetaten/personvernombudet-i-nav"
                    >
                        Se hvordan du kan kontakte personvernombudet.
                    </Link>
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
                </BodyLong>
                <BodyLong spacing>
                    Eller nasjonalt til Datatilsynet:{" "}
                    <Link
                        inlineText
                        rel="noopener noreferrer"
                        href="https://edps.europa.eu/data-protection/our-role-supervisor/complaints"
                    >
                        https://www.datatilsynet.no/om-datatilsynet/kontakt-oss
                    </Link>
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
