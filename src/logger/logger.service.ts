import { Logger, ILogObj } from 'tslog';
import { ILogger } from './logger.interfase';

export class LoggerService implements ILogger {
    public logger: Logger<ILogObj>;

    constructor() {
        const isProduction = process.env.NODE_ENV === 'production';
        this.logger = new Logger<ILogObj>({
            name: 'AppLogger',
            type: isProduction ? 'json' : 'pretty', // 'json' для продакшена, 'pretty' для разработки

            hideLogPositionForProduction: isProduction, // Скрываем позицию (путь/строка) в продакшене
            minLevel: isProduction ? 3 : 0, // info (3) в продакшене, trace (0) в разработке
        });

        if (isProduction) {
            this.logger.attachTransport((logObj: ILogObj) => {
                console.log(JSON.stringify(logObj));
            });
        }
    }

    info(...args: unknown[]) {
        this.logger.info(...args);
    }
    warn(...args: unknown[]) {
        this.logger.warn(...args);
    }
    error(message: string, error?: Error, ...args: unknown[]) {
        if (error) {
            this.logger.error(message, error, ...args);
        } else {
            this.logger.error(message, ...args);
        }
    }
}
