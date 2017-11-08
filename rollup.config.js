import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  name: 'radiolarian',
  input: 'src/app.js',
  output: {
    file: 'dist/app.js',
    format: 'umd',
  },
  plugins: [ cjs(), resolve(),
             babel({
                 exclude: 'node_modules/**' 
             }) ]
};