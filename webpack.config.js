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
            //에셋이 최종적으로 어떤 파일명으로 만들어졌는지 확인할 수 있는 plugin
            new WebpackManifestPlugin({
                fileName : "manifest.json",
                basePath : "./dist/"
            }),
            new BundleAnalyzerPlugin()
        ],
        // optimization :{
        //     runtimeChunk : 'single'//단일 HTML 페이지에 하나이상의 엔트리 포인트가 있기 때문
        // }
    }
}