const path = require('path');

module.exports = {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      exports: 'named',
      sourcemap: true
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      exports: 'named',
      sourcemap: true
    }
  ],
  plugins: [
    require('@rollup/plugin-node-resolve')({
      browser: true,
      preferBuiltins: false,
    }),
    require('@rollup/plugin-commonjs')(),
    require('@rollup/plugin-typescript')({
      tsconfig: './tsconfig.json'
    })
  ],
  external: [] // Bundle all dependencies
};