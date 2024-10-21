// Denne metoden blir brukt for å sammenligne to datoer og blir brukt for sortering av rekkefølge på f.eks utdanninger og erfaringer.
// 1. Den med senest sluttdato skal først
// 2. Hvis begge er ongoing, så skal den som har senest startdato først
// 3. Hvis en av dem som er ongoing, så skal den først
// 4. Hvis begge har samme sluttdato, så skal den som har senest startdato først
const compareDates = (firstDate, secondDate, startDate = "fromDate", endDate = "toDate", ongoing = "ongoing") => {
    if (secondDate[endDate] > firstDate[endDate]) {
        return 1;
    } else if (secondDate[ongoing] && firstDate[ongoing]) {
        if (secondDate[startDate] > firstDate[startDate]) {
            return 1;
        } else {
            return -1;
        }
    } else if (secondDate[ongoing]) {
        return 1;
    } else if (firstDate[ongoing]) {
        return -1;
    } else if (firstDate[endDate] === secondDate[endDate]) {
        if (secondDate[startDate] > firstDate[startDate]) {
            return 1;
        } else {
            return -1;
        }
    } else {
        return -1;
    }
};

export const datosorterElementer = (elementer, startDate = "fromDate", endDate = "toDate", ongoing = "ongoing") => {
    if (!elementer) return elementer;
    return elementer.sort((a, b) => compareDates(a, b, startDate, endDate));
};
