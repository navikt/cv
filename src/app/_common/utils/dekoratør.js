import { fetchDecoratorReact } from "@navikt/nav-dekoratoren-moduler/ssr";
import { hentDekoratørProps, serverMiljø } from "@/app/_common/config";

export const hentDekoratør = async () => fetchDecoratorReact(hentDekoratørProps(serverMiljø()));
