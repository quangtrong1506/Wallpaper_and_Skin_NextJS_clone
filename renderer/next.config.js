/** @type {import('next').NextConfig} */
module.exports = {
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    webpack: (config) => {
        config.externals.push({
            'node:crypto': 'es6 crypto',
        });
        return config;
    },
};
