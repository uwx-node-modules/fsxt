// @ts-check

import { install } from '@cspotcode/source-map-support';

install();

import { swc } from 'rollup-plugin-swc3';

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { dts } from '../rollup-plugin-dts/.build/src/index.js';
import terser from '@rollup/plugin-terser';

import pkg from './package.json' assert { type: 'json' };
import { builtinModules } from 'module';
import path from 'path';
import bundleSize from 'rollup-plugin-bundle-size';

/** @type {import('rollup').RollupOptions[]} */
const config = [
  {
    external: [
      ...builtinModules,
      ...(pkg.dependencies == null ? [] : Object.keys(pkg.dependencies)),
      ...(pkg.peerDependencies == null ? [] : Object.keys(pkg.peerDependencies))
    ],
    input: 'src/index.ts',
    output: [
      {
        file: 'out/index.cjs',
        format: 'commonjs',
        sourcemap: true,
      },
      {
        file: 'out/index.mjs',
        format: 'es',
        sourcemap: true,
      }
    ],
    // output: [{ file: 'out/my-library.d.ts', format: 'es' }],
    plugins: [
      nodeResolve(),
      commonjs(),
      swc({
        jsc: {
          parser: {
            syntax: 'typescript',
          },
          target: 'es2022',
          minify: {
            compress: {
              // defaults: false,
              // arrows: true,
              arguments: true,
              // booleans: true,
              ecma: 2022,
              hoist_funs: true,
              passes: 4,
              join_vars: false,
              keep_classnames: true,
              keep_fnames: true,
              keep_infinity: true,
              module: true,
              unsafe: true,
              toplevel: true,
              unsafe_methods: true,
              unsafe_proto: true,
              unsafe_regexp: true,

              // unsafe_passes: true,
              unsafe_arrows: true,
              // unsafe_comps: true,
              // unsafe_Function: true,
              // unsafe_math: true,
              // unsafe_symbols: true,
              unused: true,
              const_to_let: true,
            },
            mangle: false,
            sourceMap: true,
          }
        },
        sourceMaps: true,
      }),
      terser({
        compress: false,
        mangle: false,
        format: {
          ecma: 2020,
          beautify: true,
          indent_level: 2,
          max_line_len: 120,
        }
      }),
      bundleSize()
    ],
  },
  {
    external: [
      ...builtinModules,
      ...(pkg.dependencies == null ? [] : Object.keys(pkg.dependencies)),
      ...(pkg.peerDependencies == null ? [] : Object.keys(pkg.peerDependencies))
    ],
    input: 'src/index.ts',
    output: {
      file: 'out/index.d.ts',
    },
    plugins: [
      {
        name: 'lib-hack',
        transform(code, id) {
          // console.log(code, id);
          if (path.normalize(id) === path.normalize(path.resolve('./src/index.ts'))) {
            return {
              code: code.replace(/(['"])(\.\.\/)?lib\/.*?\1/g, '"fs-extra"')
            };
          }
          return null;
        },
      },
      nodeResolve(),
      commonjs(),
      dts({
        respectExternal: true,
      }),
    ],
  }
];

export default config;
