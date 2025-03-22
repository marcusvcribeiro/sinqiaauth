import fs from 'fs';
import path from 'path';
import process from 'process';
import colors from 'colors';

import { requestCreateTemplate, requestConfirmCreateTemplate } from '../services/interactions';

import { blank, navigation } from '../templates';

const TypeTemplates = {
  BLANK: 'blank',
  NAVIGATION: 'navigation',
};

const MESSAGES = {
  SUCCESS: 'Template criado com sucesso',
  ERROR: 'Você deve estar na raiz do projeto, para realizar a geração de template',
};

export default async function generate() {
  const templateSelected = await requestCreateTemplate();
  const templateConfirm = await requestConfirmCreateTemplate(templateSelected);

  if (templateConfirm) {
    switch (templateSelected) {
      case TypeTemplates.BLANK:
        generateTemplate(blank);
        break;
      case TypeTemplates.NAVIGATION:
        generateTemplate(navigation);
        break;
    }
  }
}

async function generateTemplate(template) {
  try {
    const appModuleDir = path.resolve(process.cwd(), 'src/app/app.module.ts');
    const appTsDir = path.resolve(process.cwd(), 'src/app/app.component.ts');
    const appHtmlDir = path.resolve(process.cwd(), 'src/app/app.component.html');

    fs.writeFileSync(appModuleDir, template.module);
    fs.writeFileSync(appHtmlDir, template.html);

    if (template.ts) {
      fs.writeFileSync(appTsDir, template.ts);
    }

    console.log(colors.green(MESSAGES.SUCCESS));
  } catch (error) {
    console.error(colors.error(MESSAGES.ERROR));
  }
}
