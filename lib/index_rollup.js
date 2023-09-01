// @ts-check

// Export promisified graceful-fs:
export * from '@fs/index';

// Export extra methods:
export * from './copy';
export * from './empty';
export * from './ensure';
export * from '@fsxt/json';
export * from './mkdirs';
export * from './move';
export * from './output-file';
export * from './remove';
export { exists } from '@fs/exists';
