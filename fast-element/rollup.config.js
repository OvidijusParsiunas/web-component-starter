import transformTaggedTemplate from 'rollup-plugin-transform-tagged-template';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import summary from 'rollup-plugin-summary';

export default {
  input: 'dist/web-component-starter-fast.js',
  output: {
    file: 'dist/web-component-starter-fast.bundle.js',
    format: 'esm',
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    transformTaggedTemplate({
      tagsToProcess: ['html','css'],
      parserOptions: {
        sourceType: "module",
        plugins: [
            "typescript",
            [
                "decorators",
                { decoratorsBeforeExport: true }
            ]
        ]
      },
      transformer(data) {
          data = data.replace(/\s([{}()>~+=^$:!;])\s/gm, '$1');
          data = data.replace(/([",[]])\s+/gm, '$1');
          data = data.replace(/\s{2,}/gm, ' ');
          // return data.trim() if you want trailing white spaces to be removed 
          return data;
      }
    }),
    resolve(),
    terser(),
    summary(),
  ]
};