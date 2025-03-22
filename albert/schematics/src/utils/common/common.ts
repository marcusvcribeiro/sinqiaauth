import { SchematicContext, template, Tree, SchematicsException, url, applyContentTemplate } from '@angular-devkit/schematics';

/**
 * This method is specifically for reading JSON files in a Tree
 * @param host The host tree
 * @param path The path to the JSON file
 * @returns The JSON data in the file.
 */
export function readJsonInTree<T = any>(host: Tree, path: string): T {
    if (!host.exists(path)) {
        throw new Error(`Cannot find ${path}`);
    }
    const contents = host.read(path).toString('utf-8');
    try {
        return JSON.parse(contents);
    } catch (e) {
        throw new Error(`Cannot parse ${path}: ${e.message}`);
    }
}
