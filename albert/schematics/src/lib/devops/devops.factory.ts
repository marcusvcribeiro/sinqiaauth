import { join, Path, strings } from '@angular-devkit/core';
import {
  apply,
  branchAndMerge,
  chain,
  filter,
  mergeWith,
  move,
  noop,
  Rule,
  SchematicContext,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';

import { Location, NameParser } from '../../utils/name.parser';
import { DevopsOptions } from './devops.schema';

const ELEMENT_METADATA = 'declarations';
const ELEMENT_TYPE = 'component';

export function main(options: DevopsOptions): Rule {

  options = transform(options);

  return (tree: Tree, context: SchematicContext) => {

    return branchAndMerge(
      chain([
        mergeWith(generate(options)),
      ]),
    )(tree, context);
  };
}

function transform(source: DevopsOptions): DevopsOptions {
  const target: DevopsOptions = Object.assign({}, source);
  target.metadata = ELEMENT_METADATA;
  target.type = ELEMENT_TYPE;

  return target;
}

function generate(options: DevopsOptions) {
  return (context: SchematicContext) =>
    apply(url(join('./files' as Path)), [
      options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
      template({
        ...strings,
        ...options,
      }),
    ])(context);
}
