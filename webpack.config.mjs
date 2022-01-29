import * as path from "path";
import { fileURLToPath } from "url";
import webpack from "webpack";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * @type { import('webpack').Configuration }
 */
const config = {
  entry: "./src/index.js",
  mode: "production",
  output: {
    filename: "main.js",
    hashFunction: "xxhash64",
    path: path.resolve(__dirname, "dist"),
  },

  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[name][ext].map.json",
    }),
    {
      apply(compiler) {
        compiler.hooks.done.tap("webpack-stats-log", (stats) => {
          const time = stats.endTime - stats.startTime;
          const now = new Date().toISOString();
          const hash = stats.hash;
          console.log(`\nBuild at: ${now} - Hash: ${hash} - Time: ${time}ms\n`);
        });
      },
    },
  ],
  cache: false,
};

export default config;
