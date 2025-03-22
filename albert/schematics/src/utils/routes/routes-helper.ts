import { Rule, Tree } from '@angular-devkit/schematics';
import { RoutesFinder } from './routes.finder';
import { Path } from '@angular-devkit/core';
import { RouteDeclarator } from './routes.declarator';

import { AddRouteDeclarationOptions } from './RouteDeclaration.model';

class AddToRouteOptions {
    options: any;
}

export function addToRoute(routeOpt: AddToRouteOptions): Rule {

    return (tree: Tree) => {

        if (routeOpt.options.skipImport !== undefined && routeOpt.options.skipImport) { return tree; }

        routeOpt.options.isrootmodule = new RoutesFinder(tree).find({
            name: routeOpt.options.name,
            path: routeOpt.options.path as Path
        }, true);

        if (routeOpt.options.isrootmodule) {
            routeOpt.options.route = '/src/app/app-routing.module.ts';
        } else {
            routeOpt.options.route = new RoutesFinder(tree).find({
                name: routeOpt.options.name,
                path: routeOpt.options.path as Path,
            });
        }

        if (routeOpt.options.route) {
            const content = tree.read(routeOpt.options.route).toString();
            const declarator: RouteDeclarator = new RouteDeclarator();
            tree.overwrite(
                routeOpt.options.route,
                declarator.declare(content, routeOpt.options as AddRouteDeclarationOptions),
            );
        }
        return tree;

    };
}
