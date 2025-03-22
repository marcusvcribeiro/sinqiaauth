import { Tree } from '@angular-devkit/schematics';
import {SchematicTestRunner, UnitTestTree} from '@angular-devkit/schematics/testing';
import {Schema as WorkspaceOptions} from '@schematics/angular/workspace/schema';
import {Schema as ApplicationOptions} from '@schematics/angular/application/schema';
import { Observable } from 'rxjs';

const collectionPath = require.resolve('../../collection.json');


describe('should create project and run NG Add', () => {

    const testRunner = new SchematicTestRunner('schematics', collectionPath);

    const workspaceOptions: WorkspaceOptions = {
        name: 'workspace',
        newProjectRoot: 'projects',
        version: '6.0.0',
    };

    describe('NG Add', () => {

        const appOptions: ApplicationOptions = {
            name: 'bar',
            projectRoot: '',
            inlineStyle: false,
            inlineTemplate: false,
            routing: false,
            skipTests: false,
            skipPackageJson: false,
        };

        let appTree: Observable<UnitTestTree>;
        beforeEach(() => {
            appTree = testRunner.runExternalSchematicAsync('@schematics/angular', 'workspace', workspaceOptions);
            appTree.subscribe( tree => {
              appTree = testRunner.runExternalSchematicAsync('@schematics/angular', 'application', appOptions, tree);
            });
        });

        it('run Ng-Add', () => {

            appTree.subscribe( tree => {

              expect(() => testRunner.runSchematicAsync('ng-add', {}, tree).subscribe( tr => {

                expect(tr.files).toEqual([
                  'angular.json',
                  'browserslist',
                  'karma.conf.js',
                  'node_modules',
                  'package.json',
                  'package-lock.json',
                  'README.md',
                  'tsconfig.app.json',
                  'tsconfig.json',
                  'tsconfig.spec.json',
                  'tslint.json',
                  '/src/app',
                  '/src/assets',
                  '/src/environments',
                  '/src/favicon.ico',
                  '/src/index.html',
                  '/src/main.ts',
                  '/src/polyfills.ts',
                  '/src/styles.scss',
                  '/src/test.ts',
                  '/src/app/app.component.html',
                  '/src/app/app.component.scss',
                  '/src/app/app.component.spec.ts',
                  '/src/app/app.component.ts',
                  '/src/app/app.module.ts',
                  '/src/app/app-routing.module.ts',
                  '/src/environments/environment.prod.ts',
                  '/src/environments/environment.ts',
                  '/e2e/protractor.conf.js',
                  '/e2e/src/app.e2e-spec.ts',
                  '/e2e/src/app.po.ts',
                  '/e2e/tsconfig.json',
                ]);
              }));

            });

        });

    });

});
