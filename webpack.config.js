const path = require('path')
const toml = require('toml');
const yaml = require('yamljs');
const json5 = require('json5');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {WebpackManifestPlugin} = require("webpack-manifest-plugin");
const BundleAnalyzerPlugin =  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv)=>{

    const isProduction = argv?.mode === 'production'

    return {
        mode : isProduction ? 'production' : 'development',
        entry : {
            index : './src/index.js',
            // print : './src/print.js'
        },
        devtool : !isProduction ? 'inline-source-map' : 'source-map',
        devServer : {
            static : './dist'
        },
        output : {
            // filename : 'main.js',
            filename : '[name].bundle.js',
            path : path.resolve(__dirname, 'dist'),
            clean : true,
            // publicPath : '/'
        },
        module : {
            rules : [
                {
                    test : /\.css$/i,
                    use : ["style-loader", "css-loader"]
                },
                {
                    test : /\.(png|svg|jpg|jpeg|gif)$/i,
                    type : "asset/resource",
                },
                {
                    test : /\.(woff|woff2|eot|ttf|otf)$/i,
                    type : 'asset/resource'
                },
                {
                    test : /\.xml$/i,
                    use : ['xml-loader']
                },
                {
                    test : /\.(csv|tsv)$/i,
                    use : ['csv-loader']
                },
                {
                    test: /\.toml$/i,
                    type: 'json',
                    parser: {
                        parse: toml.parse,
                    },
                },
                {
                    test: /\.yaml$/i,
                    type: 'json',
                    parser: {
                        parse: yaml.parse,
                    },
                },
                {
                    test: /\.json5$/i,
                    type: 'json',
                    parser: {
                        parse: json5.parse,
                    },
                },
            ]
        },
        plugins : [
            new HtmlWebpackPlugin(
                {
                    title : 'Output Management'
                }
            ),
            //????????? ??????????????? ?????? ??????????????? ?????????????????? ????????? ??? ?????? plugin
            new WebpackManifestPlugin({
                fileName : "manifest.json",
                basePath : "./dist/"
            }),
            new BundleAnalyzerPlugin()
        ],
        // optimization :{
        //     runtimeChunk : 'single'//?????? HTML ???????????? ??????????????? ????????? ???????????? ?????? ??????
        // }
    }
}