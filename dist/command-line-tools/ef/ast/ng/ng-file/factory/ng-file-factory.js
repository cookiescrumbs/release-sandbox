"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ng_file_1 = require("../ng-file");
var NgFileFactory = /** @class */ (function () {
    function NgFileFactory(classFactory) {
        this._classFactory = classFactory;
    }
    NgFileFactory.prototype.create = function (file) {
        return new ng_file_1.NgFile(file, this._classFactory);
    };
    return NgFileFactory;
}());
exports.NgFileFactory = NgFileFactory;
//# sourceMappingURL=ng-file-factory.js.map