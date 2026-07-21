export class Logger {
    constructor(private readonly scope: string = 'playwright') {}

    info(message: string, details?: unknown) {
        console.log(`[${this.scope}] INFO ${new Date().toLocaleTimeString()} - ${message}`, details ?? '');
    }

    success(message: string, details?: unknown) {
        console.log(`[${this.scope}] PASS ${new Date().toLocaleTimeString()} - ${message}`, details ?? '');
    }

    error(message: string, details?: unknown) {
        console.log(`[${this.scope}] FAIL ${new Date().toLocaleTimeString()} - ${message}`, details ?? '');
    }

}