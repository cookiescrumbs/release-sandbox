import s3 = require('@aws-cdk/aws-s3');
import { AWSService } from '../service/index';
export declare type S3Bucket = s3.Bucket;
export declare class S3 extends AWSService {
    createBucketForURL(url: string): S3Bucket;
    getBucketByName(name: string): S3Bucket;
}
