"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ng_class_type_1 = require("../ng-class-type");
var ng_class_1 = require("../ng-class");
var NgComponentClass = /** @class */ (function (_super) {
    tslib_1.__extends(NgComponentClass, _super);
    function NgComponentClass(tsClass) {
        var _this = _super.call(this, tsClass) || this;
        _this.type = ng_class_type_1.NG_CLASS_TYPE.COMPONENT;
        _this.inputs = {};
        _this.outputs = {};
        _this._parseProperties();
        return _this;
    }
    NgComponentClass.prototype._parseProperties = function () {
        var _this = this;
        this._tsClass.decoratedProperties.forEach(function (property) {
            var name = property.getName();
            var type = property.getType().getText();
            property.getDecorators().forEach(function (decorator) {
                if (decorator.getName() === 'Input') {
                    _this.inputs[name] = type;
                }
                if (decorator.getName() === 'Output') {
                    _this.outputs[name] = type;
                }
            });
        });
    };
    return NgComponentClass;
}(ng_class_1.NgClass));
exports.NgComponentClass = NgComponentClass;
//# sourceMappingURL=ng-component-class.js.map