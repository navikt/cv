import { Button, Link, VStack } from "@navikt/ds-react";
import { ExternalLinkIcon, EyeIcon } from "@navikt/aksel-icons";
import { LastNedCv } from "@/app/(minCV)/_components/lastNedCv/LastNedCv";

export default function HøyreSidemeny({ cvLaster, setVisHovedinnhold }) {
    return (
        <VStack gap="4">
            <Button
                icon={<EyeIcon aria-hidden />}
                variant="primary"
                onClick={() => setVisHovedinnhold(false)}
                disabled={cvLaster}
            >
                Forhåndsvis CV
            </Button>
            <LastNedCv />
            <Link inlineText href="/min-cv/personvern">
                Personvernserklæring for Min CV
            </Link>
            <Link inlineText rel="noopener noreferrer" href="https://vimeo.com/778413745" target="_blank">
                Se video om hvordan du fyller ut CV-en din (åpner i en ny fane{" "}
                <ExternalLinkIcon title="Skriv ut dokument" />)
            </Link>
        </VStack>
    );
}
