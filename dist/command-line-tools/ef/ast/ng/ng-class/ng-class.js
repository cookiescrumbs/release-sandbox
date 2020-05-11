"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ng_class_type_1 = require("./ng-class-type");
var NgClass = /** @class */ (function () {
    function NgClass(tsClass) {
        this.type = ng_class_type_1.NG_CLASS_TYPE.CLASS;
        this._tsClass = tsClass;
        this.name = this._tsClass.name;
        this.path = this._tsClass.filePath;
        this.structure = this._tsClass.structure;
    }
    return NgClass;
}());
exports.NgClass = NgClass;
//# sourceMappingURL=ng-class.js.map