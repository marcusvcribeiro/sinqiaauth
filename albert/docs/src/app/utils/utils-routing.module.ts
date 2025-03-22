import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationDocComponent } from './pages/authentication/authentication.component';
import { CliDocComponent } from './pages/cli/cli.component';
import { ContributingDocComponent } from './pages/contributing/contributing.component';
import { DashboardDocComponent } from './pages/dashboard/dashboard.component';
import { GetStartedDocComponent } from './pages/get-started/get-started.component';
import { CreatingComponentsDocComponent } from './pages/creating-components/creating-components.component';
import { PrProcessDocComponent } from './pages/pr-process/pr-process.component';
import { ReleasesDocComponent } from './pages/releases/releases.component';
import { SchematicsDocComponent } from './pages/schematics/schematics.component';
import { ShortcutsDocComponent } from './pages/shortcuts/shortcuts.component';
import { PublishingDocComponent } from './pages/publishing/publishing.component';
import { CoreCommitterComponent } from './pages/core-committer/core-committer.component';

const routes: Routes = [
  {
    path: 'authentication',
    component: AuthenticationDocComponent,
  },
  {
    path: 'cli',
    component: CliDocComponent,
  },
  {
    path: 'contributing',
    component: ContributingDocComponent,
  },
  {
    path: 'dashboard',
    component: DashboardDocComponent,
  },
  {
    path: 'get-started',
    component: GetStartedDocComponent,
  },
  {
    path: 'pr-process',
    component: PrProcessDocComponent,
  },
  {
    path: 'releases',
    component: ReleasesDocComponent,
  },
  {
    path: 'schematics',
    component: SchematicsDocComponent,
  },
  {
    path: 'shortcuts',
    component: ShortcutsDocComponent,
  },
  {
    path: 'creating-components',
    component: CreatingComponentsDocComponent
  },
  {
    path: 'publishing',
    component: PublishingDocComponent
  },
  {
    path: 'core-committer',
    component: CoreCommitterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilsRoutingModule { }
