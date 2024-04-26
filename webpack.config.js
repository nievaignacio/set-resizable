//https://webpack.js.org/guides/author-libraries/

const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/set-resizable.js',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.js$/i,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        globalObject: 'this',
        library: {
          name: "Resizable",
          type: 'umd',
          export: 'default',
        },
        filename: 'set-resizable.min.js',
    },
};