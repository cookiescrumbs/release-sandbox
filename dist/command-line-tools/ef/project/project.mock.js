"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var ProjectMock = /** @class */ (function () {
    function ProjectMock(config) {
        this.id = config.id;
        this.path = config.path;
        this.group = config.group;
        this.dependencies = [];
    }
    ProjectMock.prototype.test = function () { return rxjs_1.of({}); };
    ProjectMock.prototype.build = function () { return rxjs_1.of({}); };
    ProjectMock.prototype.lint = function () { return rxjs_1.of({}); };
    ProjectMock.prototype.release = function () { return rxjs_1.of({}); };
    return ProjectMock;
}());
exports.ProjectMock = ProjectMock;
//# sourceMappingURL=project.mock.js.map