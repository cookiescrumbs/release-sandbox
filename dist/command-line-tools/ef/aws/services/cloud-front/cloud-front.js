"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var cloudfront = tslib_1.__importStar(require("@aws-cdk/aws-cloudfront"));
var index_1 = require("../service/index");
var CloudFront = /** @class */ (function (_super) {
    tslib_1.__extends(CloudFront, _super);
    function CloudFront() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CloudFront.prototype.createWebDistribution = function (url, domain, bucket, originPath, certificateArn) {
        this._log("CloudFront.createWebDistribution [" + domain + "]");
        var distribution = new cloudfront.CloudFrontWebDistribution(this._stack, "web_distribution::" + url, {
            aliasConfiguration: {
                acmCertRef: certificateArn,
                names: [url],
                sslMethod: cloudfront.SSLMethod.SNI,
                securityPolicy: cloudfront.SecurityPolicyProtocol.TLS_V1_1_2016,
            },
            defaultRootObject: 'index.html',
            viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
            originConfigs: [{
                    s3OriginSource: { s3BucketSource: bucket },
                    originPath: "/" + originPath,
                    behaviors: [
                        { isDefaultBehavior: true },
                        {
                            pathPattern: 'index.html',
                            allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD_OPTIONS,
                        }
                    ],
                }],
            errorConfigurations: [{
                    errorCode: 403,
                    errorCachingMinTtl: 0,
                    responseCode: 200,
                    responsePagePath: '/index.html'
                }, {
                    errorCode: 404,
                    errorCachingMinTtl: 0,
                    responseCode: 200,
                    responsePagePath: '/index.html'
                }]
        });
        this._output('web_distribution_id', distribution.distributionId);
        return distribution;
    };
    return CloudFront;
}(index_1.AWSService));
exports.CloudFront = CloudFront;
//# sourceMappingURL=cloud-front.js.map