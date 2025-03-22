import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MarkdownModule } from 'ngx-markdown';

import { HomeDocComponent } from './home.component';
import { HomeDocRoutingModule } from './home-routing.module';
import { HomeReleasesDocComponent } from './home-releases/home-releases.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    HomeDocRoutingModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
  ],
  declarations: [
    HomeDocComponent,
    HomeReleasesDocComponent
  ]
})
export class HomeDocModule { }
