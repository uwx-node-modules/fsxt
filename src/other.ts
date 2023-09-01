declare module 'fs-extra' {
    export interface MoveOptions {
        /**
         * Overwrite existing file or directory.
         * @default false
         */
        overwrite?: boolean | undefined;
        /**
         * Dereference symlinks.
         * @default false
         */
        dereference?: boolean | undefined;
        /**
         * Overwrite existing file or directory.
         * @default false
         * @deprecated Use {@link overwrite} instead.
         */
        clobber?: boolean | undefined;
    }
}

export {};
