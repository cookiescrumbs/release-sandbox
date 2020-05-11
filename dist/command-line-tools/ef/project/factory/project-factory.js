"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var library_1 = require("../library/library");
var application_1 = require("../application/application");
var command_line_tool_1 = require("../command-line-tool/command-line-tool");
var ProjectFactory = /** @class */ (function () {
    function ProjectFactory(interpolator, logger) {
        this._constructorMap = {
            'applications': function (config, logger, interpolator) { return new application_1.Application(config, logger, interpolator); },
            'libraries': function (config, logger, interpolator) { return new library_1.Library(config, logger, interpolator); },
            'command-line-tools': function (config, logger, interpolator) { return new command_line_tool_1.CommandLineTool(config, logger, interpolator); },
            'default': function () { return undefined; }
        };
        this._interpolator = interpolator;
        this._logger = logger;
    }
    ProjectFactory.prototype.create = function (config) {
        var constructor = this._constructorMap[config.group] || this._constructorMap.default;
        return constructor(config, this._logger, this._interpolator);
    };
    return ProjectFactory;
}());
exports.ProjectFactory = ProjectFactory;
//# sourceMappingURL=project-factory.js.map