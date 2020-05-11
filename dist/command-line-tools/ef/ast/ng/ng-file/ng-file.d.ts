import { SourceFile } from 'ts-morph';
import { NgClassFactory } from '../ng-class/factory/ng-class-factory';
import { NgClass } from '../ng-class/ng-class';
import { TsFile } from '../../ts/ts-file/ts-file';
export declare class NgFile extends TsFile {
    readonly classes: any;
    private _classFactory;
    constructor(file: SourceFile, classFactory: NgClassFactory);
    protected _buildClasses(): void;
    get classList(): NgClass[];
}
