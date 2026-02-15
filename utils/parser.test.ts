import { parseFileContent, isValidJson } from './parser';

declare const describe: any;
declare const it: any;
declare const expect: any;

describe('utils/parser', () => {
  describe('isValidJson', () => {
    it('returns true for valid JSON', () => {
      expect(isValidJson('{"foo": "bar"}')).toBe(true);
    });

    it('returns false for invalid JSON', () => {
      expect(isValidJson('{foo: bar}')).toBe(false);
    });
  });

  describe('parseFileContent', () => {
    it('parses valid JSON file content', () => {
      const content = '{"name": "test"}';
      const result = parseFileContent(content, 'test.json');
      // Format should include indentation
      expect(JSON.parse(result)).toEqual({ name: 'test' });
    });

    it('parses valid YAML file content to JSON', () => {
      const content = 'name: test\nversion: 1.0';
      const result = parseFileContent(content, 'test.yaml');
      expect(JSON.parse(result)).toEqual({ name: 'test', version: 1.0 });
    });

    it('throws error for invalid JSON', () => {
      const content = '{ invalid }';
      expect(() => parseFileContent(content, 'test.json')).toThrow('Failed to parse JSON file');
    });

    it('throws error for invalid YAML', () => {
      // Tab characters are not allowed in YAML
      const content = 'name:\n\ttest'; 
      expect(() => parseFileContent(content, 'test.yaml')).toThrow('Failed to parse YAML file');
    });
  });
});