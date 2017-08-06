// import { rollup } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';
import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';

export default {
  entry: 'src/index.js',
  dest: 'dist/data-prism.js',
  moduleName: 'DataPrism',
  format: 'iife',
  globals: {
    settimeout: 'settimeout'
  },
  plugins: [
    builtins({ fs: true }),
    commonjs(),
    globals(),
    resolve({
      jsnext: true,
      browser: true,
      main: true,
      preferBuiltins: false
    })
  ]
};

// export default {
//   entry: 'src/index.js',
//   format: 'cjs',
//   dest: 'bundle.js' // equivalent to --output
// };
