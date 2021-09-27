import path from 'path'
import { Configuration, HotModuleReplacementPlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'

const config: Configuration = {
    mode:'development',
    output:{
        path:'/',
        publicPath:'/'
    },
    entry:'./src/index.tsx',
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
                        ],
                        sourceMap:true
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
                }]
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
        new HotModuleReplacementPlugin(),
        // used the async flag to tell Webpack to wait for the type checking process to finish before it emits any code
        new ForkTsCheckerWebpackPlugin({
            async:false
        }),
        // use a package called ESLintPlugin to enable the Webpack process to lint the code with ESLint
        new ESLintPlugin({
            extensions:['js', 'jsx', 'ts', 'tsx']
        })
    ],
    devtool:'inline-source-map',
    devServer:{
        static:path.join(__dirname, 'public'),
        historyApiFallback:true,
        port:4000,
        open:true,
        hot:true
    }
}

export default config
