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
import { mergeSourceRoot } from '../../utils/source-root.helpers';
import { ServiceOptions } from './service.schema';

const ELEMENT_METADATA = 'declarations';
const ELEMENT_TYPE = 'component';

export function main(options: ServiceOptions): Rule {

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

function transform(source: ServiceOptions): ServiceOptions {
  const target: ServiceOptions = Object.assign({}, source);
  target.metadata = ELEMENT_METADATA;
  target.type = ELEMENT_TYPE;

  const location: Location = new NameParser().parse(target);
  target.name = strings.dasherize(location.name);
  target.path = strings.dasherize(location.path);

  return target;
}

function generate(options: ServiceOptions) {
  return (context: SchematicContext) =>
    apply(url(join('./files' as Path)), [
      options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
      template({
        ...strings,
        ...options,
      }),
      move(options.path),
    ])(context);
}
