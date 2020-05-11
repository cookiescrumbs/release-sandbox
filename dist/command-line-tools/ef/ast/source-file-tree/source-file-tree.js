"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var directoryTree = require("directory-tree");
var dirTree = directoryTree;
var SourceFileTree = /** @class */ (function () {
    function SourceFileTree(config) {
        var _this = this;
        this._treeFactory = function (node, children) {
            return {
                value: {
                    title: node.name,
                    path: node.path
                },
                children: children
            };
        };
        this._buildTree = function (node) {
            if (node.name === 'index.ts') {
                return;
            }
            var children = (node.children) ?
                node.children
                    .filter(function (child) { return child.name.indexOf('index') < 0 &&
                    child.name.indexOf('.spec.ts') < 0 &&
                    child.name.indexOf('.ng1.') < 0; })
                    .filter(function (child) { return false ||
                    (child.type === 'file') ||
                    (child.type === 'directory'); })
                    .map(function (child) { return _this._buildTree(child); }) :
                undefined;
            return _this._treeFactory(node, children);
        };
        this._treeFactory = config.treeFactory || this._treeFactory;
        this._tree = this._buildTree(dirTree(config.rootPath, {
            extensions: config.extension
        }));
    }
    SourceFileTree.prototype.toJSON = function () {
        return this._tree;
    };
    SourceFileTree.prototype.toString = function () {
        return JSON.stringify(this._tree);
    };
    return SourceFileTree;
}());
exports.SourceFileTree = SourceFileTree;
//# sourceMappingURL=source-file-tree.js.map