import TerserPlugin from "terser-webpack-plugin";
import { merge } from "webpack-merge";

import common from "./webpack.common.js";

export default merge(common, {
    mode: "production",
    devtool: "source-map",
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: "all",
        },
    },
});
