"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_morph_1 = require("ts-morph");
var NgLibrary = /** @class */ (function () {
    function NgLibrary(config, fileFactory) {
        this.decoratorMap = {};
        this.pathMap = {};
        this._config = config;
        this.id = this._config.id;
        this._fileFactory = fileFactory;
        this._project = this._buildProject(config);
        this._analyseSourceFiles();
    }
    Object.defineProperty(NgLibrary.prototype, "indexPath", {
        get: function () {
            return this._config.path.base + this._config.path.relative.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NgLibrary.prototype, "tsConfigPath", {
        get: function () {
            return this._config.path.base + this._config.path.relative.tsconfig;
        },
        enumerable: true,
        configurable: true
    });
    NgLibrary.prototype.getComponentNamesArray = function () {
        return Object.keys(this.decoratorMap.Component || {});
    };
    NgLibrary.prototype.getModuleNamesArray = function () {
        return Object.keys(this.decoratorMap.NgModule || {});
    };
    NgLibrary.prototype.getExportedComponentsArray = function () {
        var _this = this;
        var components = [];
        this.getModuleNamesArray().forEach(function (key) {
            var ngModule = _this.decoratorMap.NgModule[key];
            ngModule.moduleDefinition.exports.forEach(function (entity) {
                if (!!_this.decoratorMap.Component[entity]) {
                    components.push(entity);
                }
            });
        });
        return components;
    };
    NgLibrary.prototype.getFileByPath = function (path) {
        return this.pathMap[path];
    };
    NgLibrary.prototype._buildProject = function (config) {
        var project = new ts_morph_1.Project({
            tsConfigFilePath: this.tsConfigPath,
            skipFileDependencyResolution: true
        });
        project.addSourceFileAtPath(this.indexPath);
        return project;
    };
    NgLibrary.prototype._analyseSourceFiles = function () {
        var _this = this;
        this._project.getSourceFiles()
            .forEach(function (file) {
            var ngFile = _this._fileFactory.create(file);
            _this._addFileToPathMap(ngFile);
            ngFile.classList.forEach(function (ngClass) { return _this._addClassToDecoratorMap(ngClass); });
        });
    };
    NgLibrary.prototype._addClassToDecoratorMap = function (ngClass) {
        if (!this.decoratorMap[ngClass.type]) {
            this.decoratorMap[ngClass.type] = {};
        }
        this.decoratorMap[ngClass.type][ngClass.name] = ngClass;
    };
    NgLibrary.prototype._addFileToPathMap = function (tsFile) {
        var path = tsFile.path.replace(new RegExp(".*/" + this._config.path.base + "(.*)$"), this._config.path.base + '$1');
        this.pathMap[path] = tsFile;
    };
    return NgLibrary;
}());
exports.NgLibrary = NgLibrary;
//# sourceMappingURL=ng-library.js.map