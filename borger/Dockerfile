FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim@sha256:d78042255221985a7827aef5a3bea0c3e8db44e5d18e67ede50c3895ec9d3ac4

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
