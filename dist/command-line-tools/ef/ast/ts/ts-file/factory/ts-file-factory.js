"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ts_file_1 = require("../ts-file");
var TsFileFactory = /** @class */ (function () {
    function TsFileFactory(classFactory) {
        this._classFactory = classFactory;
    }
    TsFileFactory.prototype.create = function (file) {
        return new ts_file_1.TsFile(file);
    };
    return TsFileFactory;
}());
exports.TsFileFactory = TsFileFactory;
//# sourceMappingURL=ts-file-factory.js.map