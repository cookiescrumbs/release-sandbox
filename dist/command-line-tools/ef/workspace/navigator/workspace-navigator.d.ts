import { LocalConfig } from '../workspace-config';
import { Logger } from '../../logger/index';
import { WorkspaceNavigatorConfig } from './workspace-navigator-config';
export declare class WorkspaceNavigator {
    readonly rootPath: string;
    private _rootFileName;
    private _logger;
    constructor(config: WorkspaceNavigatorConfig | undefined, logger: Logger);
    private _findRoot;
    get localConfig(): LocalConfig;
    getProjectsInFolder(folder: string): string[];
}
