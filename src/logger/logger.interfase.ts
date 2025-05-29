import { Logger, ILogObj } from 'tslog';

export interface ILogger {
	logger: Logger<ILogObj>;
	info(...args: unknown[]): void;
	warn(...args: unknown[]): void;
	error(message: string, error?: Error, ...args: unknown[]): void;
}
