"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var File = /** @class */ (function () {
    function File(file) {
        this._file = file;
        this.path = file.getFilePath();
        this.name = file.getBaseName();
        this.directoryName = file.getBaseName();
    }
    return File;
}());
exports.File = File;
//# sourceMappingURL=file.js.map