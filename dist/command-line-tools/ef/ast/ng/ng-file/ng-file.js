"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ts_file_1 = require("../../ts/ts-file/ts-file");
var NgFile = /** @class */ (function (_super) {
    tslib_1.__extends(NgFile, _super);
    function NgFile(file, classFactory) {
        var _this = _super.call(this, file) || this;
        _this.classes = {};
        _this._classFactory = classFactory;
        _this._buildClasses();
        return _this;
    }
    NgFile.prototype._buildClasses = function () {
        var _this = this;
        this._file.getClasses().forEach(function (classDecration) {
            var ngClass = _this._classFactory.create(classDecration, _this);
            _this.classes[ngClass.name] = ngClass;
        });
    };
    Object.defineProperty(NgFile.prototype, "classList", {
        get: function () {
            var _this = this;
            return Object.keys(this.classes).map(function (key) { return _this.classes[key]; });
        },
        enumerable: true,
        configurable: true
    });
    return NgFile;
}(ts_file_1.TsFile));
exports.NgFile = NgFile;
//# sourceMappingURL=ng-file.js.map