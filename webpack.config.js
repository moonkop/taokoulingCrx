const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
let copyPlugin = require('copy-webpack-plugin');
module.exports = {
    entry: {
        app: './src/index.tsx'
    },


    resolve: {
        modules: ['node_modules'],
        extensions: ['.jsx', '.js', '.ts', '.tsx']
    },

    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.(ts|tsx)?$/,
                use: "ts-loader",
            },
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new copyPlugin({
            patterns: [
                {from: './resources', to: '.'},
            ],
        })
    ]
}
