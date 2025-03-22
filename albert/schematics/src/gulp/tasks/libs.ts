import { src, task, dest } from 'gulp';

/**
 * Cleans the build output assets from the src folders
 */
function lib() {
  return src('src/lib/**/{files,workspace}/**/**').pipe(dest('dist/lib'));
}

task('lib:src', lib);

function libig() {
  return src('src/lib/**/{files,workspace}/**/.!(gitignore)').pipe(dest('dist/lib'));
}

task('libig:src', libig);

function pack() {
  return src('package.json').pipe(dest('dist/'));
}

task('pack:src', pack);

// Copia todos os arquivos para angular/dist/schematics
function copyalltorootdist() {
  return src('dist/**/**').pipe(dest('../../dist/schematics'));
}

task('copy:src', copyalltorootdist);



