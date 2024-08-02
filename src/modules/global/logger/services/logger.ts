import winston from 'winston';
import {options} from '../config';

const logConfigBusiness = {
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'DD/MM/YYYY HH:mm:ss',
        }),
        winston.format.errors({stack: true}),
        winston.format.json(),
        winston.format.align(),
    ),
    transports: [new winston.transports.File(options.file_business)],
};

const logConfigAccess = {
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'DD/MM/YYYY HH:mm:ss',
        }),
        winston.format.errors({stack: true}),
        winston.format.json(),
        winston.format.align(),
    ),
    transports: [new winston.transports.File(options.file_access)],
};

const logConfigError = {
    format: winston.format.combine(
        winston.format.timestamp({
            format: 'DD/MM/YYYY HH:mm:ss',
        }),
        winston.format.errors({stack: true}),
        winston.format.json(),
        winston.format.align(),
    ),
    transports: [new winston.transports.File(options.file_error)],
};

const business = winston.createLogger(logConfigBusiness);
const access = winston.createLogger(logConfigAccess);
const errors = winston.createLogger(logConfigError);

business.add(new winston.transports.Console(options.console));
access.add(new winston.transports.Console(options.console));
errors.add(new winston.transports.Console(options.console));

export {access, business, errors};
