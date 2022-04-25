const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require("./package.json").dependencies;

module.exports = {
    entry: './src/index.ts',
    output: {
        filename: '[name].[contenthash].js',
        path: path.join(process.cwd(), 'dist')
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
        }),
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new ModuleFederationPlugin({
            name: 'header',
            filename: 'remoteEntry.js',
            exposes: {
                './header': './src/Header',
            },
            shared: {
                ...deps,
                react: {
                    singleton: true,
                    requiredVersion: deps.react,
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: deps["react-dom"],
                },
            },
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)?$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-typescript", "@babel/preset-react"]
                    }
                }],
                exclude: /[\\/]node_modules[\\/]/
            },
            {
                test: /\.(css|s[ac]ss)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(png|jpg|gif)$/i,
                type: 'asset/resource'
            }
        ]
    }
}