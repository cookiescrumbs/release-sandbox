import s3deploy = require('@aws-cdk/aws-s3-deployment');
import { AWSService } from '../service/index';
import { S3Bucket } from '../s3/index';
import { CloudFrontWebDistribution } from '../cloud-front/index';
export declare type S3Deployment = s3deploy.BucketDeployment;
export declare class Deployment extends AWSService {
    deployAssetsToS3(assetsDirPath: string, bucket: S3Bucket, bucketPath: string, distribution: CloudFrontWebDistribution): s3deploy.BucketDeployment;
}
