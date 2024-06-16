import * as readlineSync from 'readline-sync';

export function askQuestion(query: string): string {
    return readlineSync.question(query);
}
