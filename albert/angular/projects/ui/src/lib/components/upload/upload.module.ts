import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InputModule } from '../input/input.module';
import { UploadBadgeComponent } from './upload-badge/upload-badge.component';
import { UploadLabelDirective } from './upload-label.directive';
import { UploadPreviewComponent } from './upload-preview/upload-preview.component';
import { UploadComponent } from './upload.component';

@NgModule({
  imports: [CommonModule, InputModule ],
  declarations: [
  UploadComponent,
  UploadPreviewComponent,
  UploadBadgeComponent,
  UploadLabelDirective],
  exports: [
    UploadComponent,
    UploadPreviewComponent,
    UploadLabelDirective,
    UploadBadgeComponent,
  ],

})
export class UploadModule { }
