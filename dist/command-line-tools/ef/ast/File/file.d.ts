import { SourceFile } from 'ts-morph';
export declare class File {
    readonly path: string;
    readonly name: string;
    readonly directoryName: string;
    protected _file: SourceFile;
    constructor(file: SourceFile);
}
