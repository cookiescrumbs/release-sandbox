"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ng_class_type_1 = require("../../ng-class/ng-class-type");
var NgProjectStructureFormatter = /** @class */ (function () {
    function NgProjectStructureFormatter() {
        var _a;
        var _this = this;
        this._ngFormattersMap = (_a = {},
            _a[ng_class_type_1.NG_CLASS_TYPE.MODULE] = function (c) { return _this._formatNgModuleClass(c); },
            _a[ng_class_type_1.NG_CLASS_TYPE.COMPONENT] = function (c) { return _this._formatNgComponentClass(c); },
            _a.deafult = function (c) { return _this.formatDefaultClass(c); },
            _a);
    }
    NgProjectStructureFormatter.prototype.formatNode = function (node, children) {
        return {
            value: tslib_1.__assign(tslib_1.__assign({ title: node.name }, this._buildPathsFromFullPath(node.name)), { type: 'dir' }),
            children: children
        };
    };
    NgProjectStructureFormatter.prototype.formatNgFile = function (ngFile) {
        var _this = this;
        var classes = ngFile.classList.map(function (tsClass) { return _this._formatClass(tsClass); });
        return {
            value: tslib_1.__assign({ title: ngFile.name, type: 'file' }, this._buildPathsFromFullPath(ngFile.path)),
            children: classes
        };
    };
    NgProjectStructureFormatter.prototype._formatClass = function (ngClass) {
        var formatter = this._ngFormattersMap[ngClass.type] || this._ngFormattersMap.deafult;
        return formatter(ngClass);
    };
    NgProjectStructureFormatter.prototype._formatNgComponentClass = function (ngClass) {
        return {
            value: tslib_1.__assign({ title: ngClass.name, class: ngClass.name, type: ngClass.type, io: {
                    input: ngClass.inputs,
                    output: ngClass.outputs,
                } }, this._buildPathsFromFullPath(ngClass.path))
        };
    };
    NgProjectStructureFormatter.prototype._formatNgModuleClass = function (ngClass) {
        return {
            value: tslib_1.__assign({ title: ngClass.name, class: ngClass.name, type: ngClass.type, definition: ngClass.moduleDefinition }, this._buildPathsFromFullPath(ngClass.path))
        };
    };
    NgProjectStructureFormatter.prototype.formatDefaultClass = function (ngClass) {
        return {
            value: tslib_1.__assign({ title: ngClass.name, type: ngClass.type }, this._buildPathsFromFullPath(ngClass.path))
        };
    };
    NgProjectStructureFormatter.prototype._buildPathsFromFullPath = function (fullPath) {
        return {
            path: fullPath.split('/').pop(),
            fullPath: fullPath,
        };
    };
    return NgProjectStructureFormatter;
}());
exports.NgProjectStructureFormatter = NgProjectStructureFormatter;
//# sourceMappingURL=ng-project-structure-formatter.js.map