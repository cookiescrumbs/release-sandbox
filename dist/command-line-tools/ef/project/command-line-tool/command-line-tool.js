"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var project_1 = require("../project");
var rxjs_1 = require("rxjs");
var fs_1 = require("fs");
var operators_1 = require("rxjs/operators");
var CommandLineTool = /** @class */ (function (_super) {
    tslib_1.__extends(CommandLineTool, _super);
    function CommandLineTool() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CommandLineTool.prototype.release = function () {
        var _this = this;
        return rxjs_1.of({}).pipe(operators_1.filter(function () {
            return fs_1.existsSync(_this.distPath);
        }), operators_1.tap(function () {
            process.chdir(_this.distPath);
            console.log("publishing " + _this.id + " from " + process.cwd());
        }), operators_1.switchMap(function () {
            return _this._shell.execute({
                command: 'npm',
                options: ['publish']
            });
        }));
    };
    CommandLineTool.prototype.build = function () {
        var _this = this;
        return this._shell.execute(this._config.commands['build'], { tsconfigPath: this.path.base + "/" + this.path.relative.tsconfig }).pipe(operators_1.switchMap(function () { return _this._writePackageJson(); }));
    };
    CommandLineTool.prototype.lint = function () {
        return rxjs_1.of({});
    };
    return CommandLineTool;
}(project_1.Project));
exports.CommandLineTool = CommandLineTool;
//# sourceMappingURL=command-line-tool.js.map