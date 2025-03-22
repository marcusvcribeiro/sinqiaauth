import { Path } from '@angular-devkit/core';

export interface AddRouteDeclarationOptions {
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
    isroot?: boolean;
    isrootmodule?: boolean;
}
