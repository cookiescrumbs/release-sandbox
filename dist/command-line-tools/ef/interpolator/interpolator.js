"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonTemplater = require("json-templater/object");
var stringTemplater = require("json-templater/string");
var index_1 = require("../utils/index");
var index_2 = require("../logger/index");
var Interpolator = /** @class */ (function () {
    function Interpolator(config, logger) {
        this._jsonParser = jsonTemplater;
        this._stringParser = stringTemplater;
        this._expressionPattern = /#([a-z]+)#\s*([a-zA-Z.-_0-9]+)/;
        this._castMethodMap = {
            default: JSON.parse
        };
        this._logger = logger || new index_2.Logger();
        this._castMethodMap = (config && config.castMethodMap) ? config.castMethodMap : this._castMethodMap;
        this._castMethodMap.default = this._castMethodMap.default || JSON.parse;
    }
    Interpolator.prototype.interpolateValuesInJson = function (template, values) {
        var _this = this;
        return this._jsonParser(template, values, function (value, data, key) {
            var match = value.match(_this._expressionPattern);
            return (match)
                ? _this._parseValue(match[1], match[2], data)
                : _this._interpolateValue(value, data);
        });
    };
    Interpolator.prototype.interpolateValuesInString = function (template, values) {
        return this._stringParser(template, values);
    };
    Interpolator.prototype._parseValue = function (castMethodId, key, data) {
        var cast, value, result;
        cast = this._castMethodMap[castMethodId] || this._castMethodMap.default;
        try {
            value = index_1.ObjectUtils.recursivelyFindProperty(key, data);
        }
        catch (error) {
            this._logger.error("Interpolator error. [" + error + "]");
        }
        try {
            result = cast(value);
        }
        catch (error) {
            this._logger.error("Interpolator error. Error trying to parse [" + key + "] with cast [" + castMethodId + "] where [" + key + " = " + value + "]");
        }
        return result;
    };
    Interpolator.prototype._interpolateValue = function (template, data) {
        return this._jsonParser(template, data);
    };
    return Interpolator;
}());
exports.Interpolator = Interpolator;
//# sourceMappingURL=interpolator.js.map