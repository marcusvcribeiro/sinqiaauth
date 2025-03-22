import { NodeDependency } from '@schematics/angular/utility/dependencies';

export interface NodeDependencyMoreOpt extends NodeDependency {
    ask?: boolean;
    module?: string;
    onlyinmodule?: boolean;
    promptask?: boolean;
}
