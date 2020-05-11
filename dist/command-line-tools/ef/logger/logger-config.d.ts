import { LOGGER_LEVEL } from './logger-level';
export interface LoggerConfig {
    prefix: {
        common: string;
        log: string;
        warn: string;
        error: string;
        [key: string]: string;
    };
    level: LOGGER_LEVEL;
    color: {
        prefix: string;
        log: string;
        warn: string;
        error: string;
        [key: string]: string;
    };
    colorEnabled: boolean;
}
