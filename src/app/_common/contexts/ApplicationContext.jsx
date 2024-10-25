import React, { useState } from "react";
import PropTypes from "prop-types";
import { useErInnlogget } from "@/app/_common/hooks/swr/useErInnlogget";
import { Feilside, FeilsideTekst } from "@/app/_common/components/Feilside";
import { usePerson } from "@/app/_common/hooks/swr/usePerson";
import Hjemmelside from "@/app/(minCV)/_components/hjemmelside/Hjemmelside";
import { useCv } from "@/app/_common/hooks/swr/useCv";
import { useNotifikasjoner } from "@/app/_common/hooks/useNotifikasjoner";
import { Notifikasjoner } from "@/app/_common/components/Notifikasjoner";

export const ApplicationContext = React.createContext({});

const ApplicationProvider = ({ children }) => {
    const { erInnlogget, innloggingLaster, innloggingHarFeil } = useErInnlogget();
    const { person, personHarFeil } = usePerson();
    const { cvHarFeil } = useCv();
    const { notifikasjoner, suksessNotifikasjon, errorNotifikasjon } = useNotifikasjoner();

    const [visHjemmelside, setVisHjemmelside] = useState(false);

    const hentSideinnhold = () => {
        if (innloggingHarFeil || personHarFeil || cvHarFeil) {
            return <Feilside årsak={FeilsideTekst.FETCH_ERROR} />;
        }

        if (!erInnlogget && !innloggingLaster) {
            return <Feilside årsak={FeilsideTekst.IKKE_LOGGET_INN} />;
        }

        if (person?.erUnderOppfoelging === false) {
            return <Feilside årsak={FeilsideTekst.IKKE_UNDER_OPPFØLGING} />;
        }

        if (person?.harSettHjemmelEllerSamtykket === false || visHjemmelside) {
            return <Hjemmelside måBekrefte={!person.harSettHjemmelEllerSamtykket} />;
        }

        return children;
    };

    return (
        <ApplicationContext.Provider value={{ setVisHjemmelside, suksessNotifikasjon, errorNotifikasjon }}>
            {hentSideinnhold()}
            <Notifikasjoner notifikasjoner={notifikasjoner} />
        </ApplicationContext.Provider>
    );
};

ApplicationProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ApplicationProvider;
