"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ng_class_type_1 = require("../ng-class-type");
var ng_class_1 = require("../ng-class");
var ts_morph_1 = require("ts-morph");
var NgModuleClass = /** @class */ (function (_super) {
    tslib_1.__extends(NgModuleClass, _super);
    function NgModuleClass(tsClass) {
        var _this = _super.call(this, tsClass) || this;
        _this.type = ng_class_type_1.NG_CLASS_TYPE.MODULE;
        _this.imports = [];
        _this.moduleDefinition = {
            imports: [],
            exports: [],
            declarations: [],
            providers: [],
            entryComponents: []
        };
        _this._propertybuilderMap = {
            imports: function (p) { return _this._buildDecoratorPropertyDescription(p); },
            exports: function (p) { return _this._buildDecoratorPropertyDescription(p); },
            declarations: function (p) { return _this._buildDecoratorPropertyDescription(p); },
            entryComponents: function (p) { return _this._buildDecoratorPropertyDescription(p); },
            default: function (p) { return []; }
        };
        _this._buildModuleDefinition();
        return _this;
    }
    NgModuleClass.prototype._buildModuleDefinition = function () {
        var _this = this;
        var moduleDecorator = this._tsClass.decorators.filter(function (decorator) { return decorator.getName() === 'NgModule'; })[0];
        var moduleDefinition = moduleDecorator.getArguments()[0];
        moduleDefinition.getProperties().forEach(function (p) {
            var name = p.getName();
            _this.moduleDefinition[name] = _this._getPropertyBuilder(p)(p);
        });
    };
    NgModuleClass.prototype._buildDecoratorPropertyDescription = function (p) {
        var expression = p.getInitializer();
        var output;
        if (expression instanceof ts_morph_1.ArrayLiteralExpression) {
            output = this._buildIdentifierList(expression);
        }
        else if (expression instanceof ts_morph_1.Identifier) {
            output = this._buildIdentifierListByIdentifier(expression);
        }
        return output;
    };
    NgModuleClass.prototype._getPropertyBuilder = function (p) {
        var name = p.getName();
        return this._propertybuilderMap[name] || this._propertybuilderMap.default;
    };
    NgModuleClass.prototype._buildIdentifierList = function (expression) {
        return expression.getElements().map(function (mod) { return mod.getText(); });
    };
    NgModuleClass.prototype._buildIdentifierListByIdentifier = function (identifier) {
        var references = identifier.findReferences();
        var definition = references[0].getDefinition();
        var node = definition.getDeclarationNode();
        var initializer = node.getInitializer();
        return this._buildIdentifierList(initializer);
    };
    return NgModuleClass;
}(ng_class_1.NgClass));
exports.NgModuleClass = NgModuleClass;
//# sourceMappingURL=ng-module-class.js.map