import path from 'path'
import { Configuration, HotModuleReplacementPlugin } from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import ESLintPlugin from 'eslint-webpack-plugin'

const config: Configuration = {
    mode:'development',
    output:{
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
                        ]
                    }
                }
            }
        ]
    },
    resolve:{
        extensions:['.tsx', '.ts', '.js']
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'public/index.html'
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
        static:path.join(__dirname, 'build'),
        historyApiFallback:true,
        port:4000,
        open:true,
        hot:true
    }
}

export default config
