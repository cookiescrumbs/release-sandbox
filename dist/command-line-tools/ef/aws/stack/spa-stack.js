"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cdk = require("@aws-cdk/core");
var index_1 = require("../services/index");
var SPAStack = /** @class */ (function () {
    function SPAStack(app, config) {
        this._config = config;
        this._stack = new cdk.Stack(app, this._config.name, { env: this._config.aws });
        this._route53 = new index_1.Route53(this._stack);
        this._s3 = new index_1.S3(this._stack);
        this._certificateManager = new index_1.CertificateManager(this._stack);
        this._cloudFront = new index_1.CloudFront(this._stack);
        this._deployment = new index_1.Deployment(this._stack);
    }
    SPAStack.prototype.deploy = function () {
        var dns = this._config.dns;
        var domain = dns.domain;
        var url = dns.subdomain + "." + dns.domain;
        var assetPath = this._config.asset.path;
        var bucketConfig = this._config.bucket;
        var zone = this._route53
            .fetchHostedZoneByDomain(domain);
        var bucket = this._s3
            .getBucketByName(bucketConfig.name);
        var certificateArn = this._config.ssl.certificateArn
            || this._certificateManager.createDnsValidatedCertificate(domain, zone).certificateArn;
        var distribution = this._cloudFront
            .createWebDistribution(url, domain, bucket, bucketConfig.path, this._config.ssl.certificateArn);
        var route53Record = this._route53
            .createRecordForDistribution(url, distribution, zone);
        var deployment = this._deployment
            .deployAssetsToS3(assetPath, bucket, bucketConfig.path, distribution);
    };
    return SPAStack;
}());
exports.SPAStack = SPAStack;
//# sourceMappingURL=spa-stack.js.map