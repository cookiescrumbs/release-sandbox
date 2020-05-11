import { LoggerConfig } from './logger-config';
import { LoggerAdapter } from './adapter/logger-adapter';
import { LOGGER_LEVEL } from './logger-level';
export declare class Logger {
    private _config;
    private _adapter;
    constructor(config?: LoggerConfig, adapter?: LoggerAdapter);
    log(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    setConfig(config: LoggerConfig): void;
    setLevel(level: LOGGER_LEVEL): void;
    private _adapterOut;
}
