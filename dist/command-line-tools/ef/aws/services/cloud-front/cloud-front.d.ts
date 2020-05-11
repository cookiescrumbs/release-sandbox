import * as cloudfront from '@aws-cdk/aws-cloudfront';
import { AWSService } from '../service/index';
import { S3Bucket } from '../s3/index';
export declare type CloudFrontWebDistribution = cloudfront.CloudFrontWebDistribution;
export declare class CloudFront extends AWSService {
    createWebDistribution(url: string, domain: string, bucket: S3Bucket, originPath: string, certificateArn: string): CloudFrontWebDistribution;
}
