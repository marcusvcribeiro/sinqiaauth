import inquirer from 'inquirer';
import installingOptions from '../packages/options.json';

export async function requestInstallingOption() {
  const { option } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Como gostaria de instalar os pacotes?',
      name: 'option',
      choices: [
        {
          name: 'Instalar todos os pacotes',
          value: 'all',
        },
        {
          name: 'Selecionar os pacotes para instalar',
          value: 'choose',
        },
        {
          name: 'Cancelar',
          value: false,
        },
      ],
    },
  ]);

  return option;
}

export async function requestInstallingPackages() {
  const options = installingOptions;

  const { packages } = await inquirer.prompt([
    {
      type: 'checkbox',
      message: 'Selecione os pacotes que serão instalados.',
      name: 'packages',
      choices: options,
    },
  ]);

  return packages;
}

export async function requestCreateTemplate() {
  const { template } = await inquirer.prompt([
    {
      type: 'list',
      message: 'Qual tipo de template você deseja inicia?',
      name: 'template',
      choices: [
        {
          name: 'Apenas importar os módulos LayoutModule e UiModule',
          value: 'blank',
        },
        {
          name: 'Configurar uma aplicação com os componentes bases de Layout',
          value: 'navigation',
        },
        {
          name: 'Sair',
          value: false,
        },
      ],
    },
  ]);

  return template;
}

export async function requestConfirmCreateTemplate(isTemplate) {
  const { confirm } = await inquirer.prompt([
    {
      type: 'confirm',
      message: 'Você deseja mesmo realizar esta operação (ESTA OPERAÇÃO IRÁ SOBRESCREVER SEUS ARQUIVOS)',
      name: 'confirm',
      when: isTemplate,
    },
  ]);

  return confirm;
}
