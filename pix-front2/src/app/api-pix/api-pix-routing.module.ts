import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnboardingComponent } from './page/onboarding/onboarding.component';

const routes: Routes = [
  {
    path: 'onboarding',
    component: OnboardingComponent
  },
  {
    path: 'onboarding',
    component: OnboardingComponent
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApiPixRoutingModule { }