const HtmlWebpack    = require('html-webpack-plugin')
const MiniCssExtract = require("mini-css-extract-plugin");
const CopyPlugin     = require("copy-webpack-plugin");

module.exports = {
    mode: 'development',

    output: {
        clean: true
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
            }
        ]
    },

    optimization: {},

    plugins: [
        // Crear el html en la carpeta dist
        new HtmlWebpack({
            title   : 'Mi webpack App',
            // filename: 'index.html',
            template: './src/index.html'

        }),

        new MiniCssExtract({
            filename   : '[name].css', // fullhash--> esto ayuda a que los navegadores del cliente no mantenga en cache este archivo
            ignoreOrder: false
        }),

        new CopyPlugin({
            patterns: [
                {from: 'src/assets/', to: 'assets/'}
            ]
        })
    ]
}