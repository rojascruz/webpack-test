const HtmlWebpack    = require('html-webpack-plugin')
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin     = require("copy-webpack-plugin");

const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser       = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',

    output: {
        clean: true,
        filename: 'main.[contenthash].js'
    },

    module:{
        rules: [
            {
                // Busca todas las extesiones de html
                test   : /\.html$/,
                loader : 'html-loader',
                options: {
                    sources: false
                }
            },
            {
                // Busca todas las extesiones de css
                test   : /\.css$/,
                exclude: /styles.css$/,
                use    : ["style-loader", "css-loader"],
            },
            {
                test: /styles.css$/,
                use : [MiniCssExtract.loader, 'css-loader']
                
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader'    
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser()
        ]
    },

    plugins: [
        // Crear el html en la carpeta dist
        new HtmlWebpack({
            title   : 'Mi webpack App',
            // filename: 'index.html',
            template: './src/index.html'

        }),

        new MiniCssExtract({
            filename   : '[name].[fullhash].css', // fullhash--> esto ayuda a que los navegadores del cliente no mantenga en cache este archivo
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                {from: 'src/assets/', to: 'assets/'}
            ]
        })
    ]
}