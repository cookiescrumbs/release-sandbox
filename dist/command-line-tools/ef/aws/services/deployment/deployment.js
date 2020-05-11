"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var s3deploy = require("@aws-cdk/aws-s3-deployment");
var index_1 = require("../service/index");
var Deployment = /** @class */ (function (_super) {
    tslib_1.__extends(Deployment, _super);
    function Deployment() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Deployment.prototype.deployAssetsToS3 = function (assetsDirPath, bucket, bucketPath, distribution) {
        this._log("Deployment.deployAssetsToS3 [" + assetsDirPath + "]");
        return new s3deploy.BucketDeployment(this._stack, 'DeployWithInvalidation', {
            sources: [s3deploy.Source.asset(assetsDirPath)],
            destinationBucket: bucket,
            destinationKeyPrefix: bucketPath,
            distribution: distribution,
            distributionPaths: ['/*']
        });
    };
    return Deployment;
}(index_1.AWSService));
exports.Deployment = Deployment;
//# sourceMappingURL=deployment.js.map