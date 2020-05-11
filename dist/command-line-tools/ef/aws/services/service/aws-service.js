"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cdk = require("@aws-cdk/core");
var AWSService = /** @class */ (function () {
    function AWSService(stack) {
        this._stack = stack;
    }
    AWSService.prototype._output = function (id, value) {
        var output = new cdk.CfnOutput(this._stack, id, { value: value });
    };
    AWSService.prototype._log = function (message) {
        // console.log(`${ message }`);
    };
    return AWSService;
}());
exports.AWSService = AWSService;
//# sourceMappingURL=aws-service.js.map