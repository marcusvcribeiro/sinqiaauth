const path = require('path');
const fs = require('fs');
const destinationPath = './src/assets/markdown/';

fromDir('../angular/projects/layout/src/lib', '.md')
fromDir('../angular/projects/ui/src/lib', '.md')
fromDir('../cli', '.md')

function fromDir(startPath, filter){
    if (!fs.existsSync(startPath)){
        return;
    }

    const files = fs.readdirSync(startPath);
    for (let i in files) {
        let filename = path.join(startPath, files[i]);
        filename = filename.replace(/\\/g , '/');
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            fromDir(filename, filter); //recurse
        } else if (filename.indexOf(filter) >= 0) {
            copyFile(filename);
        }
    }
}

function copyFile(sourcePath) {
  const name = getFileName(sourcePath);
  const pasteName = getFilePaste(sourcePath);
  const basePath = destinationPath + pasteName;
  createPaste(basePath);
  fs.copyFile(sourcePath, basePath + '/' + name, (err) => {
    if (err) throw err;
  });
}

function createPaste(basePath) {
  if (!fs.existsSync(basePath)){
    fs.mkdirSync(basePath, (err) => {
      if(err) throw err;
    });
}
}

function getFilePaste(filePath) {
  let pasteName = '';
  const regexp = new RegExp("\/([A-z]|-)*\/([A-z]|-)*\.md");
  const result = regexp.exec(filePath);
  if(result) {
    const paste = result[0].split('/');
    pasteName = paste[1];
  }
  return pasteName
}

function getFileName(filePath) {
  const regexp = new RegExp("([A-z]|-)*\.md");
  const result = regexp.exec(filePath)
  return result ? result[0] : null;
}
