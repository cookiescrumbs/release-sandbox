import { SourceFile } from 'ts-morph';
import { NgFile } from '../ng-file';
import { NgClassFactory } from '../../ng-class/factory/ng-class-factory';
export declare class NgFileFactory {
    private _classFactory;
    constructor(classFactory: NgClassFactory);
    create(file: SourceFile): NgFile;
}
