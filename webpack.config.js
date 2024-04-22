//https://webpack.js.org/guides/author-libraries/

const path = require('path');
const package = require('./package.json');

module.exports = {
    mode: 'production',
    entry: './src/resizable.js',
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
          name: package.name,
          type: 'umd',
          export: 'default',
        },
        filename: 'resizable.min.js',
    },
};