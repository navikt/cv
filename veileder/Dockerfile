FROM europe-north1-docker.pkg.dev/cgr-nav/pull-through/nav.no/node:26-slim@sha256:93a8b934908f9cdff9045b1f66343a56769e4aeb951ce7810028ba1f0a51f421

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
