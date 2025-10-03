import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";

const sassLoader = {
    loader: "sass-loader",
    options: {
        additionalData: `
        @use 'sass:list';
        @use 'sass:map';
        @use 'sass:math';
        `,
    },
};

export default {
    entry: path.resolve(import.meta.dirname, "src/app/index.tsx"),
    output: {
        path: path.resolve(import.meta.dirname, "dist"),
        filename: "app.[contenthash].js",
        clean: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "./"),
            "@Dist": path.join(import.meta.dirname, "./dist"),
            "@Public": path.join(import.meta.dirname, "./public"),
            "@Src": path.join(import.meta.dirname, "./src"),
            "@App": path.join(import.meta.dirname, "./src/app"),
            "@Pages": path.join(import.meta.dirname, "./src/pages"),
            "@Widgets": path.join(import.meta.dirname, "./src/widgets"),
            "@Features": path.join(import.meta.dirname, "./src/features"),
            "@Entities": path.join(import.meta.dirname, "./src/entities"),
            "@Shared": path.join(import.meta.dirname, "./src/shared"),
        },
        extensions: [".ts", ".tsx", ".js", ".jsx"],
    },
    module: {
        rules: [
            {
                test: /\.module\.(s[ac]ss|css)$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            modules: {
                                namedExport: false,
                                localIdentName: "[name]__[local]--[hash:base64:5]",
                            },
                        },
                    },
                    sassLoader,
                ],
            },
            {
                test: /\.(s[ac]ss|css)$/i,
                exclude: /\.module\.(s[ac]ss|css)$/,
                use: ["style-loader", "css-loader", sassLoader],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};
