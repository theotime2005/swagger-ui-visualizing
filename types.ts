export interface FileContent {
  name: string;
  content: string; // The raw JSON string
  format: 'json' | 'yaml';
}

export interface AppError {
  message: string;
  details?: string;
}
