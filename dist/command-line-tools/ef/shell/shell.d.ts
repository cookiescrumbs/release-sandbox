import { Observable } from 'rxjs';
import { Logger } from '../logger/index';
export interface CommandConfig {
    command: string;
    options: string[];
}
export declare class Shell {
    private _logger;
    private _templater;
    constructor(logger: Logger);
    execute(config: CommandConfig, interpolationValues?: any): Observable<any>;
    private _setInterface;
    private _formatLine;
}
