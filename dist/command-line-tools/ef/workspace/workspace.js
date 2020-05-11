"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var index_1 = require("../ast/index");
var aws_1 = require("../aws/aws");
var github_1 = require("../github/github");
var file_reader_1 = require("../file-reader/file-reader");
var index_2 = require("../package-json/index");
var workspace_navigator_1 = require("./navigator/workspace-navigator");
var workspace_navigator_config_1 = require("./navigator/workspace-navigator-config");
/******************************************************
 *
 * Workspace
 *
 ******************************************************/
var Workspace = /** @class */ (function () {
    function Workspace(githubToken, projectFactory, shell, logger, interpolator, navigator) {
        this._projects = {};
        this._buildOrder = [];
        this._aws = new aws_1.AWS();
        this._shell = shell;
        this._logger = logger;
        this._interpolator = interpolator;
        this._projectFactory = projectFactory;
        this._navigator = navigator || new workspace_navigator_1.WorkspaceNavigator(workspace_navigator_config_1.defaultWorkspaceNavigatorConfig, this._logger);
        this._packageJson = new index_2.PackageJson({ path: this._navigator.rootPath + "/package.json" }, new file_reader_1.FileReader(this._logger), this._logger);
        this._localConfig = this._navigator.localConfig;
        this._github = new github_1.GitHub(githubToken, this._localConfig.github, this._shell, this._packageJson);
        this._ngProjectStructure = new index_1.NgProjectStructure();
    }
    Object.defineProperty(Workspace.prototype, "projects", {
        get: function () {
            var _this = this;
            return this._buildOrder.map(function (id) { return _this._projects[id]; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "libraries", {
        get: function () { return this._getProjectByGroup('libraries'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "applications", {
        get: function () { return this._getProjectByGroup('applications'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Workspace.prototype, "commandLineTools", {
        get: function () { return this._getProjectByGroup('command-line-tools'); },
        enumerable: true,
        configurable: true
    });
    Workspace.prototype.getProjectById = function (id) { return this._projects[id]; };
    Workspace.prototype.calculateBuildOrder = function () {
        var _this = this;
        var projects = Object
            .keys(this._projects)
            .map(function (p) { return ({
            id: _this._projects[p].id,
            dep: _this._projects[p].dependencies.concat([])
        }); });
        return this._sortByDependencies(projects);
    };
    Workspace.prototype.version = function () {
        return this._packageJson.version;
    };
    Workspace.prototype.test = function (target) {
        var commands = this._getProjectsByTarget(target).map(function (p) { return p.test(); });
        return rxjs_1.merge(commands).pipe(operators_1.mergeAll());
    };
    Workspace.prototype.build = function (target) {
        var commands = this._getProjectsByTarget(target).map(function (p) { return p.build(); });
        return rxjs_1.concat(commands).pipe(operators_1.concatAll());
    };
    Workspace.prototype.lint = function (target) {
        var commands = this._getProjectsByTarget(target).map(function (p) { return p.lint(); });
        return rxjs_1.merge(commands).pipe(operators_1.mergeAll());
    };
    Workspace.prototype.bump = function () {
        var commands = this._getProjectsByTarget('all').map(function (p) { return p.bump('patch'); });
        // bump version of main package.json file
        this._packageJson.bump();
        return rxjs_1.merge(commands).pipe(operators_1.mergeAll());
    };
    Workspace.prototype.createDeployment = function (target) {
        var _this = this;
        var commands = this._getProjectsByTarget(target).map(function (p) { return p.deploy(_this._aws); });
        return rxjs_1.merge(commands).pipe(operators_1.mergeAll(), operators_1.tap(function () {
            _this._aws.deploy();
        }));
    };
    Workspace.prototype.release = function () {
        return rxjs_1.concat([
            this._github.updateReleaseFolder(),
            this._github.release(),
            this.bump(),
            this._github.push()
        ]).pipe(operators_1.concatAll());
    };
    Workspace.prototype.deploy = function () {
        return this._shell.execute({
            command: 'cdk',
            options: ['deploy', '-a', '"./node_modules/.bin/ef create-deployment applications"', '"*"', '--require-approval', 'never', '--profile', 'ef-cse-dev']
        });
    };
    Workspace.prototype.buildStructure = function (target) {
        var _this = this;
        return this._getProjectsByTarget(target).map(function (p) { return _this._buildStructureByProject(p); });
    };
    Workspace.prototype.initialise = function () {
        this._createProjects();
        this._buildOrder = this.calculateBuildOrder();
    };
    Workspace.prototype._buildStructureByProject = function (p) {
        var localConfig = this._getProjectLocalConfig(p.id, p.group);
        var outputConfig = this._localConfig.output;
        var structure = this._ngProjectStructure.buildStructure({
            id: p.id,
            path: {
                base: p.path.base,
                relative: {
                    index: localConfig.path.relative.index,
                    tsconfig: localConfig.path.relative.tsconfig
                }
            }
        });
        var output = {
            base: "./" + this._localConfig.output.path.base + "/" + p.id,
            relative: {
                structure: outputConfig.path.relative.structure,
                entities: outputConfig.path.relative.entities
            }
        };
        fs.mkdirSync(output.base, { recursive: true });
        fs.writeFileSync("" + output.base + output.relative.structure, structure.toString());
        fs.writeFileSync("" + output.base + output.relative.entities, this._ngProjectStructure.buildLibraryEntitiesFile(p.id, p.name));
        return structure;
    };
    Workspace.prototype._getProjectsByTarget = function (target) {
        var _this = this;
        var projects = [];
        if (target === 'all') {
            projects = this._buildOrder
                .map(function (id) { return _this._projects[id]; });
        }
        else if (Object.keys(this._localConfig.projects).indexOf(target) >= 0) {
            projects = this._buildOrder
                .filter(function (p) { return _this._projects[p].group === target; })
                .map(function (id) { return _this._projects[id]; });
        }
        else if (this._buildOrder.indexOf(target) >= 0) {
            projects = [this._projects[target]];
        }
        return projects;
    };
    Workspace.prototype._createProjects = function () {
        var _this = this;
        Object.keys(this._localConfig.projects)
            .filter(function (group) { return group !== 'common'; })
            .forEach(function (group) { return _this._navigator
            .getProjectsInFolder(group)
            .forEach(function (id) { return _this._projects[id] = _this._createProjectByIdAndGroup(id, group); }); });
    };
    Workspace.prototype._createProjectByIdAndGroup = function (id, group) {
        var localConfig = this._getProjectLocalConfig(id, group);
        var project = this._projectFactory.create({
            id: id,
            group: group,
            path: {
                base: this._navigator.rootPath + "/projects/" + group + "/" + id,
                relative: {
                    index: localConfig.path.relative.index,
                    tsconfig: localConfig.path.relative.tsconfig,
                }
            },
            deployment: localConfig.deployment || {},
            commands: localConfig.commands,
            distPath: this._navigator.rootPath + "/dist/" + group + "/" + id
        });
        return project;
    };
    Workspace.prototype._getProjectLocalConfig = function (id, group) {
        var commonConfig = this._localConfig.projects[group].common;
        var projectConfig = this._localConfig.projects[group][id] || {};
        return tslib_1.__assign(tslib_1.__assign({}, commonConfig), projectConfig);
    };
    Workspace.prototype._getProjectByGroup = function (group) {
        var _this = this;
        return Object.keys(this._projects)
            .filter(function (p) { return _this._projects[p].group === group; })
            .map(function (key) { return _this._projects[key]; });
    };
    Workspace.prototype._sortByDependencies = function (all, acum) {
        if (acum === void 0) { acum = []; }
        if (all.length === 0) {
            return acum;
        }
        else {
            all.forEach(function (p) {
                p.dep = p.dep.filter(function (dep) { return acum.indexOf(dep) < 0; });
                if (p.dep.length === 0) {
                    acum.push(p.id);
                }
            });
            all = all.filter(function (p) { return p.dep.length > 0; });
            return this._sortByDependencies(all, acum);
        }
    };
    return Workspace;
}());
exports.Workspace = Workspace;
//# sourceMappingURL=workspace.js.map