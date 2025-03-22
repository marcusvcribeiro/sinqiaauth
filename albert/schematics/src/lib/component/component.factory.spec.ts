
import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = require.resolve('../../collection.json');

describe('component', () => {
  it('should create a component with name mycomp', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner.runSchematicAsync('component', {name: 'mycomp'}, Tree.empty());

    tree.subscribe( t => {
      expect(t.files).toEqual([
        '/mycomp/mycomp.component.html',
        '/mycomp/mycomp.component.scss',
        '/mycomp/mycomp.component.spec.ts',
        '/mycomp/mycomp.component.ts'
      ]);
    });
  });
});
