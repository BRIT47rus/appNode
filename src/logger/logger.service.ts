import { Logger, ILogObj } from 'tslog';

export class LoggerService {
    public logger: Logger<ILogObj>;
    static instance: LoggerService;

    constructor() {
        const isProduction = process.env.NODE_ENV === 'production';

        this.logger = new Logger<ILogObj>({
            name: 'AppLogger',
            type: isProduction ? 'json' : 'pretty', // 'json' для продакшена, 'pretty' для разработки

            hideLogPositionForProduction: isProduction, // Скрываем позицию (путь/строка) в продакшене
            minLevel: isProduction ? 3 : 0, // info (3) в продакшене, trace (0) в разработке
        });

        // Добавляем транспорт для продакшн-среды, если необходимо отправлять логи в другие системы
        // Этот транспорт будет использоваться независимо от 'type', но особенно важен для 'json'.
        if (isProduction) {
            this.logger.attachTransport((logObj: ILogObj) => {
                console.log(JSON.stringify(logObj));
            });
        }
    }

    public static getInstance(): LoggerService {
        if (!LoggerService.instance) {
            LoggerService.instance = new LoggerService();
        }
        return LoggerService.instance;
    }

    trace(...args: unknown[]) {
        this.logger.trace(...args);
    }
    debug(...args: unknown[]) {
        this.logger.debug(...args);
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
    fatal(...args: unknown[]) {
        this.logger.fatal(...args);
    }
}
