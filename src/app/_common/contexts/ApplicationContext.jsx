import React, { useState } from "react";
import PropTypes from "prop-types";
import { useErInnlogget } from "@/app/_common/hooks/swr/useErInnlogget";
import { Feilside, FeilsideTekst } from "@/app/_common/components/Feilside";
import { MidlertidigLasteside } from "@/app/_common/components/MidlertidigLasteside";
import { usePerson } from "@/app/_common/hooks/swr/usePerson";
import Hjemmelside from "@/app/(minCV)/_components/hjemmelside/Hjemmelside";
import { useCv } from "@/app/_common/hooks/swr/useCv";

export const ApplicationContext = React.createContext({});

const ApplicationProvider = ({ children }) => {
    const { erInnlogget, innloggingLaster, innloggingHarFeil } = useErInnlogget();
    const { person, personLaster, personHarFeil } = usePerson();
    const { cv, cvLaster, cvHarFeil } = useCv();

    const [visHjemmelside, setVisHjemmelside] = useState(false);

    if (innloggingHarFeil || personHarFeil || cvHarFeil) {
        return <Feilside årsak={FeilsideTekst.FETCH_ERROR} />;
    }

    if ((innloggingLaster && !erInnlogget) || (personLaster && !person)) {
        return <MidlertidigLasteside />;
    }

    if (!erInnlogget) {
        return <Feilside årsak={FeilsideTekst.IKKE_LOGGET_INN} />;
    }

    if (person.erUnderOppfoelging === false) {
        return <Feilside årsak={FeilsideTekst.IKKE_UNDER_OPPFØLGING} />;
    }

    if (person.harSettHjemmelEllerSamtykket === false || visHjemmelside) {
        return <Hjemmelside måBekrefte={!person.harSettHjemmelEllerSamtykket} />;
    }

    if (cvLaster && !cv) {
        return <MidlertidigLasteside />;
    }

    return <ApplicationContext.Provider value={{ setVisHjemmelside }}>{children}</ApplicationContext.Provider>;
};

ApplicationProvider.propTypes = {
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
};

export default ApplicationProvider;
