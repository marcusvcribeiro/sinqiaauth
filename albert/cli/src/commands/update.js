import colors from 'colors';
import util from 'util';
import { getPackageUrl } from '../services/packages';

// eslint-disable-next-line no-undef
const exec = util.promisify(require('child_process').exec);

const libs = ['layout', 'ui', 'styles'];

const MESSAGES = {
  UPDATE: 'Atualizando',
  SUCCESS: 'Atualizado com sucesso!',
  ERROR: 'Ops ocorreu algum problema ao atualizar!',
};

export default function update(lib, version) {
  if (libs.includes(lib)) {
    downloadAndUpdateLib(lib, version);
  }

  if (!lib) {
    libs.forEach((lib) => downloadAndUpdateLib(lib));
  }
}

async function downloadAndUpdateLib(lib) {
  const url = await getPackageUrl(lib);
  console.log(colors.blue(`${MESSAGES.UPDATE} @albert/${lib}`));

  try {
    await exec(`npm update ${url}`);
    console.log(colors.green(`@albert/${lib} ${MESSAGES.SUCCESS}`));
  } catch (error) {
    console.error(colors.red(MESSAGES.ERROR));
  }
}
