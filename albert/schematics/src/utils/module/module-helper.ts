import { Rule, Tree } from '@angular-devkit/schematics';
import { ModuleFinder } from './module.finder';
import { Path } from '@angular-devkit/core';
import { ModuleDeclarator, DeclarationOptions } from './module.declarator';

export function addDeclarationToModule(options: any, host?: Tree): Rule {

  return (tree: Tree) => {
    if (host) {
      tree = host;
    }
    if (options.skipImport !== undefined && options.skipImport) {
      return tree;
    }
    options.module = new ModuleFinder(tree).find({
      name: options.name,
      path: options.path as Path,
    });
    if (!options.module) {
      return tree;
    }
    const content = tree.read(options.module).toString();
    const declarator: ModuleDeclarator = new ModuleDeclarator();
    tree.overwrite(
      options.module,
      declarator.declare(content, options as DeclarationOptions),
    );
    return tree;
  };
}

export function addModuleToRootModule(options: any, host?: Tree): Rule {
  return (tree: Tree) => {

    if (host) {
      tree = host;
    }

    if (options.module) {
      const declarator: ModuleDeclarator = new ModuleDeclarator();
      const content = tree.read(options.module).toString();
      tree.overwrite(
        options.module,
        declarator.declare(content, options as DeclarationOptions),
      );
    }
    return tree;
  };
}
