import { AddRouteDeclarator } from './routes.addroute-declarator';
import { ModuleImportDeclarator } from '../module/module-import.declarator';

import { AddRouteDeclarationOptions } from './RouteDeclaration.model';
import { classify, capitalize } from '@angular-devkit/core/src/utils/strings';

export class RouteDeclarator {
  constructor(
        private addDeclarator: AddRouteDeclarator = new AddRouteDeclarator(),
        private imports: ModuleImportDeclarator = new ModuleImportDeclarator(),
  ) {}

  public declare(content: string, options: AddRouteDeclarationOptions): string {
        options = this.computeSymbol(options);
        content = this.addDeclarator.declare(content, options);

        // when creating single Module -> IF isrootmodule not add import
        if (!options.isrootmodule) {
            content = this.imports.declare(content, options);
        }
        return content;
  }

  private computeSymbol(options: AddRouteDeclarationOptions): AddRouteDeclarationOptions {
    const target = Object.assign({}, options);
    if (options.type !== undefined) {
      target.symbol = classify(options.name).concat(capitalize(options.type));
    } else {
      target.symbol = classify(options.name);
    }
    return target;
  }

}
