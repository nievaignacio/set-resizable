// https://webpack.js.org/guides/author-libraries/

import { resolve } from 'path'

export const mode = 'development'
export const entry = './src/set-resizable.js'
export const module = {
  rules: [
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.js$/i,
      exclude: /node_modules/,
      use: ['babel-loader']
    }
  ]
}
export const output = {
  // eslint-disable-next-line no-undef
  path: resolve(__dirname, 'dist'),
  globalObject: 'this',
  library: {
    name: 'Resizable',
    type: 'umd',
    export: 'default'
  },
  filename: 'set-resizable.min.js'
}
