import { PathSolver } from '../path.solver';
import { MenuMockOptions } from './MenuMock.model';

class MockMenu {
  name: string;
  path?: string;
  icon?: string;
  type?: string;
  children?: MockMenu[];
}

class MenuResponse {
  indexes: Array<number>;
  menu: MockMenu[];
}

export class MenuMockDeclarator {
  constructor(private solver: PathSolver = new PathSolver()) {}

  public declare(content: string, options: MenuMockOptions): string {
    let contentLines = content.split('\n'); // divide o conteúdo em linhas da array
    contentLines = this.manipuleMenu(contentLines, options.path);
    return contentLines.join('\n'); // Junta tudo e retetorna
  }

  private manipuleMenu(contentLines: string[], menupath: string) { // seleciona o objeto inteiro adiciona o que quer e retorna
    const startMenuIndex = this.findStartPoint(contentLines);
    const finalMenuIndex = this.findEndPoint(contentLines);
    const contentObj = contentLines.slice(startMenuIndex, finalMenuIndex + 1); // corta as linhas do array de objetos
    const contentLength = this.findEndPoint(contentObj);
    const newFirstLine = contentObj[0].toString().split('NavigationItem[] = '); // corta o começo do array de objetos
    contentObj[0] = newFirstLine[1]; // seta a primeira linha
    contentObj[contentLength] = contentObj[contentLength].split(';')[0]; // corta o final
    let contentObj_string = contentObj.join('\n');
    contentObj_string = contentObj_string.replace(/\s+/g, '').trim(); // limpa
    // tslint:disable-next-line: no-eval
    const newmockmenu: MockMenu[] = eval(contentObj_string);
    const linetoadd = '  lista: NavigationItem[] = ' + JSON.stringify(this.addToMenu(menupath.substr(8), newmockmenu)) + ';\n}\n';
    contentLines.splice(startMenuIndex, finalMenuIndex + 1, linetoadd); // substitui pelo novo conteúdo
    return contentLines;
  }

  private addToMenu(menupath: string, menu: MockMenu[]): MockMenu[] {
    const paths: string[] = ['Indice'];
    paths.push( ...menupath.split('/') );
    let menuResponse: MenuResponse = { menu, indexes: [] };
    paths.forEach(e => {
      menuResponse = this.loopMenu(menuResponse.menu, menuResponse.indexes, e);
    });
    const menuname = menupath.split('/');
    const objtoInsert: MockMenu = {
      name: menuname[ menuname.length - 1 ],
      path: '/' + menupath
    };
    switch ( menuResponse.indexes.length - 1 ) {
      case 0:
        menu[menuResponse.indexes[0]].children.push(objtoInsert);
        break;
      case 1:
        menu[menuResponse.indexes[0]].children[menuResponse.indexes[1]].children.push(objtoInsert);
        break;
      case 2:
        menu[menuResponse.indexes[0]].children[menuResponse.indexes[1]].children[menuResponse.indexes[2]].children.push(objtoInsert);
        break;
    }
    return menu;
  }

  private loopMenu(menu: MockMenu[], indexes: Array<number>, nodepath: string): MenuResponse {
    const menuRes: MenuResponse = { menu, indexes };
    menu.forEach((e, i) => {
      if (e.name === nodepath) {
        menuRes.indexes.push(i);
        menuRes.menu = e.children;
      }
    });
    return menuRes;
  }

  private findEndPoint(contentLines: string[]): number {
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

  private findStartPoint(contentLines: string[]): number {
    const reversedContent = Array.from(contentLines).reverse();
    const reverseImports = reversedContent.filter(line =>
      line.match(/ NavigationItem\[\] /),
    );
    if (reverseImports.length <= 0) {
      return 0;
    }
    if (reverseImports) {

    }
    return contentLines.indexOf(reverseImports[0]);
  }

}
