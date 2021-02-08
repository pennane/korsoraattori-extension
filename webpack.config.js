const { CheckerPlugin } = require('awesome-typescript-loader')
const { join } = require('path')

module.exports = {
    mode: process.env.NODE_ENV,
    devtool: 'inline-source-map',
    entry: {
        main: join(__dirname, 'src/main/index.ts'),
        background: join(__dirname, 'src/background/background.ts')
    },
    output: {
        path: join(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.ts?$/,
                use: 'awesome-typescript-loader?{configFileName: "tsconfig.json"}'
            }
        ]
    },
    plugins: [new CheckerPlugin()],
    resolve: {
        extensions: ['.ts', '.js']
    }
}
