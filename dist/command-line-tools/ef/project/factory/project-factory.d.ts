import { Project } from '../project';
import { Logger } from '../../logger/index';
import { Interpolator } from '../../interpolator/index';
export declare class ProjectFactory {
    private _logger;
    private _interpolator;
    private _constructorMap;
    constructor(interpolator: Interpolator, logger: Logger);
    create(config: any): Project;
}
