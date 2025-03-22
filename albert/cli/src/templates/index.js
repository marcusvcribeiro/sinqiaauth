/**
 *
 * ----- BLANK TEMPLATE -------
 *
 */
const blank = {
  module: `import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { NgSelectModule } from '@ng-select/ng-select';

import { LayoutModule } from '@albert/layout';
import { UiModule } from '@albert/ui';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgSelectModule,
    LayoutModule,
    UiModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
`,
  html: `<alb-container>
  <h1>Hello albert</h1>
</alb-container>
`,
};

/**
 *
 * ----- NAVIGATION TEMPLATE -------
 *
 */
const navigation = {
  module: `import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NgSelectModule } from '@ng-select/ng-select';

import { LayoutModule } from '@albert/layout';
import { UiModule } from '@albert/ui';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([]),
    NgSelectModule,
    LayoutModule,
    UiModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
`,
  ts: `import { Component } from '@angular/core';
import { NavigationItem } from '@albert/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  items = [
    {
      id: '1',
      name: 'Indice',
      icon: 'work',
    },
    {
      id: '2',
      name: 'Favorito',
      icon: 'today',
    },
  ];
}
`,
  html: `<alb-container>
  <alb-header class="alb-container-header" name="Apenas um test" description="Test"></alb-header>
  <alb-navigation [items]="items" class="alb-container-sidenav"></alb-navigation>
  <div class="alb-container-body">
    <router-outlet></router-outlet>
  </div>
</alb-container>
`,
};

export { blank, navigation };
