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
  Tree,
  url,
} from '@angular-devkit/schematics';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';

import { Location, NameParser } from '../../utils/name.parser';
import { mergeSourceRoot } from '../../utils/source-root.helpers';
import { ComponentOptions } from './componenteditor.schema';
import { addDeclarationToModule } from '../../utils/module/module-helper';
import { addToRoute } from '../../utils/routes/routes-helper';
import { templateInclude } from '../../utils/include';
import { getJson } from './getjson';
import { stringsUtils } from '../../utils/strings-utils';
import { addToMenuMock } from '../../utils/menumock/menumock-helper';

const ELEMENT_METADATA = 'declarations';
const ELEMENT_TYPE = 'component';

export function main(options: ComponentOptions): Rule {

  options = transform(options);

  const templateOptions = {
    ...strings,
    ...options,
    ...stringsUtils
  };

  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        options.url ? getJson(options, templateOptions) : noop(),
        mergeSourceRoot(options),
        addDeclarationToModule(options),
        options.url ? addToMenuMock({ options }) : noop(),
        options.url ? addToRoute({ options }) : noop(),
        mergeWith(generate(options)),
        options.url ? runComponentization(options) : noop(),
        options.url ? runServices(options) : noop(),
        options.url ? runModel(options) : noop(),
      ]),
    )(tree, context);
  };
}

function runComponentization(options: ComponentOptions): Rule {

  return (host: Tree, _context: SchematicContext) => {
    const originpath = options.path;
    if (options.componentcreate) {
      options.componentcreate.forEach((e, i) => {
        _context.addTask(new RunSchematicTask('componenteditor', {
          name: e.properties.title,
          data: e.children,
          path: join( originpath as Path, e.path as Path ),
          url: undefined
        }));
      });
    }
  };
}

function runServices(options: ComponentOptions): Rule {
  return (host: Tree, _context: SchematicContext) => {
    const originpath = options.path;
    if (options.endpoints) {
      options.endpoints.forEach((e, i) => {
        _context.addTask(new RunSchematicTask('service', {
          name: e.nameDTO,
          data: e.children,
          path: join( originpath as Path, '/services/' as Path ),
        }));
      });
    } 
    if(options.service){
      options.service.forEach((e, i) => {
        _context.addTask(new RunSchematicTask('service', {
          name: e.properties.endpointName,
          data: e.properties.data,
          path: join( originpath as Path, '/services/' as Path ),
        }));
      });
    } 
  };
}

function runModel(options: ComponentOptions): Rule {
  return (host: Tree, _context: SchematicContext) => {
    const originpath = options.path;
    if (options.endpoints) {
      options.endpoints.forEach((e, i) => {
        _context.addTask(new RunSchematicTask('model', {
          name: e.nameDTO,
          data: e.children,
          fields: e.fields,
          path: join( originpath as Path, '/model/' as Path ),
        }));
      });
    }
    if(options.service){
      options.service.forEach((e, i) => {
        _context.addTask(new RunSchematicTask('model', {
          name: e.properties.endpointName,
          data: e.properties.data,
          path: join( originpath as Path, '/model/' as Path ),
        }));
      });
    } 
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
    apply(url(join('./files/main' as Path)), [
      options.spec ? noop() : filter(path => !path.endsWith('.spec.ts')),
      options.scss ? noop() : filter(path => !path.endsWith('.scss')),
      templateInclude(context, {
        ...strings,
        ...options,
        ...stringsUtils,
      }, './files/includes'),
      move(options.path),
    ])(context);
}
