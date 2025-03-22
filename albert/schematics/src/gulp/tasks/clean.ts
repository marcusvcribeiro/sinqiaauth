import { src, task } from 'gulp';
import * as clean from 'gulp-clean';
import { sources } from '../config';

/**
 * Limpa o que o Build gera
 * Os paths usam Globbing Patern
 * Para entender melhor: https://gruntjs.com/configuring-tasks#globbing-patterns
 */

function cleanSrc() {
  const files = sources.map(folder => [
    `${folder}/**/*.js`,
    `${folder}/**/*.d.ts`,
    `${folder}/**/*.js.map`,
    `${folder}/**/*.d.ts.map`,
  ]);

  const reducedFiles = files.reduce((a, b) => a.concat(b), []);
  const ignored = {
    read: false,
    ignore: ['**/files/**/*', '**/*.schema.d.ts', '**/workspace/**/*'],
  };

  return src(reducedFiles, ignored).pipe(clean());
}

task('clean:src', cleanSrc);
