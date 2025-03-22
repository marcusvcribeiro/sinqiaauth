import fs from 'fs';
import { requestInstallingOption, requestInstallingPackages } from '../services/interactions';
import { installDefaultPackages, installChosenPackages, installAllPackages } from '../services/packages';

export default async function install() {
  const option = await requestInstallingOption();

  if (!option) return;

  if (option === 'all') {
    await installAllPackages();
  } else {
    const packages = await requestInstallingPackages();

    await installDefaultPackages();
    await installChosenPackages(packages);
  }

  console.log('Atualizando styles do arquivo angular.json');
  await updateAngularJSON();

  return true;
}

async function updateAngularJSON() {
  const angularFileContent = await getAngularJsonFileContent();

  const sinqiaStylesFilePath = './node_modules/@albert/styles/scss/all.scss';

  if (isAngularFileContentUpdated(angularFileContent, sinqiaStylesFilePath)) {
    return;
  }

  const newContent = addStyleInAngularJson(angularFileContent, sinqiaStylesFilePath);

  await updateFile(newContent);
}

async function getAngularJsonFileContent() {
  try {
    const content = JSON.parse(fs.readFileSync('./angular.json', 'utf8'));

    return content;
  } catch (error) {
    console.error(error);
  }
}

function isAngularFileContentUpdated(file, stylesPath) {
  let { options } = file.projects[Object.keys(file.projects)[0]].architect.build;

  if (options.styles && options.styles.includes(stylesPath)) {
    return true;
  }

  return false;
}

function addStyleInAngularJson(angularFileContent, sinqiaStylesFilePath) {
  let { options } = angularFileContent.projects[Object.keys(angularFileContent.projects)[0]].architect.build;

  if (options.styles) {
    options.styles.unshift(sinqiaStylesFilePath);
  } else {
    options.styles = [sinqiaStylesFilePath];
  }

  angularFileContent.projects[Object.keys(angularFileContent.projects)[0]].architect.build.options = options;

  return angularFileContent;
}

async function updateFile(newContent) {
  try {
    const contentAsJson = JSON.stringify(newContent, null, 2);

    fs.writeFileSync('./angular2.json', contentAsJson);

    await fs.unlinkSync('angular.json');

    fs.renameSync('./angular2.json', './angular.json');
  } catch (error) {
    console.error(error);
  }
}
