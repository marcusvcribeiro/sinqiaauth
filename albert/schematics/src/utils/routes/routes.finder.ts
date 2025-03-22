import { join, Path, PathFragment } from '@angular-devkit/core';
import { DirEntry, Tree } from '@angular-devkit/schematics';

export interface FindOptions {
  name?: string;
  path: Path;
  kind?: string;
}

export class RoutesFinder {
  constructor(private tree: Tree) {}

  public find(options: FindOptions, testModule?: boolean): Path | null | boolean {

    const generatedDirectoryPath: Path = options.path;
    const generatedDirectory: DirEntry = this.tree.getDir(generatedDirectoryPath);
    return this.findIn(generatedDirectory, testModule);
  }

  private findIn(directory: DirEntry, testModule?: boolean): Path | null | boolean {
    if (!directory) {
      return null;
    }
    const moduleFilename: PathFragment = directory.subfiles.find(filename =>
      /\.routing.module\.(t|j)s$/.test(filename),
    );

    if (testModule) {
      return moduleFilename !== undefined ? true : false;
    } else {
      return moduleFilename !== undefined
      ? join(directory.path, moduleFilename.valueOf())
      : this.findIn(directory.parent);
    }
  }
}
