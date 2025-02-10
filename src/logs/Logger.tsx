import { datadogLogs } from "@datadog/browser-logs";

// Logger class to be used for logging (so we can change Datadog in the future without changing the whole codebase)
export class Logger {
  constructor() {}

  // Some format of props that we agree to
  sendLog(message: string, context?: object, error?: Error) {
    datadogLogs.logger.log(message, context, undefined, error);
  }
}
