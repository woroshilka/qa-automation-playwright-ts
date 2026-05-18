import { ENV } from "./env";

enum LogLevel {
  ERROR = "ERROR",
  WARN = "WARN",
  INFO = "INFO",
  DEBUG = "DEBUG",
}

class Logger {
  private static shouldLog(level: LogLevel): boolean {
    const levels: Record<string, number> = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3,
    };
    const currentLevel = levels[ENV.LOG_LEVEL] || 2;
    return levels[level.toLowerCase()] <= currentLevel;
  }

  private static formatMessage(level: LogLevel, message: string): string {
    return `[${new Date().toISOString()}] [${level}] ${message}`;
  }

  static error(message: string) {
    if (this.shouldLog(LogLevel.ERROR)) {
      console.error(this.formatMessage(LogLevel.ERROR, message));
    }
  }

  static warn(message: string) {
    if (this.shouldLog(LogLevel.WARN)) {
      console.warn(this.formatMessage(LogLevel.WARN, message));
    }
  }

  static info(message: string) {
    if (this.shouldLog(LogLevel.INFO)) {
      console.log(this.formatMessage(LogLevel.INFO, message));
    }
  }

  static debug(message: string) {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.log(this.formatMessage(LogLevel.DEBUG, message));
    }
  }
}

export default Logger;
