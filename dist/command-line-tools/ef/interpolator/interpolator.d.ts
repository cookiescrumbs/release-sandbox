import { Logger } from '../logger/index';
export interface InterpolatorConfig {
    castMethodMap?: {
        [key: string]: (value: string) => any;
    };
}
export declare class Interpolator {
    private _jsonParser;
    private _stringParser;
    private _logger;
    private _expressionPattern;
    private _castMethodMap;
    constructor(config?: InterpolatorConfig, logger?: Logger);
    interpolateValuesInJson(template: any, values: any): any;
    interpolateValuesInString(template: string, values: any): any;
    private _parseValue;
    private _interpolateValue;
}
