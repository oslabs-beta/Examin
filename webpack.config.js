const path = require("path");
const ChromeExtensionReloader = require("webpack-chrome-extension-reloader");

// REACTIME / ATOMOS
const config = {
  entry: {
    // Entry for front-end files
    // app: './src/app/devtools.html',
    // Entry for background.js service worker
    background: './src/extension/background.ts',
    // Entry for chrome extension content script
    content: './src/extension/content.ts',
    // Entry for injected backend file bundle
    backend: './src/backend/injected.js',
  },
  output: {
    path: path.resolve(__dirname, 'src/extension/build/bundles'),
    filename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        resolve: {
          extensions: [".js", ".jsx"],
        },
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
  },
  plugins: [],
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    config.plugins.push(
      new ChromeExtensionReloader({
        entries: {
          contentScript: ["content"],
          background: ["background"],
        },
      })
    )
  }
  return config;
};