import { src, task, dest } from 'gulp';

/**
 * Cleans the build output assets from the src folders
 */
function schema() {
  return src('src/lib/**/schema.json').pipe(dest('dist/lib'));
}

task('schema:src', schema);