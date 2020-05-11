export interface LoggerAdapter {
    log: (...args: [any?, ...any[]]) => void;
    warn: (...args: [any?, ...any[]]) => void;
    error: (...args: [any?, ...any[]]) => void;
}
