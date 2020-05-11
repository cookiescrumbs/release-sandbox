export declare const MISSING_OBJECT_PROP_ERROR = "ObjectUtils:: There is no object '%propertyName%'. Failed at prop '%prop%'";
export declare class ObjectUtils {
    static clone(source: any): any;
    static merge(target: {}, target1: {}): void;
    static deepMerge(args: any): any;
    static deepAssign(...args: any[]): any;
    static recursivelyFindProperty(propertyName: string, target: any): any;
    private static throwMissingPropertyError;
    static isPropertyChainDefined(obj: any, path: any): any;
    static mergeTrees(a: any, b: any): any;
}
