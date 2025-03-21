import { Path } from '@angular-devkit/core';
import { capitalize, classify } from '@angular-devkit/core/src/utils/strings';
import { ModuleImportDeclarator } from './module-import.declarator';
import { ModuleMetadataDeclarator } from './module-metadata.declarator';
import { ModuleProviderDeclarator } from './module-provider.declarator';

export interface DeclarationOptions {
  metadata: string;
  type?: string;
  name: string;
  path: Path;
  module: Path;
  symbol?: string;
  staticOptions?: {
    name: string;
    value: Record<string, any>;
  };
  endpoints?: any,
  service?: any,
}

export class ModuleDeclarator {
  constructor(
    private imports: ModuleImportDeclarator = new ModuleImportDeclarator(),
    private metadata: ModuleMetadataDeclarator = new ModuleMetadataDeclarator(),
    private providers: ModuleProviderDeclarator = new ModuleProviderDeclarator(),
  ) {}

  public declare(content: string, options: DeclarationOptions): string {
    options = this.computeSymbol(options);
    content = this.imports.declare(content, options);
    content = this.metadata.declare(content, options);
    content = this.providers.declare(content, options, this.imports, this.metadata);
    return content;
  }

  private computeSymbol(options: DeclarationOptions): DeclarationOptions {
    const target = Object.assign({}, options);
    if (options.type !== undefined) {
      target.symbol = classify(options.name).concat(capitalize(options.type));
    } else {
      target.symbol = classify(options.name);
    }
    return target;
  }

  public declareroot(content: string, options: DeclarationOptions): string {
    options = this.computeSymbol(options);
    content = this.imports.declareRoot(content, options);
    content = this.metadata.declare(content, options);
    return content;
  }

}
