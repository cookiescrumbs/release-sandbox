"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var acm = require("@aws-cdk/aws-certificatemanager");
var index_1 = require("../service/index");
var CertificateManager = /** @class */ (function (_super) {
    tslib_1.__extends(CertificateManager, _super);
    function CertificateManager() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CertificateManager.prototype.createDnsValidatedCertificate = function (domain, zone) {
        var cert = new acm.DnsValidatedCertificate(this._stack, "site_certificate::" + domain, {
            domainName: "*." + domain,
            hostedZone: zone
        });
        this._output('Certificate', cert.certificateArn);
        return cert;
    };
    CertificateManager.prototype.fetchCertByArn = function (arn) {
        var cert = acm.Certificate.fromCertificateArn(this._stack, 'Certificate', arn);
        this._output('Certificate', cert.certificateArn);
        return cert;
    };
    return CertificateManager;
}(index_1.AWSService));
exports.CertificateManager = CertificateManager;
//# sourceMappingURL=certificate-manager.js.map