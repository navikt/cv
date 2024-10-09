# CV

## Beskrivelse

Frontend-applikasjon for CV på nav.no/min-side.

## Lokal kjøring

For lokal kjøring vil dekoratøren kun være til pynt. Vi bruker wonderwall lokalt som tar for seg innlogging og legger på authorization-token på alle requester.

### Forbered avhengigheter

1. Sett opp `pam-docker-compose-shared`, les om det [her](https://github.com/navikt/pam-docker-compose-shared/blob/main/README.md).
2. Start Docker Desktop / Kolima
3. Ha `pam-cv-api-gcp` lokalt i samme mappe som dette prosjektet, slik at det ligger på `../pam-cv-api-gcp`. Dette trengs for at scriptet for avhengigheter får tak i applikasjonen.

### Kjør lokalt

```bash
$ npm install # Installerer NPM-avhengigheter
$ npm run dependencies # Starter docker-containere for wonderwall, redis og mock-oauth2, og starter Lokal versjon av pam-cv-api-gcp
$ npm run dev # Kjører dev
```

Da kan du nå applikasjonen med innlogging på [http://localhost:3000/personbruker](http://localhost:3000/personbruker)

> [!TIP]
> Selve applikasjonen kjører på http://localhost:3001, men siden alle requester må routes gjennom Wonderwall som kjører på port 3000 vil det fortsatt være https://localhost:3000 som gjelder
