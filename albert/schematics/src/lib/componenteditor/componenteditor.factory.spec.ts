
import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';

const collectionPath = require.resolve('../../collection.json');

describe('componenteditor', () => {
  it('should create a basic component with listed files', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner.runSchematicAsync('componenteditor', { name: 'editorcomp' }, Tree.empty());

    tree.subscribe( t => {
      expect(t.files).toEqual([
        '/editorcomp/editorcomp.component.html',
        '/editorcomp/editorcomp.component.scss',
        '/editorcomp/editorcomp.component.spec.ts',
        '/editorcomp/editorcomp.component.ts'
      ]);
    });
  });
});
