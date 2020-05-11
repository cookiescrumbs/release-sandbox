import { ClassDeclaration } from 'ts-morph';
import { TsClass } from '../ts-class';
import { TsFile } from '../../ts-file/ts-file';
export declare class TsClassFactory {
    create(classDeclaration: ClassDeclaration, file: TsFile): TsClass;
}
