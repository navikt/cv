
/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: "/personbruker",
    output: "standalone",
    webpack: (config, options) => {
        config.resolve.alias["fs"] = "pdfkit/js/virtual-fs.js";
        config.resolve.fallback = {...config.resolve.fallback, "fs": false};
        config.module.rules.push(
            {enforce: "post", test: /fontkit[/\\]index.js$/, loader: "transform-loader", options: {brfs: {}}},
            {enforce: "post", test: /linebreak[/\\]src[/\\]linebreaker.js/, loader: "transform-loader", options: {brfs: {}}},
        );
        return config;
    },
};

export default nextConfig;
