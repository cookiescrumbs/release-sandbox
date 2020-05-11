import { NgFileFactory } from '../ng-file/factory/ng-file-factory';
import { NgFile } from '../ng-file/ng-file';
export interface NgLibraryConfig {
    id: string;
    path: {
        base: string;
        relative: {
            tsconfig: string;
            index: string;
        };
    };
}
export declare class NgLibrary {
    private _project;
    private _config;
    private _fileFactory;
    readonly id: string;
    readonly decoratorMap: any;
    readonly pathMap: any;
    constructor(config: NgLibraryConfig, fileFactory: NgFileFactory);
    get indexPath(): string;
    get tsConfigPath(): string;
    getComponentNamesArray(): string[];
    getModuleNamesArray(): string[];
    getExportedComponentsArray(): string[];
    getFileByPath(path: string): NgFile;
    private _buildProject;
    private _analyseSourceFiles;
    private _addClassToDecoratorMap;
    private _addFileToPathMap;
}
