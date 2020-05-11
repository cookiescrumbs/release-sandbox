"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path = tslib_1.__importStar(require("path"));
var fs_1 = require("fs");
var FileReader = /** @class */ (function () {
    function FileReader(logger) {
        this._logger = logger;
    }
    FileReader.prototype.readJSONFromPath = function (filePath) {
        var fileContent, result;
        try {
            fileContent = fs_1.readFileSync(path.join(filePath));
        }
        catch (error) {
            this._warn(".readJSONFromPath( filePath ) :: " + filePath + " does not exist");
            fileContent = '{}';
        }
        try {
            result = JSON.parse(fileContent);
        }
        catch (error) {
            this._warn(".readJSONFromPath( filePath ) :: " + filePath + " is not a valid JSON file");
            result = {};
        }
        return result;
    };
    FileReader.prototype._warn = function (msg) {
        this._logger.warn("FileReader Error :: " + msg);
    };
    return FileReader;
}());
exports.FileReader = FileReader;
//# sourceMappingURL=file-reader.js.map