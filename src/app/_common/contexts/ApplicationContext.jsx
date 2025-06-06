import React from "react";
import PropTypes from "prop-types";
import { useErInnlogget } from "@/app/_common/hooks/swr/useErInnlogget";
import { Feilside, FeilsideÅrsak } from "@/app/_common/components/Feilside";
import { usePerson } from "@/app/_common/hooks/swr/usePerson";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { useNotifikasjoner } from "@/app/_common/hooks/useNotifikasjoner";
import { Notifikasjoner } from "@/app/_common/components/Notifikasjoner";
import { Hjemmelside } from "@/app/(minCV)/_components/hjemmelside/Hjemmelside";
import { HjemmelsideVeileder } from "@/app/(minCV)/_components/hjemmelside/HjemmelsideVeileder";

export const ApplicationContext = React.createContext({});

function ApplicationProvider({ children, erVeileder, erDemoApp, erPdf = false }) {
    const { erInnlogget, innloggingLaster, innloggingHarFeil, harBlittUtlogget } = useErInnlogget();
    const { harIkkeSettHjemmel, erUnderOppfølging, personHarFeil, erManuell } = usePerson();
    const { cvHarFeil } = useCv(erVeileder);
    const { notifikasjoner, suksessNotifikasjon, errorNotifikasjon } = useNotifikasjoner();

    const hentSideinnhold = () => {
        if (innloggingHarFeil || personHarFeil || cvHarFeil) {
            const årsak = erVeileder ? FeilsideÅrsak.FETCH_ERROR_VEILEDER : FeilsideÅrsak.FETCH_ERROR;
            return <Feilside årsak={årsak} />;
        }

        if (!erInnlogget && !innloggingLaster) {
            const årsak = harBlittUtlogget ? FeilsideÅrsak.LOGGET_UT : FeilsideÅrsak.IKKE_LOGGET_INN;
            return <Feilside årsak={årsak} />;
        }

        if (erUnderOppfølging === false) {
            const årsak = erVeileder
                ? FeilsideÅrsak.IKKE_UNDER_OPPFØLGING_VEILEDER
                : FeilsideÅrsak.IKKE_UNDER_OPPFØLGING;
            return <Feilside årsak={årsak} />;
        }

        if (erVeileder && erManuell === false && erPdf === false) {
            return <Feilside årsak={FeilsideÅrsak.IKKE_MANUELL_VEILEDER} />;
        }

        if (harIkkeSettHjemmel === true) {
            if (erVeileder) return <HjemmelsideVeileder />;
            return <Hjemmelside />;
        }

        return children;
    };

    return (
        <ApplicationContext.Provider
            value={{ suksessNotifikasjon, errorNotifikasjon, erVeileder, erInnlogget, erDemoApp }}
        >
            {hentSideinnhold()}
            <Notifikasjoner notifikasjoner={notifikasjoner} />
        </ApplicationContext.Provider>
    );
}

ApplicationProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ApplicationProvider;
