import fs from 'fs';
import path from 'path';
import {
  transformFileSync
} from 'babel-core';
import test from 'ava';
import plugin from '../src';

function trim(str) {
  return str.replace(/^\s+|\s+$/, '');
}

const fixturesDir = path.join(__dirname, 'fixtures');
fs.readdirSync(fixturesDir).map((caseName) => {
  test(`should ${caseName.split('-').join(' ')}`, (t) => {
    const fixtureDir = path.join(fixturesDir, caseName);
    let actualPath = path.join(fixtureDir, 'actual.js');
    const actual = transformFileSync(actualPath).code;

    if (path.sep === '\\') {
      // Specific case of windows, transformFileSync return code with '/'
      actualPath = actualPath.replace(/\\/g, '/');
    }

    const expected = fs.readFileSync(
      path.join(fixtureDir, 'expected.js')
    ).toString().replace(/%FIXTURE_PATH%/g, actualPath);

    t.deepEqual(trim(actual), trim(expected))
  });
});
