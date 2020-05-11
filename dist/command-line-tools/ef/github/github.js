"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
var GitHub = /** @class */ (function () {
    function GitHub(token, config, shell, packageJson) {
        this._config = config;
        this._token = token;
        this._shell = shell;
        this._packageJson = packageJson;
        this._updateReleaseFolderCommands = this._config.updateReleaseFolder.commands;
        this._gitConfigCommands = this._config.config.commands;
        this._releaseCommands = this._config.release.commands;
        this._pushCommands = this._config.push.commands;
    }
    GitHub.prototype.updateReleaseFolder = function () {
        var commands = [
            this._excuteCommandFromConfig(this._updateReleaseFolderCommands.remove),
            this._excuteCommandFromConfig(this._updateReleaseFolderCommands.copy)
        ];
        return rxjs_1.concat(commands).pipe(operators_1.concatAll());
    };
    GitHub.prototype.release = function () {
        var version = this._packageJson.version;
        var commands = [
            this._configure(),
            this._excuteCommandFromConfig(this._releaseCommands.generateChanegLog),
            this._excuteCommandFromConfig(this._releaseCommands.add),
            this._excuteCommandFromConfig(this._releaseCommands.commit, { version: version }),
            this._excuteCommandFromConfig(this._releaseCommands.push),
            this._excuteCommandFromConfig(this._releaseCommands.tag, { version: version }),
            this._excuteCommandFromConfig(this._releaseCommands.generateRelease, { token: this._token })
        ];
        return rxjs_1.concat(commands).pipe(operators_1.concatAll());
    };
    GitHub.prototype.push = function () {
        var version = this._packageJson.version;
        var commands = [
            this._excuteCommandFromConfig(this._pushCommands.add),
            this._excuteCommandFromConfig(this._pushCommands.commit, { version: version }),
            this._excuteCommandFromConfig(this._pushCommands.push),
        ];
        return rxjs_1.concat(commands).pipe(operators_1.concatAll());
    };
    GitHub.prototype._excuteCommandFromConfig = function (commandConfig, interpolationValues) {
        return this._shell.execute(commandConfig, interpolationValues);
    };
    GitHub.prototype._configure = function () {
        var commands = [
            this._excuteCommandFromConfig(this._gitConfigCommands.push),
            this._excuteCommandFromConfig(this._gitConfigCommands.name),
            this._excuteCommandFromConfig(this._gitConfigCommands.email)
        ];
        return rxjs_1.concat(commands).pipe(operators_1.concatAll());
    };
    return GitHub;
}());
exports.GitHub = GitHub;
//# sourceMappingURL=github.js.map