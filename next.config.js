/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: function (config) {
        config.module.rules.push(
            {
                test: /\.ya?ml$/,
                use: 'js-yaml-loader',
            },
        )
        return config
    }
}

module.exports = nextConfig
