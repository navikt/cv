import React from "react";
import PropTypes from "prop-types";
import { useErInnlogget } from "@/app/_common/hooks/swr/useErInnlogget";
import { Feilside, FeilsideÅrsak } from "@/app/_common/components/Feilside";
import { usePerson } from "@/app/_common/hooks/swr/usePerson";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { useNotifikasjoner } from "@/app/_common/hooks/useNotifikasjoner";
import { Notifikasjoner } from "@/app/_common/components/Notifikasjoner";
import { Hjemmelside } from "@/app/(minCV)/_components/hjemmelside/Hjemmelside";
import ModiaDekoratør from "@/app/_common/components/Dekoratør/ModiaDekoratør";

export const ApplicationContext = React.createContext({});

function ApplicationProvider({ children, erVeileder, erDemoApp }) {
    const { erInnlogget, innloggingLaster, innloggingHarFeil, harBlittUtlogget } = useErInnlogget();
    const { harIkkeSettHjemmel, erUnderOppfølging, personHarFeil } = usePerson();
    const { cvHarFeil } = useCv();
    const { notifikasjoner, suksessNotifikasjon, errorNotifikasjon } = useNotifikasjoner();

    const hentSideinnhold = () => {
        if (innloggingHarFeil || personHarFeil || cvHarFeil) {
            return <Feilside årsak={FeilsideÅrsak.FETCH_ERROR} />;
        }

        if (!erInnlogget && !innloggingLaster) {
            const årsak = harBlittUtlogget ? FeilsideÅrsak.LOGGET_UT : FeilsideÅrsak.IKKE_LOGGET_INN;
            return <Feilside årsak={årsak} />;
        }

        if (erUnderOppfølging === false) {
            return <Feilside årsak={FeilsideÅrsak.IKKE_UNDER_OPPFØLGING} />;
        }

        if (harIkkeSettHjemmel === true) {
            return <Hjemmelside />;
        }

        return children;
    };

    return (
        <ApplicationContext.Provider value={{ suksessNotifikasjon, errorNotifikasjon, erVeileder, erDemoApp }}>
            {erVeileder === true && <ModiaDekoratør />}
            {hentSideinnhold()}
            <Notifikasjoner notifikasjoner={notifikasjoner} />
        </ApplicationContext.Provider>
    );
}

ApplicationProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ApplicationProvider;
