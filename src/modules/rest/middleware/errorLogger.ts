import {log} from '../../global/logger/manager';

const errorLogger = (
    err: Error,
    // req: Request,
    // res: Response,
    // next: NextFunction,
): void => {
    log.errors.error(err);
};

export {errorLogger};
