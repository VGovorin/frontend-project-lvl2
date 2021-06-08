#!/usr/bin/env node
import { Command } from 'commander/esm.mjs';
import diff from '../index.js';

const program = new Command();

program
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.2', '-v, --version', 'output the version number')
  .helpOption('-h, --help', 'output usage information')
  .option('-f, --format [type]', 'output format');

program.action((filepath1, filepath2) => {
  console.log(diff(filepath1, filepath2));
});

program.parse(process.argv);
