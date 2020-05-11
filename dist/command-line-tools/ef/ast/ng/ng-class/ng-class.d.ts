import { NG_CLASS_TYPE } from './ng-class-type';
import { ClassDeclarationStructure } from 'ts-morph';
import { TsClass } from '../../ts/ts-class/ts-class';
export declare class NgClass {
    readonly type: NG_CLASS_TYPE;
    readonly name: string;
    readonly path: string;
    readonly structure: ClassDeclarationStructure;
    protected _tsClass: TsClass;
    constructor(tsClass: TsClass);
}
