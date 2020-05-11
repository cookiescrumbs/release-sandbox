"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var LoggerConsoleAdapter = /** @class */ (function () {
    function LoggerConsoleAdapter() {
    }
    LoggerConsoleAdapter.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log.apply(this, args);
    };
    LoggerConsoleAdapter.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.warn.apply(this, args);
    };
    LoggerConsoleAdapter.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.error.apply(this, args.map(function (a) { return chalk_1.default(a); }));
    };
    LoggerConsoleAdapter.prototype._format = function (a) {
        return chalk_1.default(a);
    };
    return LoggerConsoleAdapter;
}());
exports.LoggerConsoleAdapter = LoggerConsoleAdapter;
//# sourceMappingURL=logger-console-adapter.js.map