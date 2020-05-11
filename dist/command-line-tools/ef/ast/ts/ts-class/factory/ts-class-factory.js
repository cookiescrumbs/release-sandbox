"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_class_1 = require("../ts-class");
var TsClassFactory = /** @class */ (function () {
    function TsClassFactory() {
    }
    TsClassFactory.prototype.create = function (classDeclaration, file) {
        return new ts_class_1.TsClass(classDeclaration, file);
    };
    return TsClassFactory;
}());
exports.TsClassFactory = TsClassFactory;
//# sourceMappingURL=ts-class-factory.js.map