"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs = tslib_1.__importStar(require("fs"));
var index_1 = require("../semantic-versioning/index");
var PackageJson = /** @class */ (function () {
    function PackageJson(config, fileReader, logger) {
        this._config = config;
        this._logger = logger;
        this._fileReader = fileReader;
        this._content = fileReader.readJSONFromPath(this._config.path);
    }
    Object.defineProperty(PackageJson.prototype, "name", {
        get: function () {
            return this._content.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackageJson.prototype, "peerDependencies", {
        get: function () {
            return this._content.peerDependencies;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(PackageJson.prototype, "version", {
        get: function () {
            return this._content.version;
        },
        enumerable: true,
        configurable: true
    });
    PackageJson.prototype.bump = function (versionType) {
        var _a;
        var _this = this;
        if (versionType === void 0) { versionType = index_1.SEMANTIC_VERSION_TYPE.PATCH; }
        var version = this._content.version.split('.').map(function (n) { return parseInt(n, 10); });
        var semver = (_a = {},
            _a[index_1.SEMANTIC_VERSION_TYPE.MAJOR] = version[0],
            _a[index_1.SEMANTIC_VERSION_TYPE.MINOR] = version[1],
            _a[index_1.SEMANTIC_VERSION_TYPE.PATCH] = version[2],
            _a);
        semver[versionType] = semver[versionType] + 1;
        this._content.version = [
            semver[index_1.SEMANTIC_VERSION_TYPE.MAJOR],
            semver[index_1.SEMANTIC_VERSION_TYPE.MINOR],
            semver[index_1.SEMANTIC_VERSION_TYPE.PATCH]
        ].join('.');
        fs.writeFile(this._config.path, this.toString(), function (error) {
            if (error) {
                _this._logger.error(error);
            }
        });
    };
    PackageJson.prototype.toString = function () {
        return JSON.stringify(this._content, null, 4);
    };
    return PackageJson;
}());
exports.PackageJson = PackageJson;
//# sourceMappingURL=package-json.js.map