const path = require("path");

module.exports = {
  entry: "./dist/script.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
};
