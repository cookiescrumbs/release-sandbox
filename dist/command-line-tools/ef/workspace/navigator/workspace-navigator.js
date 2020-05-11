"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = require("fs");
var path = tslib_1.__importStar(require("path"));
var workspace_navigator_config_1 = require("./workspace-navigator-config");
var WorkspaceNavigator = /** @class */ (function () {
    function WorkspaceNavigator(config, logger) {
        if (config === void 0) { config = workspace_navigator_config_1.defaultWorkspaceNavigatorConfig; }
        this._rootFileName = config.rootFileName;
        this.rootPath = this._findRoot(config.dirName);
        this._logger = logger;
    }
    WorkspaceNavigator.prototype._findRoot = function (currentPath) {
        if (currentPath === void 0) { currentPath = process.cwd(); }
        var rootFile = this._rootFileName;
        var content = fs_1.readdirSync(currentPath);
        if (currentPath === '/') {
            throw new Error('Project Root not found');
        }
        if (content.indexOf(rootFile) > -1) {
            return currentPath;
        }
        return this._findRoot(path.join(currentPath, '../'));
    };
    Object.defineProperty(WorkspaceNavigator.prototype, "localConfig", {
        get: function () {
            return JSON.parse(fs_1.readFileSync(path.join(this.rootPath + "/" + this._rootFileName)));
        },
        enumerable: true,
        configurable: true
    });
    WorkspaceNavigator.prototype.getProjectsInFolder = function (folder) {
        var rootPath = this.rootPath + "/projects/" + folder;
        return fs_1.readdirSync(rootPath, { withFileTypes: true })
            .filter(function (d) { return d.isDirectory(); })
            .map(function (d) { return d.name; });
    };
    return WorkspaceNavigator;
}());
exports.WorkspaceNavigator = WorkspaceNavigator;
//# sourceMappingURL=workspace-navigator.js.map