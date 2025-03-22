import { strings } from '@angular-devkit/core/src/utils';
import {stringsUtils} from './../strings-utils' 
import { ModuleImportDeclarator } from './module-import.declarator';
import { ModuleMetadataDeclarator } from './module-metadata.declarator';
import { DeclarationOptions } from './module.declarator';

export class ModuleProviderDeclarator {

  private metadata: ModuleMetadataDeclarator;
  private imports: ModuleImportDeclarator;

  public declare(
    content: string,
    options: DeclarationOptions,
    imports : ModuleImportDeclarator,
    metadata : ModuleMetadataDeclarator): string {
      this.imports = imports;
      this.metadata = metadata;
      options.metadata = 'providers';
      options.type = 'service';

   if(options.endpoints){
      options.endpoints.forEach(element => {
        options.symbol = stringsUtils.upperCamelCase(element.nameDTO) + 'Service';
        options.name =  'services/'  + strings.dasherize(element.nameDTO);
        content = this.imports.declare(content, options);
        content = this.metadata.declare(content, options);

      });
    }
    if(options.service){
      options.service.forEach(element => {
        options.symbol = stringsUtils.upperCamelCase(element.properties.endpointName) + 'Service';
        options.name =  'services/'  + strings.dasherize(element.properties.endpointName);
        content = this.imports.declare(content, options);
        content = this.metadata.declare(content, options);
      });
    }
    return content;
  } 
}


