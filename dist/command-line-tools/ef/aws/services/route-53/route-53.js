"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var route53 = require("@aws-cdk/aws-route53");
var targets = require("@aws-cdk/aws-route53-targets/lib");
var index_1 = require("../service/index");
var Route53 = /** @class */ (function (_super) {
    tslib_1.__extends(Route53, _super);
    function Route53() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Route53.prototype.fetchHostedZoneByDomain = function (domain) {
        return route53.HostedZone.fromLookup(this._stack, 'Zone', {
            domainName: domain
        });
    };
    Route53.prototype.createRecordForDistribution = function (domain, distribution, zone) {
        this._log("Route53.createRecordForDistribution [" + domain + "]");
        var recordName = domain;
        var target = route53.AddressRecordTarget
            .fromAlias(new targets.CloudFrontTarget(distribution));
        return new route53.ARecord(this._stack, "route53_record::" + domain, { recordName: recordName, target: target, zone: zone });
    };
    return Route53;
}(index_1.AWSService));
exports.Route53 = Route53;
//# sourceMappingURL=route-53.js.map