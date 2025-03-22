import { Rule, Tree } from '@angular-devkit/schematics';
import { MenuMockDeclarator } from './menu-mock.declarator';
import { MenuMockOptions } from './MenuMock.model';

class AddToMenuMockOptions {
    options: any;
}

export function addToMenuMock(menumockOpt: AddToMenuMockOptions): Rule {

    return (tree: Tree) => {

        if (menumockOpt.options.skipMenuMock !== undefined && menumockOpt.options.skipMenuMock) {
            return tree;
        }

        menumockOpt.options.route = '/src/app/app.component.ts';
        let content = '';
        if ( tree.read(menumockOpt.options.route) ) {
            content = tree.read(menumockOpt.options.route).toString();
        } else {
            return tree;
        }

        const declarator: MenuMockDeclarator = new MenuMockDeclarator();
        tree.overwrite(
            menumockOpt.options.route,
            declarator.declare(content, menumockOpt.options as MenuMockOptions),
        );
        return tree;

    };
}
