import { NavigationModule } from '@albert/layout';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { UIMNavigationProviderDirective } from './uim-navigation-provider.directive';

@NgModule({
  declarations: [
    UIMNavigationProviderDirective
  ],
  imports: [
    HttpClientModule,
    NavigationModule,
  ],
  exports: [
    UIMNavigationProviderDirective
  ]
})
export class UIMNavigationProviderModule { }
