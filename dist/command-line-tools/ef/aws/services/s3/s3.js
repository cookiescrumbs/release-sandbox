"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var cdk = require("@aws-cdk/core");
var s3 = require("@aws-cdk/aws-s3");
var index_1 = require("../service/index");
var S3 = /** @class */ (function (_super) {
    tslib_1.__extends(S3, _super);
    function S3() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    S3.prototype.createBucketForURL = function (url) {
        this._log("S3.createBucketForURL [" + url + "]");
        var bucket = new s3.Bucket(this._stack, url, {
            bucketName: url,
            websiteIndexDocument: 'index.html',
            websiteErrorDocument: 'error.html',
            publicReadAccess: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY
        });
        this._output('Bucket', url);
        return bucket;
    };
    S3.prototype.getBucketByName = function (name) {
        return s3.Bucket.fromBucketName(this._stack, 'S3Bucket', name);
    };
    return S3;
}(index_1.AWSService));
exports.S3 = S3;
//# sourceMappingURL=s3.js.map