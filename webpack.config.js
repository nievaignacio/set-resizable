const path = require('path');
const package = require('./package.json');
const library = package.name;

module.exports = {
    entry: './src/resizable.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        library: library,
        libraryExport: 'default',
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