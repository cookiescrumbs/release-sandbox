"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var project_mock_1 = require("../project.mock");
var ProjectFactoryMock = /** @class */ (function () {
    function ProjectFactoryMock() {
    }
    ProjectFactoryMock.prototype.create = function (config) {
        return new project_mock_1.ProjectMock(config);
    };
    return ProjectFactoryMock;
}());
exports.ProjectFactoryMock = ProjectFactoryMock;
//# sourceMappingURL=project-factory.mock.js.map