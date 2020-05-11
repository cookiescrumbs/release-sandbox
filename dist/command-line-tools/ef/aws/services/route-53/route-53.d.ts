import { AWSService } from '../service/index';
import { CloudFrontWebDistribution } from '../cloud-front/index';
export declare type Route53HostedZone = any;
export declare type Route53Record = any;
export declare class Route53 extends AWSService {
    fetchHostedZoneByDomain(domain: string): Route53HostedZone;
    createRecordForDistribution(domain: string, distribution: CloudFrontWebDistribution, zone: Route53HostedZone): Route53Record;
}
