import { Shell } from '../shell/index';
import { PackageJson } from '../package-json/index';
import { Observable } from 'rxjs';
export interface CommandConfig {
    command: string;
    options: string[];
}
export declare class GitHub {
    private _token;
    private _config;
    private _shell;
    private _packageJson;
    private _updateReleaseFolderCommands;
    private _gitConfigCommands;
    private _releaseCommands;
    private _pushCommands;
    constructor(token: string, config: any, shell: Shell, packageJson: PackageJson);
    updateReleaseFolder(): Observable<any>;
    release(): Observable<any>;
    push(): Observable<any>;
    private _excuteCommandFromConfig;
    private _configure;
}
