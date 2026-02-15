import { load } from 'js-yaml';

export const parseFileContent = (content: string, fileName: string): string => {
  const isYaml = fileName.endsWith('.yaml') || fileName.endsWith('.yml');
  
  if (isYaml) {
    try {
      const obj = load(content);
      return JSON.stringify(obj, null, 2);
    } catch (e) {
      throw new Error(`Failed to parse YAML file: ${(e as Error).message}`);
    }
  }

  // Verify it is valid JSON
  try {
    const obj = JSON.parse(content);
    return JSON.stringify(obj, null, 2);
  } catch (e) {
    throw new Error(`Failed to parse JSON file: ${(e as Error).message}`);
  }
};

export const isValidJson = (content: string): boolean => {
  try {
    JSON.parse(content);
    return true;
  } catch {
    return false;
  }
};