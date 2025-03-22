
import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';

const collectionPath = require.resolve('../../collection.json');

describe('model', () => {
  it('should create a model with name mymodel', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner.runSchematicAsync('model', { name: 'mymodel' }, Tree.empty());

    tree.subscribe( t => {
      expect(t.files).toEqual([
        '/mymodel.model.ts'
      ]);
    });
  });
});
