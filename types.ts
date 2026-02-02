
export enum AppScreen {
  WELCOME = 'WELCOME',
  QUESTION = 'QUESTION',
  RESULT = 'RESULT'
}

export interface Question {
  id: number;
  text: string;
}

export enum DiagnosticResult {
  APARENTEMENTE_SEGURO = 'APARENTEMENTE_SEGURO',
  NAO_ESTA_SEGURO = 'NAO_ESTA_SEGURO'
}
