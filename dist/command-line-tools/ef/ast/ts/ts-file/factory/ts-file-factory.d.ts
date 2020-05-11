import { SourceFile } from 'ts-morph';
import { TsFile } from '../ts-file';
import { TsClassFactory } from '../../ts-class/factory/ts-class-factory';
export declare class TsFileFactory {
    private _classFactory;
    constructor(classFactory: TsClassFactory);
    create(file: SourceFile): TsFile;
}
