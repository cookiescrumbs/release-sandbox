"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var string_utils_1 = require("../string/string-utils");
var deepMerge = tslib_1.__importStar(require("deepmerge"));
exports.MISSING_OBJECT_PROP_ERROR = 'ObjectUtils:: There is no object \'%propertyName%\'. Failed at prop \'%prop%\'';
var ObjectUtils = /** @class */ (function () {
    function ObjectUtils() {
    }
    ObjectUtils.clone = function (source) {
        return JSON.parse(JSON.stringify(source));
    };
    ObjectUtils.merge = function (target, target1) {
        Object.keys(target1)
            .forEach(function (key) {
            target[key] = target1[key];
        });
    };
    ObjectUtils.deepMerge = function (args) {
        var overwriteMerge = function (destinationArray, sourceArray, options) { return sourceArray; };
        return deepMerge.all(args, {
            arrayMerge: overwriteMerge
        });
    };
    ObjectUtils.deepAssign = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return ObjectUtils.deepMerge(args);
    };
    ObjectUtils.recursivelyFindProperty = function (propertyName, target) {
        propertyName.split('.')
            .forEach(function (prop) {
            target = target[prop];
            if (target === undefined) {
                ObjectUtils.throwMissingPropertyError(propertyName, prop);
            }
        });
        return target;
    };
    ObjectUtils.throwMissingPropertyError = function (propertyName, prop) {
        var msg = string_utils_1.StringUtils.replaceMultiple(exports.MISSING_OBJECT_PROP_ERROR, ['%propertyName%', '%prop%'], [propertyName, prop]);
        throw new Error(msg);
    };
    ObjectUtils.isPropertyChainDefined = function (obj, path) {
        var chainedProperties = path.split('.');
        var res = (chainedProperties.length > 0) ?
            chainedProperties.reduce(function (accumulator, property) { return accumulator[property] || 0; }, obj) :
            obj[path];
        return (!!res) ? res : false;
    };
    ObjectUtils.mergeTrees = function (a, b) {
        if (!b || !b.children) {
            return a;
        }
        var aIdList = a.children.map(function (i) { return i.id; });
        b.children.forEach(function (c) {
            if (!aIdList.includes(c.id)) {
                a.children.push(c);
            }
            else {
                var item = a.children.filter(function (ch) { return ch.id === c.id; })[0];
                item = ObjectUtils.mergeTrees(item, c);
            }
        });
        return a;
    };
    return ObjectUtils;
}());
exports.ObjectUtils = ObjectUtils;
//# sourceMappingURL=object-utils.js.map