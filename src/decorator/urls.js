const externalUrls = {
    prod: "https://www.nav.no/dekoratoren",
    dev: "https://dekoratoren.ekstern.dev.nav.no",
    beta: "https://dekoratoren-beta.intern.dev.nav.no",
    betaTms: "https://dekoratoren-beta-tms.intern.dev.nav.no",
    devNext: "https://decorator-next.ekstern.dev.nav.no"
}

const serviceUrls = {
    prod: "http://nav-dekoratoren.personbruker",
    dev: "http://nav-dekoratoren.personbruker",
    beta: "http://nav-dekoratoren-beta.personbruker",
    betaTms: "http://nav-dekoratoren-beta-tms.personbruker",
    devNext: "http://decorator-next.personbruker"
}

const naisGcpClusters = {
    "dev-gcp": true,
    "prod-gcp": true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const objectToQueryString = params =>
    params
        ? Object.entries(params).reduce(
            (acc, [k, v], i) =>
                v !== undefined
                    ? `${acc}${i ? "&" : "?"}${k}=${encodeURIComponent(
                        typeof v === "object" ? JSON.stringify(v) : v
                    )}`
                    : acc,
            ""
        )
        : ""

const isNaisApp = () =>
    Boolean(
        typeof process !== "undefined" &&
        process.env.NAIS_CLUSTER_NAME &&
        naisGcpClusters[process.env.NAIS_CLUSTER_NAME]
    )

const getNaisUrl = (env, csr = false, serviceDiscovery = true) => {
    const shouldUseServiceDiscovery = serviceDiscovery && !csr && isNaisApp()

    return (
        (shouldUseServiceDiscovery ? serviceUrls[env] : externalUrls[env]) ||
        externalUrls.prod
    )
}

export const getDecoratorUrl = (props, path) => {
    const { env, params } = props
    const baseUrl =
        env === "localhost"
            ? props.localUrl
            : getNaisUrl(env, false, props.serviceDiscovery)

    if (!params) {
        return baseUrl
    }

    return `${baseUrl}${path != null ? `/${path}` : ""}${objectToQueryString(
        params
    )}`
}
