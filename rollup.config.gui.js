import resolve from 'rollup-plugin-node-resolve';
import cjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';

export default {
  name: 'radiolarian',
  input: 'src/gui.js',
  output: {
    file: 'dist/gui.js',
    format: 'umd',
  },
  plugins: [ cjs(), resolve(),
             babel({
                 exclude: 'node_modules/**' 
             }) ]
};