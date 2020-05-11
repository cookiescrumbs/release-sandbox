import { SEMANTIC_VERSION_TYPE } from '../semantic-versioning/index';
import { FileReader } from '../file-reader/file-reader';
import { Logger } from '../logger/index';
export interface PackageJsonConfig {
    path: string;
}
export declare class PackageJson {
    private _config;
    private _fileReader;
    private _logger;
    private _content;
    constructor(config: PackageJsonConfig, fileReader: FileReader, logger: Logger);
    get name(): string;
    get peerDependencies(): string;
    get version(): string;
    bump(versionType?: SEMANTIC_VERSION_TYPE): void;
    toString(): string;
}
