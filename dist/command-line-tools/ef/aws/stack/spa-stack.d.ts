import cdk = require('@aws-cdk/core');
/******************************************************
 *
 * SPAStack: Single Page Application Stack
 *
 ******************************************************/
export interface SPAStackConfig {
    name: string;
    aws: {
        account: string;
        region: string;
    };
    bucket: {
        name: string;
        path: string;
    };
    ssl: {
        certificateArn: string;
    };
    dns: {
        domain: string;
        subdomain: string;
    };
    asset: {
        path: string;
    };
}
export declare class SPAStack {
    private _config;
    private _stack;
    private _route53;
    private _s3;
    private _certificateManager;
    private _cloudFront;
    private _deployment;
    constructor(app: cdk.App, config: any);
    deploy(): void;
}
