import { chain, noop, Rule, SchematicContext, Tree } from '@angular-devkit/schematics';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';
import { addPackageJsonDependency } from '@schematics/angular/utility/dependencies';
import { NodeDependencyMoreOpt } from '../../utils/common/nodedependencymoreopt';
import { LIB_CONFIG, LIBRARIES } from '../../utils/common/lib.config';
import { AlbertPackageSchema } from './ng-add.schema';
import { DeclarationOptions, ModuleDeclarator } from '../../utils';
import { Path } from '@angular-devkit/core';
import * as fs from 'fs';
import * as path from 'path';

export function ngAdd(options: AlbertPackageSchema): Rule {
  return chain([
    finallyLog(),
    addAlbertPackageToPackageJson(options),
    options.schematicsdefault ? setSchematicsAsDefault() : noop(),
    addAlbertStyleRefs(),
    addAllDeclarationsToModule(),
    addAppStructure(),
    options.skipInstall ? noop() : runNpmPackageInstall()
  ]);
}

function addAppStructure() {
  return (tree: Tree, context: SchematicContext) => {

    const contentHTML = fs.readFileSync(path.join(__dirname, '/files/app.component.html'), 'utf8');
    tree.overwrite( '/src/app/app.component.html', contentHTML );

    const contentTS = fs.readFileSync(path.join(__dirname, '/files/app.component.ts'), 'utf8');
    tree.overwrite( '/src/app/app.component.ts', contentTS );

    return tree;
  };
}

function addAlbertPackageToPackageJson(options: AlbertPackageSchema) {
  return (host: Tree, context: SchematicContext) => {
    context.logger.info('Adding npm dependencies');
    const libsToInstall = [];
    if (options.lib_primeng) {
      libsToInstall.push(LIBRARIES.PRIMENG);
      libsToInstall.push(LIBRARIES.PRIMEICONS);
    }

    if (options.lib_ngselect) { libsToInstall.push(LIBRARIES.NGSELECT); }

    if (options.lib_editor) {
      libsToInstall.push(LIBRARIES.NODEFETCH);
      libsToInstall.push(LIBRARIES.PLURALIZETYPES);
      libsToInstall.push(LIBRARIES.PLURALIZE);
    }

    LIB_CONFIG.forEach(({ type, version, name, overwrite, onlyinmodule, promptask }: NodeDependencyMoreOpt) => {

      if (!onlyinmodule) {
        const exec = require('child_process').exec;
        if (version === '') {
          if (promptask) {
            if (libsToInstall.includes(name)) {
              exec(`npm install ${name}`, () => {
                context.logger.log('info', `\n✅️ Added "${name}" into ${type}`);
              });
            } else {
            }
          } else {
            exec(`npm install ${name}`, () => {
              context.logger.log('info', `\n✅️ Added "${name}" into ${type}`);
            });
          }
        } else {
          context.logger.log('info', `\n✅️ Added "${name}" into ${type}`);
          addPackageJsonDependency(host, { type, version, name, overwrite });
        }

      }

    });
    return host;
  };
}

function runNpmPackageInstall() {
  return (_: Tree, context: SchematicContext) => {
    context.addTask(new NodePackageInstallTask());
    context.logger.log('info', `\n🔍 Installing Albert packages... \n`);
  };
}

function setSchematicsAsDefault(): Rule {
  return (host: Tree, context: SchematicContext) => {
    const exec = require('child_process').exec;
    exec('ng config cli.defaultCollection @albert/schematics', () => {
      context.logger.log('info', `\n✅️ Setting Albert Schematics as default`);
    });
    return host;
  };
}

function addAlbertStyleRefs(): Rule {
  return (host: Tree, context: SchematicContext) => {

    const exec = require('child_process').exec;

    exec('ng config projects', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }
      const command = Object.keys(  JSON.parse(stdout)  )[0];
      const findStyleNode =  'ng config projects["' + command + '"].architect.build.options.styles';

      exec(findStyleNode, (execerror: any, execstdout: string, execstderr: any) => {
        if (execerror) {
          console.error(`exec error: ${execerror}`);
          return;
        }
        const styles = JSON.parse(execstdout);
        const fullCommand =  'ng config projects["' +
                              command + '"].architect.build.options.styles[' +
                              styles.length  + '] node_modules/@albert/styles/css/all.css';

        exec(fullCommand, () => {
          context.logger.log('info', `\n✅️ Setting @albert/styles Referencies to angular.json`);
        });
      });

    });

    return host;
  };
}

function finallyLog(): Rule {
  return (host: Tree, context: SchematicContext) => {
    context.logger.log('info', `\n`);
    context.logger.log('info', '_______ ____________                _____        _______                          ______                ');
    context.logger.log('info', '___    |___  /___  /_ _____ __________  /_       ___    |_______ _______ _____  _____  /______ _________');
    // tslint:disable-next-line: max-line-length
    context.logger.log('info', '__  /| |__  / __  __ \\_  _ \\__  ___/_  __/       __  /| |__  __ \\__  __ `/_  / / /__  / _  __ `/__  ___/');
    context.logger.log('info', '_  ___ |_  /  _  /_/ //  __/_  /    / /_         _  ___ |_  / / /_  /_/ / / /_/ / _  /  / /_/ / _  /    ');
    // tslint:disable-next-line: max-line-length
    context.logger.log('info', '/_/  |_|/_/   /_.___/ \\___/ /_/     \\__/         /_/  |_|/_/ /_/ _\\__, /  \\__,_/  /_/   \\__,_/  /_/     ');
    context.logger.log('info', `\n`);

    return host;
  };
}

function addAllDeclarationsToModule() {
  return (host: Tree, context: SchematicContext) => {
    LIB_CONFIG.forEach(({ type, version, name, overwrite, module }: NodeDependencyMoreOpt) => {

      if (module) {
        const addRootModuleOptions: DeclarationOptions = {
          metadata: 'imports',
          type: 'module',
          name: module,
          path: name as Path,
          module: '/src/app/app.module.ts' as Path,
        };

        const declarator: ModuleDeclarator = new ModuleDeclarator();
        const content = host.read(addRootModuleOptions.module).toString();

        host.overwrite(
          addRootModuleOptions.module,
          declarator.declareroot(content, addRootModuleOptions as DeclarationOptions),
        );

        return host;
      }
    });
  };
}
