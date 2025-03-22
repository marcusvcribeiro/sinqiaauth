import axios from 'axios';
import optionPackages from '../packages/options.json';
import util from 'util';

// eslint-disable-next-line no-undef
const exec = util.promisify(require('child_process').exec);

const BASE_URL = 'https://nexus.sinqia.com.br/repository/npm-repo/@albert';

const ENDPOINTS = {
  layout: `${BASE_URL}/styles`,
  ui: `${BASE_URL}/ui`,
  styles: `${BASE_URL}/layout`,
};

export async function installAllPackages() {
  await installDefaultPackages();

  const packages = optionPackages.map((lib) => lib.value);

  await installChosenPackages(packages);
}

export async function installChosenPackages(packages) {
  packages.forEach(async function (lib) {
    console.log(`Instalando ${lib}`);
    await exec(`npm install ${lib}`);
  });
}

export async function installDefaultPackages() {
  const layoutTgzUrl = await getPackageUrl('layout');
  const uiTgzUrl = await getPackageUrl('ui');
  const stylesTgzUrl = await getPackageUrl('styles');

  console.log('Instalando @albert/styles');
  await exec(`npm install ${stylesTgzUrl}`);

  console.log('Instalando @albert/layout');
  await exec(`npm install ${layoutTgzUrl}`);

  console.log('Instalando @albert/ui');
  await exec(`npm install ${uiTgzUrl}`);

  console.log('Instalando @angular/cdk');
  await exec(`npm install @angular/cdk`);

  console.log('Instalando date-fns');
  await exec(`npm install date-fns`);

  console.log('Instalando imask');
  await exec(`npm install imask`);

  console.log('Instalando angular-imask');
  await exec(`npm install angular-imask`);
}

export async function getPackageUrl(project) {
  /**
   * TODO: Quando haver uma versão dev, é necessário realizar uma condicional para verificar a
   * versão RELEASE ou DEV
   */
  try {
    const endpoint = ENDPOINTS[project];
    const response = await axios.get(endpoint);
    const version = getLatestVersion(response.data);
    const packageUrl = getTgzUrl(project, endpoint, version);

    return packageUrl;
  } catch (error) {
    console.error(error);
  }
}

function getTgzUrl(project, endpoint, version) {
  return `${endpoint}/-/${project}-${version}.tgz`;
}

function getLatestVersion(json) {
  return json['dist-tags'].latest;
}
