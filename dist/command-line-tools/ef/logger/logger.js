"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var logger_console_adapter_1 = require("./adapter/console/logger-console-adapter");
var log_type_1 = require("./log-type");
var logger_level_1 = require("./logger-level");
var chalk_1 = tslib_1.__importDefault(require("chalk"));
var Logger = /** @class */ (function () {
    function Logger(config, adapter) {
        this._config = {
            prefix: {
                common: 'EF',
                log: 'L',
                warn: 'W',
                error: 'E'
            },
            level: logger_level_1.LOGGER_LEVEL.ERROR,
            colorEnabled: true,
            color: {
                prefix: '#444',
                log: '#444',
                warn: '#ff0',
                error: '#900'
            }
        };
        this._config = config || this._config;
        this._adapter = adapter || new logger_console_adapter_1.LoggerConsoleAdapter();
    }
    Logger.prototype.log = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this._config.level < 2) {
            this._adapterOut(log_type_1.LOG_TYPE.LOG, args);
        }
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (this._config.level < 3) {
            this._adapterOut(log_type_1.LOG_TYPE.WARN, args);
        }
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        this._adapterOut(log_type_1.LOG_TYPE.ERROR, args);
    };
    Logger.prototype.setConfig = function (config) {
        this._config.prefix = config.prefix;
        this._config.color = config.color;
        this._config.colorEnabled = config.colorEnabled;
    };
    Logger.prototype.setLevel = function (level) {
        this._config.level = level;
    };
    Logger.prototype._adapterOut = function (type, args) {
        var prefix = (this._config.colorEnabled)
            ? chalk_1.default.hex(this._config.color.prefix)(this._config.prefix.common)
            : this._config.prefix.common;
        var logType = (this._config.colorEnabled)
            ? chalk_1.default.hex(this._config.color[type])(this._config.prefix[type])
            : this._config.prefix[type];
        this._adapter[type].apply(this, tslib_1.__spread([
            prefix + "\u2022" + logType
        ], args));
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map