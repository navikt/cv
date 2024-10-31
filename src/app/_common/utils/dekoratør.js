import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";
import { hentDekoratørProps } from "@/app/_common/config";

export const hentDekoratør = async (miljø) => fetchDecoratorReact(hentDekoratørProps(miljø));
