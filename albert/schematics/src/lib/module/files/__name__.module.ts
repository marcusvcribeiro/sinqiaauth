import { NgModule } from '@angular/core';
import { <%= classify(name) %>RoutingModule } from './<%= dasherize(name) %>.routing.module';
import { LayoutModule } from '@albert/layout';
import { UiModule } from '@albert/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [<%= classify(name) %>RoutingModule, LayoutModule, UiModule, FormsModule, ReactiveFormsModule],
  declarations: [],
  providers:[]
})
export class <%= classify(name) %>Module { }
