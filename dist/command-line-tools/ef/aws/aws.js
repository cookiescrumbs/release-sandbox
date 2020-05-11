#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cdk = require("@aws-cdk/core");
var spa_stack_1 = require("./stack/spa-stack");
var AWS = /** @class */ (function () {
    function AWS() {
        this._app = new cdk.App();
    }
    AWS.prototype.addStack = function (stackConfig) {
        var stack = new spa_stack_1.SPAStack(this._app, stackConfig);
        stack.deploy();
    };
    AWS.prototype.deploy = function () {
        this._app.synth();
    };
    return AWS;
}());
exports.AWS = AWS;
//# sourceMappingURL=aws.js.map