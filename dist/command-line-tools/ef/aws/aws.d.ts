#!/usr/bin/env node
import { SPAStackConfig } from './stack/spa-stack';
export declare class AWS {
    private _app;
    constructor();
    addStack(stackConfig: SPAStackConfig): void;
    deploy(): void;
}
