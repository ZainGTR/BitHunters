const CopyPlugin = require("copy-webpack-plugin");
const HtmlPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: {
    popup: path.resolve("./src/popup/popup.tsx"),
    background: path.resolve("./src/background/background.ts"),
    options: path.resolve("./src/options/options.tsx"),
    "content-script": path.resolve("./src/content-script/content-script.ts"),
    newTab: path.resolve("./src/newtab/index.tsx"),
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        test: /\.tsx$/,
        exclude: /node_modules/,
      },
      {
        use: ["style-loader", "css-loader"],
        test: /\.css$/i,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: path.resolve("src/assets"), to: path.resolve("dist") },
      ],
    }),
    ...getHtmlPlugins(["popup", "options", "newTab"]),
  ],
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
  },
  optimization: {
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== "content-script" && chunk.name !== "background";
      },
    },
  },
};

function getHtmlPlugins(chunks) {
  return chunks.map(
    (chunk) =>
      new HtmlPlugin({
        title: `BitHanter | ${chunk}`,
        filename: `${chunk}.html`,
        chunks: [chunk],
      })
  );
}
