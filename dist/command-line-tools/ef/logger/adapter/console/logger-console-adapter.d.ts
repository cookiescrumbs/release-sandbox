import { LoggerAdapter } from '../logger-adapter';
export declare class LoggerConsoleAdapter implements LoggerAdapter {
    log(...args: any): void;
    warn(...args: any): void;
    error(...args: any): void;
    private _format;
}
