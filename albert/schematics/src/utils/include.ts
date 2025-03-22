import { SchematicContext, template, Tree, SchematicsException, url, applyContentTemplate } from '@angular-devkit/schematics';
import { basename, dirname } from 'path';

type IncludeFct = (path: string) => string;

interface IncludeContext {
    includeBaseDirectory?: string;
    context: SchematicContext;
    include: IncludeFct;
    data: any;
}

export function templateInclude(context: SchematicContext, data: any, includeBaseDirectory?: string) {
    const includeContext: Partial<IncludeContext> = {
        context,
        includeBaseDirectory
    };
    const includeFct: IncludeFct = include.bind(includeContext);
    includeContext.include = includeFct;
    includeContext.data = data;
    if (!('include' in data)) {
        data.include = includeFct;
    }
    return template(data).bind(includeContext);
}

export function include(this: IncludeContext, filepath: string, templateData: any = this.data) {
    const directory = this.includeBaseDirectory || dirname(filepath);
    const filename = this.includeBaseDirectory ? filepath : basename(filepath);
    const source = url( directory );
    const tree: Tree = source(this.context) as Tree;
    if (!tree.exists(filename)) {
        throw new SchematicsException(
            `Please create template file "${filename}" in "${directory}"  - includeBaseDirectory: ${this.includeBaseDirectory}`
        );
    }
    const result = applyContentTemplate(templateData)(tree.get(filename));
    if (!result) {
        throw new SchematicsException(
            `internal error: applyContentTemplate() function returned null.`
        );
    }
    const fileContent = result.content.toString();
    return fileContent;
}
