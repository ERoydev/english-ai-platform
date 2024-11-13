import log, { Logger } from 'loglevel';

// Create a logger instance
const logger: Logger = log.getLogger('appLogger');

// Set the log level based on the environment
logger.setLevel(process.env.NODE_ENV === 'development' ? 'debug' : 'warn');

export default logger;
