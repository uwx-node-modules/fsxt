// This file is used by rollup builds only. Point it to a fsxt-ified version of the promisified graceful-fs component.

// Export promisified graceful-fs:
export * from '../src/fs';

// Export extra methods:
export * from './copy';
export * from './empty';
export * from './ensure';
export * from './json';
export * from './mkdirs';
export * from './move';
export * from './output-file';
export * from './remove';
