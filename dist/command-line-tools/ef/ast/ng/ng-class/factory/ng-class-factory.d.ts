import { ClassDeclaration } from 'ts-morph';
import { NgClass } from '../ng-class';
import { TsClass } from '../../../ts/ts-class/ts-class';
import { TsFile } from '../../../ts/ts-file/ts-file';
export declare class NgClassFactory {
    private _decoratorToConstructorMap;
    create(classDeclaration: ClassDeclaration, file: TsFile): NgClass;
    createByTsClass(tsClass: TsClass): NgClass;
    private _createNgClass;
    private _createModuleClass;
    private _createComponentClass;
}
