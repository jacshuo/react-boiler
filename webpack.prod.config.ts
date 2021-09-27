import path from 'path'
import { Configuration } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'

const CopyWebpackPlugin = require('copy-webpack-plugin')

const config: Configuration = {
    mode:'production',
    entry:'./src/index.tsx',
    output:{
        path:path.resolve(__dirname, 'build'),
        filename:'[name].[contenthash].js',
        publicPath:'/'
    },
    module:{
        rules:[
            {
                test:/\.(ts|js)x?$/i,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env',
                            '@babel/preset-react',
                            '@babel/preset-typescript'
                        ]
                    }
                }
            },
            {
                test:/\.s[ac]ss$/i,
                exclude:/node_modules/,
                use:['style-loader', 'css-loader', {
                    loader:'sass-loader',
                    options:{
                        sourceMap:true,
                        implementation:require('sass')
                    }
                }
                ]
            }
        ]
    },
    resolve:{
        extensions:['.tsx', '.ts', '.js']
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:path.resolve(__dirname, 'public', 'index.html'),
            favicon:'./public/favicon.ico',
            title:'测试',
            inject:'body'
        }),
        new ForkTsCheckerWebpackPlugin({
            async:false
        }),
        new ESLintPlugin({
            extensions:['js', 'jsx', 'ts', 'tsx']
        }),
        // The CleanWebpackPlugin plugin will clear out the build folder at the start of the bundling process.
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from:path.resolve(__dirname, 'public'),
                    to:path.resolve(__dirname, 'build'),
                    globOptions:{
                        ignore:['**/*/index.html']
                    }
                }
            ]
        })
    ]
}

export default config
