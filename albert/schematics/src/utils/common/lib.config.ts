import { NodeDependencyType } from '@schematics/angular/utility/dependencies';

const packageJson = require('../../package.json');

import { NodeDependencyMoreOpt } from './nodedependencymoreopt';

// promptask = Devem ser instalados com base em pergunta no Prompt
// module = Nome do múdulo a ser importado no app.module.ts
// onlyinmodule = caso TRUE não pode ser adicionado ao Package.json

export enum LIBRARIES {
    AUTH = '@albert/authentication',
    LAYOUT = '@albert/layout',
    SCHEMATICS = '@albert/schematics',
    STYLES = '@albert/styles',
    UI = '@albert/ui',
    CDK = '@angular/cdk',
    DATEFNS = 'date-fns',
    IMASK = 'imask',
    NGIMASK = 'angular-imask',
    BMA = '@angular/platform-browser/animations',
    PRIMENG = 'primeng',
    PRIMEICONS = 'primeicons',
    NGSELECT = '@ng-select/ng-select',
    NODEFETCH = 'node-fetch',
    PLURALIZETYPES = '@types/pluralize',
    PLURALIZE = 'pluralize',
    DYNAMICLOADER = '@albert/dynamic-loader',
}

export const LIB_CONFIG: NodeDependencyMoreOpt[] = [
    {
        type: NodeDependencyType.Default,
        name: LIBRARIES.UI,
        version: 'https://nexus.sinqia.io/js/repository/npm-group/@albert/ui/-/ui-1.1.0-alpha.18.tgz',
        overwrite: true,
        module: 'Ui'
    },
    {
        type: NodeDependencyType.Default,
        name: LIBRARIES.STYLES,
        version: 'https://nexus.sinqia.io/js/repository/npm-group/@albert/styles/-/styles-1.1.0-alpha.18.tgz',
        overwrite: true,
    },
    {
        type: NodeDependencyType.Default,
        name: LIBRARIES.LAYOUT,
        version: 'https://nexus.sinqia.io/js/repository/npm-group/@albert/layout/-/layout-1.1.0-alpha.18.tgz',
        overwrite: true,
        module: 'Layout'
    },
    {
        type: NodeDependencyType.Default,
        name: LIBRARIES.DYNAMICLOADER,
        version: 'https://nexus.sinqia.io/js/repository/npm-group/@albert/dynamic-loader/-/dynamic-loader-1.1.0-alpha.9.tgz',
        overwrite: true,
    },
    {
        type: NodeDependencyType.Default,
        name: LIBRARIES.CDK,
        version: '^9.0.0',
        overwrite: true
    },
    {
        type: NodeDependencyType.Dev,
        name: LIBRARIES.DATEFNS,
        version: '',
        overwrite: true
    },
    {
        type: NodeDependencyType.Dev,
        name: LIBRARIES.IMASK,
        version: '',
        overwrite: true
    },
    {
        type: NodeDependencyType.Dev,
        name: LIBRARIES.NGIMASK,
        version: '',
        overwrite: true
    },
    {
        type: NodeDependencyType.Default,
        name: LIBRARIES.PRIMENG,
        version: '',
        overwrite: true,
        promptask: true,
    },
    {
        type: NodeDependencyType.Default,
        name: LIBRARIES.PRIMEICONS,
        version: '',
        overwrite: true,
        promptask: true,
    },
    {
        type: NodeDependencyType.Default,
        name: LIBRARIES.NGSELECT,
        version: '',
        overwrite: true,
        promptask: true,
    },
    {
        type: NodeDependencyType.Dev,
        name: LIBRARIES.NODEFETCH,
        version: '',
        overwrite: true,
        promptask: true,
    },
    {
        type: NodeDependencyType.Dev,
        name: LIBRARIES.PLURALIZETYPES,
        version: '',
        overwrite: true,
        promptask: true,
    },
    {
        type: NodeDependencyType.Dev,
        name: LIBRARIES.PLURALIZE,
        version: '',
        overwrite: true,
        promptask: true,
    },
    {
        type: NodeDependencyType.Dev,
        name: LIBRARIES.BMA,
        version: '',
        overwrite: true,
        module: 'BrowserAnimations',
        onlyinmodule: true
    }
];
