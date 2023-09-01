// @ts-check

import { install } from '@cspotcode/source-map-support';

install();

import { swc } from 'rollup-plugin-swc3';

import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { dts } from '@uwx/fsxt-rollup-plugin-dts';
import terser from '@rollup/plugin-terser';

import pkg from './package.json' assert { type: 'json' };
import { builtinModules } from 'module';
import path from 'path';
import bundleSize from 'rollup-plugin-bundle-size';
import alias from '@rollup/plugin-alias';
import { existsSync } from 'fs';

/**
 *
 * @template {Function} T
 * @param {T | { handler?: T }} hook
 * @returns {T | null}
 */
function getHookFunction(hook) {
  if (typeof hook === 'function') {
    return hook;
  }
  if (hook && 'handler' in hook && typeof hook.handler === 'function') {
    return hook.handler;
  }
  return null;
}

/**
 * @template T
 * @typedef {T extends Function ? T : never} MapToFunction
 */

/**
 *
 * @param {MapToFunction<import('rollup').PluginHooks['resolveId']> | { resolveId?: import('rollup').PluginHooks['resolveId'] } | null | undefined} customResolver
 * @returns {MapToFunction<import('rollup').PluginHooks['resolveId']> | null}
 */
function resolveCustomResolver(customResolver) {
  if (typeof customResolver === 'function') {
    return customResolver;
  }
  if (customResolver?.resolveId) {
    return getHookFunction(customResolver.resolveId);
  }
  return null;
}

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
      {
        name: 'foo',
        async resolveId(importee, importer, resolveOptions) {
          /** @type {import('rollup').ResolveIdResult} */
          let result = await resolveCustomResolver(nodeResolve())?.call(this, importee, importer, resolveOptions);
          // console.log(importee, importer, result);

          result = typeof result === 'string' ? result : result ? result.id : undefined;

          if (!result) return null;

          result = path.normalize(result);

          const rollupver = path.resolve(path.dirname(result), path.basename(result, '.js') + '_rollup.js');
          if (existsSync(rollupver)) {
            return this.resolve(rollupver, importer, Object.assign({ skipSelf: true }, resolveOptions)).then((resolved) => resolved || { id: rollupver });
          }
          return null;
        }
      },
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
              keep_fnames: false,
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
