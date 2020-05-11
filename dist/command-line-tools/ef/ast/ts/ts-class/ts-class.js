"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TsClass = /** @class */ (function () {
    function TsClass(classDeclaration, file) {
        this._class = classDeclaration;
        this._file = file;
        this.name = classDeclaration.getName() || '';
        this.decoratorName = this._getDecoratorName(classDeclaration) || '';
        this.members = this._class.getMembers();
        this.decoratedProperties = this._class.getProperties()
            .filter(function (member) { return member.getDecorators().length > 0; });
        this.structure = this._class.getStructure();
        this.decorators = this._class.getDecorators();
        this.filePath = file.path;
        this.directoryName = file.directoryName;
    }
    TsClass.prototype._getDecoratorName = function (classDeclaration) {
        var decorator = classDeclaration.getDecorators()[0];
        return (!!decorator) ? decorator.getName() : undefined;
    };
    return TsClass;
}());
exports.TsClass = TsClass;
//# sourceMappingURL=ts-class.js.map