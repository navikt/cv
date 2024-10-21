# CV

## Beskrivelse

Frontend-applikasjon for CV på nav.no/min-side.

## Lokal kjøring

For lokal kjøring vil dekoratøren kun være til pynt. Vi bruker wonderwall lokalt som tar for seg innlogging og legger på authorization-token på alle requester.

### Forbered avhengigheter

1. Sett opp `pam-docker-compose-shared`, les om det [her](https://github.com/navikt/pam-docker-compose-shared/blob/main/README.md).
2. `pam-cv-api-gcp` lokalt i samme mappe som dette prosjektet, slik at det ligger på `../pam-cv-api-gcp`. Dette trengs for at scriptet for avhengigheter får tak i applikasjonen. Sørg for at du kan bygge `pam-cv-api-gcp` ved å kjøre `./gradlew clean build` i prosjektets mappe.
3. Sørg for at du har tilgang til @navikt sine npm-pakker, dette er beskrevet [i eget avsnitt](#tilgang-til-navs-npm-registry).
4. Start Docker Desktop / Kolima

### Start avhengigheter og applikasjonen

```bash
$ npm install # Installerer NPM-avhengigheter
$ npm run setup_dependencies # Starter docker-containere for wonderwall, redis og mock-oauth2, og starter Lokal versjon av pam-cv-api-gcp
$ npm run dev # Kjører dev
```

Da kan du nå applikasjonen med innlogging på [http://localhost:3000/personbruker](http://localhost:3000/personbruker). Bruk testbruker `04010100653`.

> [!TIP]
> Selve applikasjonen kjører på http://localhost:3001, men siden alle requester må routes gjennom Wonderwall som kjører på port 3000 vil det fortsatt være https://localhost:3000 som gjelder

### Test hjemmelsside

Dersom man har behov for teste hjemmelsiden som kommer ved første innlogging kan man "trekke samtykke" lokalt ved å kjøre `npm run reset_samtykke`. Ved neste innlasting vil personen ikke lenger ha sett hjemmel.

### Tilgang til Navs npm-registry

For å kunne hente @navikt-pakker via npm er du nødt til å gjøre følgende:

#### Opprett personal access token

1. Opprett et personal access token (PAT) i github med rettigheter "read:packages". [Det kan du gjøre her](https://github.com/settings/tokens).
2. Velg Authorize token under "Configure SSO" for å gi tokenet tilgang til @navikt.

#### Opprett .npmrc

1. Opprett fila `.npmrc` i hjemkatalogen din. F.eks. `~/.npmrc` Mer info: https://docs.npmjs.com/cli/v9/configuring-npm/npmrc
2. Legg følgende i fila, hvor du erstatter `<PAT>` med tokenet du har laget og autorisert i avsnittet over.
    ```bash
    @navikt:registry=https://npm.pkg.github.com
    //npm.pkg.github.com/:_authToken=<PAT>
    ```

> [!CAUTION]
> Ikke sjekk inn `.npmrc` til GitHub.
