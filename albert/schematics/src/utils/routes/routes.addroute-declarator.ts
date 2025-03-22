import { normalize, Path } from '@angular-devkit/core';
import { AddRouteDeclarationOptions } from './RouteDeclaration.model';

export class AddRouteDeclarator {

  public declare(content: string, options: AddRouteDeclarationOptions): string {
    const toInsert = this.buildLineToInsert(options);
    let contentLines = content.split('\n');
    contentLines = this.openSBrackets(contentLines);
    const finalRouteIndex = this.findRouteEndpoint(contentLines);
    contentLines.splice(finalRouteIndex, 0, toInsert);
    return contentLines.join('\n');
  }

  private openSBrackets(contentLines: string[]): string[] {
    const line = this.findRouteEndpoint(contentLines);
    const re = /\[\];/ig;
    const willReplace = /\[\];/.test(contentLines[line]);
    if (willReplace) {
      contentLines[line] = contentLines[line].replace(/\[\];/, '[');
      contentLines.splice(line + 1, 0, '];');
    }
    return contentLines;
  }

  private buildLineToInsert(options: AddRouteDeclarationOptions): string {
    if (options.isrootmodule) {
        return `  {
    path: '${options.name}',
    loadChildren: () => import('${this.computeRelativePath(options)}').then(m => m.${options.symbol})
  },`;
    } else {
        return `  { path: '${options.name}', component: ${options.symbol} },`;
    }

  }

  private computeRelativePath(options: AddRouteDeclarationOptions): string {
    let importModulePath: Path;
    importModulePath = normalize(`${options.name}/${options.name}.${options.type}`, );
    return './' + importModulePath;
  }

  private findRouteEndpoint(contentLines: string[]): number {
    const reversedContent = Array.from(contentLines).reverse();
    const reverseImports = reversedContent.filter(line =>
      line.match(/\];/),
    );
    if (reverseImports.length <= 0) {
      return 0;
    }
    if (reverseImports) {

    }
    return contentLines.indexOf(reverseImports[0]);
  }

}
