import { Box, Button, FormSummary, Heading, HStack } from "@navikt/ds-react";
import styles from "@/app/page.module.css";

export default function Utdanning() {
    return (
        <div>
            <Box background="surface-default" padding="10" style={{ width: "600px", marginBottom: "2rem" }}>
                <Heading level="2" size="large" align="start" spacing>
                    Utdanning
                </Heading>
                <FormSummary style={{ marginBottom: "2rem" }}>
                    <FormSummary.Header id="4">
                        <FormSummary.Heading level="2">Doktorgrad</FormSummary.Heading>
                    </FormSummary.Header>

                    <FormSummary.Answers>
                        <FormSummary.Answer>
                            <FormSummary.Label>Skole/studiested</FormSummary.Label>
                            <FormSummary.Value>The Jedi Temple</FormSummary.Value>
                        </FormSummary.Answer>

                        <FormSummary.Answer>
                            <FormSummary.Label>Start- og sluttdato</FormSummary.Label>
                            <FormSummary.Value>April 2022 - nå</FormSummary.Value>
                        </FormSummary.Answer>

                        <FormSummary.Answer>
                            <FormSummary.Label>Beskrivelse</FormSummary.Label>
                            <FormSummary.Value>Jedi-knight in training</FormSummary.Value>
                        </FormSummary.Answer>
                    </FormSummary.Answers>
                </FormSummary>
                <HStack justify="space-between" className={styles.mb12}>
                    <Button variant="tertiary">Endre</Button>
                    <Button variant="tertiary">Fjern</Button>
                </HStack>
                <Button variant="primary">+ Legg til flere</Button>
            </Box>
        </div>
    );
}
