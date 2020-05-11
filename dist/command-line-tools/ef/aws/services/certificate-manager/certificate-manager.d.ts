import acm = require('@aws-cdk/aws-certificatemanager');
import { AWSService } from '../service/index';
import { Route53HostedZone } from '../route-53/index';
export declare type SSLCertificate = acm.Certificate;
export declare class CertificateManager extends AWSService {
    createDnsValidatedCertificate(domain: string, zone: Route53HostedZone): SSLCertificate;
    fetchCertByArn(arn: string): acm.ICertificate;
}
