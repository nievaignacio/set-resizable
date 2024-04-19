//https://webpack.js.org/guides/author-libraries/

const path = require('path');
const package = require('./package.json');

module.exports = {
    entry: './src/resizable.js',
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
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
};