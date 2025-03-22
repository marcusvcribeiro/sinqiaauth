import program from 'commander';

import install from './commands/install';
import generate from './commands/generate';
import update from './commands/update';

import { version } from '../package.json';

export async function init(args) {
  program.name('Albert CLI').version(version, '=v, --version', 'Exibe a versão da CLI');

  program
    .command('install')
    .alias('i')
    .description('Instala os pacotes necessários para executar uma aplicação alb-angular')
    .action(async () => {
      const isInstall = await install();
      isInstall && (await generate());
    });

  program
    .command('update')
    .alias('u')
    .description('Atualiza versão do @alb')
    .action((commander) => {
      const [lib, version] = commander.parent.args;
      update(lib, version);
    });

  program.command('generate').alias('g').description('Criação de templates').action(generate);

  await program.parseAsync(args);
}
