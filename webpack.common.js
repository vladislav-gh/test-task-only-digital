import path from "path";

import HtmlWebpackPlugin from "html-webpack-plugin";

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
                    "sass-loader",
                ],
            },
            {
                test: /\.(s[ac]ss|css)$/i,
                exclude: /\.module\.(s[ac]ss|css)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
            {
                test: /\.svg$/i,
                type: "asset",
                resourceQuery: /url/,
            },
            {
                test: /\.svg$/i,
                issuer: /\.[jt]sx?$/,
                resourceQuery: { not: [/url/] },
                use: ["@svgr/webpack"],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
        }),
    ],
};
