"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var project_1 = require("../project");
var rxjs_1 = require("rxjs");
var fs_1 = require("fs");
var operators_1 = require("rxjs/operators");
var Library = /** @class */ (function (_super) {
    tslib_1.__extends(Library, _super);
    function Library() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Library.prototype.release = function () {
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
    return Library;
}(project_1.Project));
exports.Library = Library;
//# sourceMappingURL=library.js.map