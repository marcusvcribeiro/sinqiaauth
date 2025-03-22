
import { Tree } from '@angular-devkit/schematics';
import { SchematicTestRunner, UnitTestTree } from '@angular-devkit/schematics/testing';

const collectionPath = require.resolve('../../collection.json');
const runner = new SchematicTestRunner('schematics', collectionPath);

describe('should create module mymodule', () => {

  it('should create a module with name mymodule', async () => {

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

    sourceTree.create('/src/app/app-routing.module.ts',
      `import { NgModule } from '@angular/core';
      import { Routes, RouterModule } from '@angular/router';
      const routes: Routes = [];
      @NgModule({
        imports: [RouterModule.forRoot(routes)],
        exports: [RouterModule]
      })
      export class AppRoutingModule { }`
    );

    const tree = await runner.runSchematicAsync('module', { name: 'mymodule' }, sourceTree);

    tree.subscribe( t => {
      expect(t.files).toEqual([
        '/src/app/app.component.ts',
        '/src/app/app-routing.module.ts',
        '/mymodule/mymodule.module.ts',
        '/mymodule/mymodule.routing.module.ts'
      ]);
    });

  });
});


