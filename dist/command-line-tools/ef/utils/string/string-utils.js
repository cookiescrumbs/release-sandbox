"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var StringUtils = /** @class */ (function () {
    function StringUtils() {
    }
    StringUtils.replaceMultiple = function (source, targetValues, values) {
        var result = source;
        targetValues.forEach(function (targetValue, index) {
            result = result.replace(targetValue, values[index]);
        });
        return result;
    };
    return StringUtils;
}());
exports.StringUtils = StringUtils;
//# sourceMappingURL=string-utils.js.map