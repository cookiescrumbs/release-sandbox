"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var child_process_1 = require("child_process");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var jsonTemplater = tslib_1.__importStar(require("json-templater"));
var readline = tslib_1.__importStar(require("readline"));
var Shell = /** @class */ (function () {
    function Shell(logger) {
        this._logger = logger;
        process.env.FORCE_COLOR = '1';
        this._templater = jsonTemplater;
    }
    Shell.prototype.execute = function (config, interpolationValues) {
        var _this = this;
        if (interpolationValues === void 0) { interpolationValues = {}; }
        var c = this._templater.object(config, interpolationValues);
        return rxjs_1.Observable.create(function (o) {
            var process = child_process_1.spawn(c.command, c.options);
            process.on('exit', function (code, signal) {
                o.next();
                o.complete();
            });
            _this._setInterface(c.command, c.options, process, o);
        }).pipe(operators_1.catchError(function (error) { return rxjs_1.of([]); }));
    };
    Shell.prototype._setInterface = function (command, options, process, o) {
        var _this = this;
        readline.createInterface({
            input: process.stdout,
            terminal: false
        }).on('line', function (line) {
            line = _this._formatLine(command, options, line);
            _this._logger.log(line);
        });
        readline.createInterface({
            input: process.stderr,
            terminal: false
        }).on('line', function (line) {
            line = _this._formatLine(command, options, line);
            _this._logger.error(line);
        });
    };
    Shell.prototype._formatLine = function (command, options, line) {
        return command + " " + options.join(' ') + " " + line;
    };
    return Shell;
}());
exports.Shell = Shell;
//# sourceMappingURL=shell.js.map