#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import diff from '../index.js';
import parse from '../src/parser.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.2', '-v, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish');

program.action((filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const result = diff(data1, data2, program.opts().format);
  console.log(result);
});

program.parse(process.argv);
