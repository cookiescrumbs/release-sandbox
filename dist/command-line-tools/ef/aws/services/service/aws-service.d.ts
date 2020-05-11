import cdk = require('@aws-cdk/core');
export declare abstract class AWSService {
    protected _stack: cdk.Stack;
    constructor(stack: cdk.Stack);
    protected _output(id: string, value: any): void;
    protected _log(message: string): void;
}
