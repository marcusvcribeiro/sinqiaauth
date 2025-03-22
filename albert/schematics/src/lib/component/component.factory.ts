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
import { ComponentOptions } from './component.schema';

import { addDeclarationToModule } from '../../utils/module/module-helper';
import { addToRoute } from '../../utils/routes/routes-helper';
import { addToMenuMock } from '../../utils/menumock/menumock-helper';

const ELEMENT_METADATA = 'declarations';
const ELEMENT_TYPE = 'component';

export function main(options: ComponentOptions): Rule {

  options = transform(options);

  return (tree: Tree, context: SchematicContext) => {

    return branchAndMerge(
      chain([
        mergeSourceRoot(options),
        addDeclarationToModule(options),
        addToRoute({ options }),
        addToMenuMock({ options }),
        mergeWith(generate(options)),
      ]),
    )(tree, context);
  };
}

function transform(source: ComponentOptions): ComponentOptions {
  const target: ComponentOptions = Object.assign({}, source);
  target.metadata = ELEMENT_METADATA;
  target.type = ELEMENT_TYPE;

  const location: Location = new NameParser().parse(target);
  target.name = strings.dasherize(location.name);
  target.path = strings.dasherize(location.path);

  target.path = target.flat
    ? target.path
    : join(target.path as Path, target.name);
  return target;
}

function generate(options: ComponentOptions) {
  return (context: SchematicContext) =>
    apply(url(join('./files' as Path)), [
      options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
      options.scss ? noop() : filter(path => !path.endsWith('.scss')),
      template({
        ...strings,
        ...options,
      }),
      move(options.path),
    ])(context);
}
