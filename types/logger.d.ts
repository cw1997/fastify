import pino from 'pino'
import { FastifyInstanceGenericInterface } from './utils'

/**
 * Standard Fastify logging function
 */
export type FastifyLogFn = pino.LogFn

export type LogLevel = pino.Level

export type Bindings = pino.Bindings

export type FastifyLoggerInstance = pino.Logger
// TODO make pino export BaseLogger again
// export type FastifyBaseLogger = pino.BaseLogger & {
export type FastifyBaseLogger = pino.Logger & {
  child(bindings: Bindings): FastifyBaseLogger
}

export interface FastifyLoggerStreamDestination {
  write(msg: string): void;
}

export type PinoLoggerOptions = pino.LoggerOptions

/**
 * Fastify Custom Logger options.
 */
export interface FastifyLoggerOptions<Generic extends FastifyInstanceGenericInterface> {
  serializers?: {
    req?: (req: Generic["Request"]) => {
      method?: string;
      url?: string;
      version?: string;
      hostname?: string;
      remoteAddress?: string;
      remotePort?: number;
      [key: string]: unknown;
    };
    err?: (err: any) => {
      type: string;
      message: string;
      stack: string;
      [key: string]: unknown;
    };
    res?: (res: Generic["Request"]) => {
      statusCode: string | number;
      [key: string]: unknown;
    };
  };
  level?: string;
  file?: string;
  genReqId?: (req: Generic["Request"]) => string;
  stream?: FastifyLoggerStreamDestination;
}
