import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner } from '@angular-devkit/schematics/testing';

const collectionPath = require.resolve('../../collection.json');

describe('service', () => {
  it('should create a service with name myservice', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const sourceTree = Tree.empty();
    sourceTree.create('/src/app/app.component.ts',
      `export class AppComponent {
          lista: NavigationItem[] = [{
            icon: 'home',
            name: 'Home',
            path: '/'
          },
          {
            icon: 'menu',
            name: 'Indice',
            type: 'full',
            children: []
          }
        ];
      }`
    );

    const tree = await runner.runSchematicAsync('service', { name: 'myservice' }, sourceTree);

    tree.subscribe( t => {
      expect(t.files).toEqual([
        '/myservice.service.ts',
        '/src/app/app.component.ts'
      ]);
    });
  });
});
