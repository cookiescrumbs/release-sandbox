"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ng_library_1 = require("../ng-library/ng-library");
var ng_project_structure_formatter_1 = require("./formatter/ng-project-structure-formatter");
var ng_class_factory_1 = require("../ng-class/factory/ng-class-factory");
var ng_file_factory_1 = require("../ng-file/factory/ng-file-factory");
var source_file_tree_1 = require("../../source-file-tree/source-file-tree");
var entitiesTpl = "\nimport * as entities from '##PACKAGE_NAME##';\n\nexport const COMPONENTS = [##COMPONENTS##];\nexport const MODULES = [##MODULES##];\n";
var NgProjectStructure = /** @class */ (function () {
    function NgProjectStructure() {
        this._libraries = {};
        var classFactory = new ng_class_factory_1.NgClassFactory();
        this._formatter = new ng_project_structure_formatter_1.NgProjectStructureFormatter();
        this._fileFactory = new ng_file_factory_1.NgFileFactory(classFactory);
    }
    NgProjectStructure.prototype.buildStructure = function (config) {
        return this._buildLibraryStructure(config);
        console.log("Analysed Library files from " + config.path.base + config.path.relative.index + ".");
    };
    NgProjectStructure.prototype._buildLibraryStructure = function (config) {
        var lib = new ng_library_1.NgLibrary(config, this._fileFactory);
        console.log(lib.getModuleNamesArray());
        var structure = this._buildFileTree(config, lib);
        this._libraries[lib.id] = lib;
        return structure;
    };
    NgProjectStructure.prototype._buildFileTree = function (config, library) {
        var _this = this;
        return new source_file_tree_1.SourceFileTree({
            rootPath: config.path.base,
            extension: /\.ts$/,
            treeFactory: function (node, children) {
                var ngFile = library.getFileByPath(node.path);
                return (ngFile)
                    ? _this._formatter.formatNgFile(ngFile)
                    : _this._formatter.formatNode(node, children);
            }
        });
    };
    NgProjectStructure.prototype.buildLibraryEntitiesFile = function (libraryId, packageName) {
        return entitiesTpl
            .replace('##PACKAGE_NAME##', packageName)
            .replace('##COMPONENTS##', this._libraries[libraryId].getExportedComponentsArray().map(function (name) { return "entities." + name; }))
            .replace('##MODULES##', this._libraries[libraryId].getModuleNamesArray().map(function (name) { return "entities." + name; }));
    };
    return NgProjectStructure;
}());
exports.NgProjectStructure = NgProjectStructure;
//# sourceMappingURL=ng-project-structure.js.map