import { Logger } from '../logger/index';
export declare class FileReader {
    protected _logger: Logger;
    constructor(logger: Logger);
    readJSONFromPath(filePath: string): any;
    private _warn;
}
