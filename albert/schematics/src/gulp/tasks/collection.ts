import { src, task, dest } from 'gulp';

/**
 * Cleans the build output assets from the src folders
 */
function collection() {
  return src('src/collection.json').pipe(dest('dist'));
}

task('collection:src', collection);