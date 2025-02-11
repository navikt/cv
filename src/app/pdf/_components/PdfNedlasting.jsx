"use client";

import { usePerson } from "@/app/_common/hooks/swr/usePerson";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { useEffect, useState } from "react";
import { lastNedCvPdf } from "@/app/_common/utils/lastNedCvPdf";
import { BodyShort, Heading, HStack, Loader, VStack } from "@navikt/ds-react";
import { CheckmarkCircleIcon } from "@navikt/aksel-icons";

import styles from "@/app/page.module.css";

export function PdfNedlasting() {
    const { personalia, personLaster } = usePerson();
    const { cv, cvLaster } = useCv();
    const [nedlastingLaster, setNedlastingLaster] = useState(false);
    const [laster, setLaster] = useState(true);
    const [feil, setFeil] = useState(false);

    useEffect(() => {
        if (personLaster || cvLaster || !laster || nedlastingLaster) return;
        if (!personalia || !cv) setFeil(true);
        setLaster(false);
    }, [personLaster, cvLaster, setLaster, setFeil, laster, personalia, cv, nedlastingLaster]);

    useEffect(() => {
        if (!personalia || !cv || personLaster || cvLaster) return;
        setNedlastingLaster(true);
        lastNedCvPdf(cv, personalia);
        setNedlastingLaster(false);
    }, [cv, cvLaster, personLaster, personalia, setNedlastingLaster]);

    const hentContent = () => {
        if (laster) return <Loader size="3xlarge" />;
        if (feil)
            return (
                <>
                    <Heading size="large">Det har oppstått en feil under nedlasting av CV</Heading>
                    <BodyShort>Vennligst prøv igjen senere</BodyShort>
                </>
            );
        return (
            <>
                <HStack gap="1">
                    <Heading size="large">CVen er lastet ned</Heading>
                    <CheckmarkCircleIcon fontSize="2.4rem" />
                </HStack>
                <BodyShort>Du kan nå lukke dette vinduet</BodyShort>
            </>
        );
    };

    return (
        <VStack align="center" className={[styles.mt16, styles.mb12]}>
            {hentContent()}
        </VStack>
    );
}
