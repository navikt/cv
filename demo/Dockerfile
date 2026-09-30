FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim@sha256:1631f855657b5d0d5d60968ca0f9ad19b30ab208cf869e476da34e0e1bdf6ca7

ENV NODE_ENV=production
ENV TZ="Europe/Oslo"
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

WORKDIR /app

COPY /public ./public
COPY /.next/standalone ./
COPY /.next/static ./.next/static

EXPOSE 3000

CMD ["server.js"]
