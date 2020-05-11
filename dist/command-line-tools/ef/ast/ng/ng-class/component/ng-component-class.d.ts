import { NG_CLASS_TYPE } from '../ng-class-type';
import { NgClass } from '../ng-class';
import { TsClass } from '../../../ts/ts-class/ts-class';
export declare class NgComponentClass extends NgClass {
    readonly type: NG_CLASS_TYPE;
    readonly inputs: any;
    readonly outputs: any;
    constructor(tsClass: TsClass);
    private _parseProperties;
}
