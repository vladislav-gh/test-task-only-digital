import path from "path";

import { merge } from "webpack-merge";

import common from "./webpack.common.js";

export default merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        static: {
            directory: path.join(import.meta.dirname, "public"),
        },
        historyApiFallback: true,
        hot: true,
        compress: true,
        port: 3000,
    },
});
