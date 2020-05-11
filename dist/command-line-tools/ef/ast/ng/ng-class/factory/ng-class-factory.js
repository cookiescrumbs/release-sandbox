"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ng_component_class_1 = require("../component/ng-component-class");
var ng_module_class_1 = require("../module/ng-module-class");
var ng_class_1 = require("../ng-class");
var ts_class_1 = require("../../../ts/ts-class/ts-class");
var NgClassFactory = /** @class */ (function () {
    function NgClassFactory() {
        this._decoratorToConstructorMap = {
            NgModule: this._createModuleClass,
            Component: this._createComponentClass,
            default: this._createNgClass
        };
    }
    NgClassFactory.prototype.create = function (classDeclaration, file) {
        return this.createByTsClass(new ts_class_1.TsClass(classDeclaration, file));
    };
    NgClassFactory.prototype.createByTsClass = function (tsClass) {
        var constructor = this._decoratorToConstructorMap[tsClass.decoratorName] || this._decoratorToConstructorMap.default;
        return constructor(tsClass);
    };
    NgClassFactory.prototype._createNgClass = function (tsClass) {
        return new ng_class_1.NgClass(tsClass);
    };
    NgClassFactory.prototype._createModuleClass = function (tsClass) {
        return new ng_module_class_1.NgModuleClass(tsClass);
    };
    NgClassFactory.prototype._createComponentClass = function (tsClass) {
        return new ng_component_class_1.NgComponentClass(tsClass);
    };
    return NgClassFactory;
}());
exports.NgClassFactory = NgClassFactory;
//# sourceMappingURL=ng-class-factory.js.map