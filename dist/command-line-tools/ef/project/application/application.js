"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var rxjs_1 = require("rxjs");
var project_1 = require("../project");
var Application = /** @class */ (function (_super) {
    tslib_1.__extends(Application, _super);
    function Application() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Application.prototype.serve = function () {
        return this.runTask('serve');
    };
    Application.prototype.deploy = function (aws) {
        if (!!this._config.deployment) {
            var stackConfig = tslib_1.__assign(tslib_1.__assign({}, this._config.deployment), { name: (this._config.deployment.dns.subdomain + ".dev.content.ef.com").replace(/\./g, '-'), asset: {
                    path: this.distPath
                } });
            aws.addStack(stackConfig);
        }
        return rxjs_1.empty();
    };
    return Application;
}(project_1.Project));
exports.Application = Application;
//# sourceMappingURL=application.js.map