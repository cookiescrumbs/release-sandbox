"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var file_reader_1 = require("../file-reader/file-reader");
var shell_1 = require("../shell");
var rxjs_1 = require("rxjs");
var index_1 = require("../package-json/index");
var fs = tslib_1.__importStar(require("fs"));
var Project = /** @class */ (function () {
    function Project(config, logger, interpolator) {
        this.path = {
            base: '',
            relative: {
                index: '',
                tsconfig: ''
            }
        };
        this._logger = logger;
        this._interpolator = interpolator;
        this._shell = new shell_1.Shell(this._logger);
        this._fileReader = new file_reader_1.FileReader(this._logger);
        this.path = config.path;
        this.distPath = config.distPath;
        this.id = config.id;
        this.group = config.group;
        this._config = this._interpolator.interpolateValuesInJson(tslib_1.__assign(tslib_1.__assign({}, config), this._fileReader.readJSONFromPath(this.path.base + "/workspace.json")), this);
        this._packageJson = new index_1.PackageJson({ path: this.path.base + "/package.json" }, this._fileReader, this._logger);
        this.dependencies = this._getDependencies();
    }
    Object.defineProperty(Project.prototype, "name", {
        get: function () { return this._packageJson.name; },
        enumerable: true,
        configurable: true
    });
    Project.prototype.test = function () { return this.runTask('test'); };
    Project.prototype.lint = function () { return this.runTask('lint'); };
    Project.prototype.release = function () { return rxjs_1.empty(); };
    Project.prototype.deploy = function (aws) { return rxjs_1.empty(); };
    Project.prototype.serve = function () { return rxjs_1.empty(); };
    Project.prototype.build = function () { return this.runTask('build'); };
    Project.prototype.bump = function (type) {
        var _this = this;
        return rxjs_1.Observable.create(function (o) {
            _this._packageJson.bump();
            _this._logger.log(_this.id + " Bumped to version: " + _this._packageJson.version + " ");
            o.next();
            o.complete();
        });
    };
    Project.prototype.runTask = function (id) {
        return this._shell.execute(this._config.commands[id], { id: this.id });
    };
    Project.prototype._executeTask = function (task) {
        return this._shell.execute({ command: task, options: [] }, {});
    };
    Project.prototype._getDependencies = function () {
        var deps = (this._packageJson && this._packageJson.peerDependencies) ? this._packageJson.peerDependencies : {};
        return Object.keys(deps)
            .filter(function (project) { return project.indexOf('@ef-class') > -1; })
            .map(function (project) { return project.split('/')[1]; });
    };
    Project.prototype._writePackageJson = function () {
        var _this = this;
        return rxjs_1.Observable.create(function (o) {
            var path = _this.distPath + "/package.json", content = _this._packageJson.toString(), cb = function (error) {
                if (error) {
                    _this._logger.error("Project " + _this.id + " Build Error. Could not write package.json in " + path + " with content " + content, error);
                }
                o.next();
                o.complete();
            };
            fs.writeFile(path, content, cb);
        });
    };
    return Project;
}());
exports.Project = Project;
//# sourceMappingURL=project.js.map