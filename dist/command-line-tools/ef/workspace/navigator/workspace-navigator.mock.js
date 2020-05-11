"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WorkspaceNavigatorMock = /** @class */ (function () {
    function WorkspaceNavigatorMock() {
        this.projects = {
            libraries: ['lib1', 'lib2'],
            applications: ['app1', 'app2'],
            'command-line-tools': ['cli1', 'cli2']
        };
        this.localConfig = {
            projects: {
                libraries: {},
                applications: {},
                'command-line-tools': {}
            },
            paths: {
                dist: './dist',
                release: './release'
            }
        };
    }
    WorkspaceNavigatorMock.prototype.getProjectsInFolder = function (folder) {
        return this.projects[folder];
    };
    return WorkspaceNavigatorMock;
}());
exports.WorkspaceNavigatorMock = WorkspaceNavigatorMock;
//# sourceMappingURL=workspace-navigator.mock.js.map