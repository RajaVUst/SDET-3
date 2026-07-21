export function logInfo(message: string) {
  if (process.env.LOG_LEVEL === 'info') {
    // eslint-disable-next-line no-console
    console.info(`[INFO] ${message}`);
  }
}

export function logDebug(message: string) {
  if (process.env.LOG_LEVEL === 'debug') {
    // eslint-disable-next-line no-console
    console.debug(`[DEBUG] ${message}`);
  }
}
