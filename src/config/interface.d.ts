export type TLogLevel = 'none' | 'error' | 'warning' | 'info';

export interface IConfigOptions {
    networkByte: number;
    logLevel: TLogLevel;
}

export interface IConfig {

    getNetworkByte(): number;

    getLogLevel(): string;

    set(config: Partial<IConfigOptions>): void;

    clear(): void;
}
