import { test, expect } from '@jest/globals';
import path from 'path';
import { fileURLToPath } from 'url';
import diff from '../src/genDiff.js';
import parse from '../src/parser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('diff', () => {
  const string = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const data1 = parse(file1);
  const data2 = parse(file2);
  const result = diff(data1, data2);
  expect(result).toEqual(string);
});

test('test yaml format', () => {
  const string = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  const file1 = getFixturePath('file1.yaml');
  const file2 = getFixturePath('file2.yml');
  const data1 = parse(file1);
  const data2 = parse(file2);
  const result = diff(data1, data2);
  expect(result).toEqual(string);
});

test('test recursion compare json formate', () => {
  const string = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  const file1 = getFixturePath('fileTree1.json');
  const file2 = getFixturePath('fileTree2.json');
  const data1 = parse(file1);
  const data2 = parse(file2);
  const result = diff(data1, data2);
  expect(result).toEqual(string);
});

test('test recursion compare yaml formate', () => {
  const string = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;
  const file1 = getFixturePath('fileTree1.yaml');
  const file2 = getFixturePath('fileTree2.yaml');
  const data1 = parse(file1);
  const data2 = parse(file2);
  const result = diff(data1, data2);
  expect(result).toEqual(string);
});

test('test plain format', () => {
  const string = `Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]`;
  const file1 = getFixturePath('fileTree1.json');
  const file2 = getFixturePath('fileTree2.json');
  const data1 = parse(file1);
  const data2 = parse(file2);
  const result = diff(data1, data2, 'plain');
  expect(result).toEqual(string);
});

test('test json format', () => {
  const string = `[
  {
    "key": "common",
    "value": [
      {
        "key": "follow",
        "value": false,
        "type": "added"
      },
      {
        "key": "setting1",
        "value": "Value 1",
        "type": "unchanged"
      },
      {
        "key": "setting2",
        "value": 200,
        "type": "deleted"
      },
      {
        "key": "setting3",
        "oldValue": true,
        "newValue": null,
        "type": "modified"
      },
      {
        "key": "setting4",
        "value": "blah blah",
        "type": "added"
      },
      {
        "key": "setting5",
        "value": {
          "key5": "value5"
        },
        "type": "added"
      },
      {
        "key": "setting6",
        "value": [
          {
            "key": "doge",
            "value": [
              {
                "key": "wow",
                "oldValue": "",
                "newValue": "so much",
                "type": "modified"
              }
            ],
            "type": "unchanged"
          },
          {
            "key": "key",
            "value": "value",
            "type": "unchanged"
          },
          {
            "key": "ops",
            "value": "vops",
            "type": "added"
          }
        ],
        "type": "unchanged"
      }
    ],
    "type": "unchanged"
  },
  {
    "key": "group1",
    "value": [
      {
        "key": "baz",
        "oldValue": "bas",
        "newValue": "bars",
        "type": "modified"
      },
      {
        "key": "foo",
        "value": "bar",
        "type": "unchanged"
      },
      {
        "key": "nest",
        "oldValue": {
          "key": "value"
        },
        "newValue": "str",
        "type": "modified"
      }
    ],
    "type": "unchanged"
  },
  {
    "key": "group2",
    "value": {
      "abc": 12345,
      "deep": {
        "id": 45
      }
    },
    "type": "deleted"
  },
  {
    "key": "group3",
    "value": {
      "deep": {
        "id": {
          "number": 45
        }
      },
      "fee": 100500
    },
    "type": "added"
  }
]`;
  const file1 = getFixturePath('fileTree1.json');
  const file2 = getFixturePath('fileTree2.json');
  const data1 = parse(file1);
  const data2 = parse(file2);
  const result = diff(data1, data2, 'json');
  expect(result).toEqual(string);
});