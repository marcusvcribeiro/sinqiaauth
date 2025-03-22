import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
  branchAndMerge,
  chain,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { Location, NameParser } from '../../utils/name.parser';
import { mergeSourceRoot } from '../../utils/source-root.helpers';
import { ModelOptions } from './model.schema';


export function main(options: ModelOptions): Rule {
  options = transform(options);
  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        mergeSourceRoot(options),
        mergeWith(generate(options)),
      ]),
    )(tree, context);
  };
}

function transform(source: ModelOptions): ModelOptions {
  const target: ModelOptions = Object.assign({}, source);
  target.metadata = 'imports';
  target.type = 'model';

  const location: Location = new NameParser().parse(target);
  target.name = strings.dasherize(location.name);
  target.path = strings.dasherize(location.path);

  return target;
}

function generate(options: ModelOptions) {
  return (context: SchematicContext) =>
    apply(url(join('./files' as Path)), [
      template({
        ...strings,
        ...options,
      }),
      move(options.path),
    ])(context);
}
