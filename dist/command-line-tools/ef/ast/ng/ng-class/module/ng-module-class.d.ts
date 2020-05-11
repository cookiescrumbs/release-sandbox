import { NG_CLASS_TYPE } from '../ng-class-type';
import { NgClass } from '../ng-class';
import { TsClass } from '../../../ts/ts-class/ts-class';
export declare class NgModuleClass extends NgClass {
    readonly type: NG_CLASS_TYPE;
    readonly imports: string[];
    readonly moduleDefinition: any;
    private _propertybuilderMap;
    constructor(tsClass: TsClass);
    private _buildModuleDefinition;
    private _buildDecoratorPropertyDescription;
    private _getPropertyBuilder;
    private _buildIdentifierList;
    private _buildIdentifierListByIdentifier;
}
