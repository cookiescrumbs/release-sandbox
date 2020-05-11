import { NgLibraryConfig } from '../ng-library/ng-library';
export interface NgProjectStructureConfig {
    outputPath: {
        dir: string;
        entities: string;
        structure: string;
    };
    libraries: {
        [key: string]: NgLibraryConfig;
    };
}
export declare class NgProjectStructure {
    private _formatter;
    private _fileFactory;
    private _libraries;
    constructor();
    buildStructure(config: NgLibraryConfig): any;
    private _buildLibraryStructure;
    private _buildFileTree;
    buildLibraryEntitiesFile(libraryId: string, packageName: string): string;
}
