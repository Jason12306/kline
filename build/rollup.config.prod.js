import resolve from 'rollup-plugin-node-resolve'
import postcss from 'rollup-plugin-postcss'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import { terser } from 'rollup-plugin-terser'
import copy from 'rollup-plugin-copy'
import cleaner from 'rollup-plugin-cleaner'

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'package/lib/kline.min.js',
      format: 'umd',
      name: 'VyKline'
    },
    {
      file: 'package/lib/kline.js',
      format: 'umd',
      name: 'VyKline'
    },
    {
      file: 'dist/kline.min.js',
      format: 'umd',
      name: 'VyKline'
    },
    {
      file: 'dist/kline.js',
      format: 'umd',
      name: 'VyKline'
    }
  ],
  plugins: [
    cleaner({
      targets: [
        'dist',
        'package'
      ]
    }),
    babel({
      "babelrc": false,
      "runtimeHelpers": true,
      "plugins": [
        "@babel/plugin-transform-async-to-generator",
        ["@babel/plugin-transform-runtime", {
          "helpers": true,
          "regenerator": true
        }]

      ],
      "presets": [
        "@babel/env"
      ],
      "exclude": "node_modules/**"
    }),
    terser({
      include: [/^.+\.min\.js$/],
      compress: {
        drop_console: true
      }
    }),
    resolve({
      extensions: ['.js', '.less', '.css']
    }),
    postcss({
      extensions: ['.css', '.less'],
      extract: true,
      minimize: true
    }),
    commonjs(),
    copy({
      targets: [
        {
          src: 'README.md',
          dest: `package`
        },
        {
          src: 'package.json',
          dest: `package`
        },
      ]
    })
  ]
}
