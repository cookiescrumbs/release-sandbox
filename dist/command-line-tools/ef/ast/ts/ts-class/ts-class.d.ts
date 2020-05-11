import { ClassDeclaration, ClassDeclarationStructure, Decorator } from 'ts-morph';
import { TsFile } from '../ts-file/ts-file';
export declare class TsClass {
    private _class;
    private _file;
    readonly name: string;
    readonly decorators: Decorator[];
    readonly decoratorName: string;
    readonly filePath: string;
    readonly directoryName: string;
    readonly members: any[];
    readonly decoratedProperties: any[];
    readonly structure: ClassDeclarationStructure;
    constructor(classDeclaration: ClassDeclaration, file: TsFile);
    private _getDecoratorName;
}
