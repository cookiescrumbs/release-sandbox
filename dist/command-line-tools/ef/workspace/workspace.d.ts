import { Observable } from 'rxjs';
import { Interpolator } from '../interpolator/index';
import { Logger } from '../logger/index';
import { ProjectFactory } from '../project/factory/project-factory';
import { Project } from '../project/project';
import { Shell } from '../shell/index';
import { WorkspaceNavigator } from './navigator/workspace-navigator';
/******************************************************
 *
 * Workspace
 *
 ******************************************************/
export declare class Workspace {
    private _navigator;
    private _projectFactory;
    private _ngProjectStructure;
    private _localConfig;
    private _projects;
    private _buildOrder;
    private _aws;
    private _shell;
    private _github;
    private _logger;
    private _interpolator;
    private _packageJson;
    constructor(githubToken: string, projectFactory: ProjectFactory, shell: Shell, logger: Logger, interpolator: Interpolator, navigator?: WorkspaceNavigator);
    get projects(): any;
    get libraries(): Project[];
    get applications(): Project[];
    get commandLineTools(): Project[];
    getProjectById(id: string): Project;
    calculateBuildOrder(): string[];
    version(): string;
    test(target: string): Observable<any>;
    build(target: string): Observable<any>;
    lint(target: string): Observable<any>;
    bump(): Observable<any>;
    createDeployment(target: string): Observable<any>;
    release(): Observable<any>;
    deploy(): Observable<any>;
    buildStructure(target: string): any[];
    initialise(): void;
    private _buildStructureByProject;
    private _getProjectsByTarget;
    private _createProjects;
    private _createProjectByIdAndGroup;
    private _getProjectLocalConfig;
    private _getProjectByGroup;
    private _sortByDependencies;
}
