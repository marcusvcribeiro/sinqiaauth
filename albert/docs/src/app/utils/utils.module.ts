import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { MarkdownModule } from 'ngx-markdown';
import { LayoutModule } from '@albert/layout';

import { AuthenticationDocComponent } from './pages/authentication/authentication.component';
import { CliDocComponent } from './pages/cli/cli.component';
import { ContributingDocComponent } from './pages/contributing/contributing.component';
import { DashboardDocComponent } from './pages/dashboard/dashboard.component';
import { DocTemplateModule } from 'src/app/doc-template/doc-template.module';
import { GetStartedDocComponent } from './pages/get-started/get-started.component';
import { PrProcessDocComponent } from './pages/pr-process/pr-process.component';
import { ReleasesDocComponent } from './pages/releases/releases.component';
import { SchematicsDocComponent } from './pages/schematics/schematics.component';
import { ShortcutsDocComponent } from './pages/shortcuts/shortcuts.component';
import { UtilsRoutingModule } from './utils-routing.module';
import { CreatingComponentsDocComponent } from './pages/creating-components/creating-components.component';
import { PublishingDocComponent } from './pages/publishing/publishing.component';
import { CoreCommitterComponent } from './pages/core-committer/core-committer.component';

@NgModule({
  imports: [
    CommonModule,
    DocTemplateModule,
    HttpClientModule,
    MarkdownModule.forRoot({ loader: HttpClient }),
    LayoutModule,
    UtilsRoutingModule,
  ],
  declarations: [
    AuthenticationDocComponent,
    CliDocComponent,
    ContributingDocComponent,
    DashboardDocComponent,
    GetStartedDocComponent,
    PrProcessDocComponent,
    ReleasesDocComponent,
    SchematicsDocComponent,
    ShortcutsDocComponent,
    CreatingComponentsDocComponent,
    PublishingDocComponent,
    CoreCommitterComponent
  ]
})
export class UtilsDocModule {}
