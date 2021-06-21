import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import diff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('test recursion compare json extname', () => {
  const string = fs.readFileSync(getFixturePath('stylishFormat'), 'utf8');
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const result = diff(file1, file2);
  expect(result).toEqual(string);
});

test('test recursion compare yaml extname', () => {
  const string = fs.readFileSync(getFixturePath('stylishFormat'), 'utf8');
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yaml');
  const result = diff(file1, file2);
  expect(result).toEqual(string);
});

test('test plain format', () => {
  const string = fs.readFileSync(getFixturePath('plainFormat'), 'utf8');
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const result = diff(file1, file2, 'plain');
  expect(result).toEqual(string);
});

test('test json format', () => {
  const string = fs.readFileSync(getFixturePath('jsonFormat'), 'utf8');
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const result = diff(file1, file2, 'json');
  expect(result).toEqual(string);
});
