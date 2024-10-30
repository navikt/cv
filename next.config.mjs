/** @type {import("next").NextConfig} */
function hentMiljø() {
    if (process.env.NODE_ENV === "development") return "localhost";
    return process.env.NAIS_CLUSTER_NAME === "prod-gcp" ? "prod" : "dev";
}

const nextConfig = {
    basePath: "/personbruker",
    output: "standalone",
    webpack: (config, options) => {
        config.resolve.alias["fs"] = "pdfkit/js/virtual-fs.js";
        config.resolve.fallback = { ...config.resolve.fallback, fs: false };
        config.module.rules.push(
            { enforce: "post", test: /fontkit[/\\]index.js$/, loader: "transform-loader", options: { brfs: {} } },
            {
                enforce: "post",
                test: /linebreak[/\\]src[/\\]linebreaker.js/,
                loader: "transform-loader",
                options: { brfs: {} },
            },
        );
        return config;
    },
    serverRuntimeConfig: {
        environment: hentMiljø(),
    },
};

export default nextConfig;
