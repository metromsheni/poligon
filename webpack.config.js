const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackInjector = require("html-webpack-injector");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const webpackConfig = {
    entry: {
        app: './src/app/index.js',
        app_head: './src/app/index_head.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'app/[name].js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            },
            {
                test: /\.less$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'less-loader',
                ],
            },
            {
                test: /\.sass$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.scss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(svg|png|jpg|jpeg|webp|gif|icon)$/i,
                type: 'asset/resource',
                generator: {
                    filename: path.join('[path][name][ext]'),
                },
            },
            {
                test: /\.(mp3|wav|ogg)$/,
                include: [
                    path.join(__dirname, 'src', "media", "music"),
                ],
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "media/music/[name].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.(mp4|webm|ogv|3GP)$/,
                include: [
                    path.join(__dirname, 'src', "media", "video"),
                ],
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "media/video/[name].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                include: [
                    path.resolve(__dirname, 'src', "fonts"),
                ],
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "acsses/[name].[ext]",
                        },
                    },
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    sources: {
                        list: [
                            {
                                tag: 'source',
                                attribute: 'src-set',
                                type: 'srcset'
                            },
                            {
                                tag: 'img',
                                attribute: 'data-src',
                                type: 'src'
                            },
                            {
                                tag: 'img',
                                attribute: 'src',
                                type: 'src'
                            },
                            {
                                tag: 'source',
                                attribute: 'srcset',
                                type: 'srcset'
                            },
                            {
                                tag: 'source',
                                attribute: 'data-srcset',
                                type: 'srcset'
                            }
                        ],
                    },
                },
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".html", ".less", ".css", ".sass", ".scss", ".svg", ".jpg", ".webp"],
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style/index.css",
        }),
        new HtmlWebpackPlugin({
            template: `./src/index.html`,
            filename: "index.html",
            base: "/",
            favicon: "./fav/fav.png",
        }),
        new HtmlWebpackInjector(),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                '!.git', '!.gitignore', '!README.md', 'media', 'src', 'app', 'fav.png', 'index.html', 'style'
            ]
        }),
    ],
};

module.exports = (env, options) => {
    if (options.mode === 'development') {
        webpackConfig.devtool = 'eval-source-map';
        webpackConfig.devServer = { port: 80 };
    } else if (options.mode === 'production') {
        webpackConfig.devtool = 'source-map';
    }


    return webpackConfig
}