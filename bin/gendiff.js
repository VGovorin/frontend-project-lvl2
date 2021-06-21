#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import genDiff from '../index.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.2', '-v, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format', 'stylish');

program.action((filepath1, filepath2) => {
  const result = genDiff(filepath1, filepath2, program.opts().format);
  console.log(result);
});

program.parse(process.argv);
