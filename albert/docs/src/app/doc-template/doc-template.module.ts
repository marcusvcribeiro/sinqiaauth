import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocTemplateComponent,
        DocTemplateTitleDirective,
        DocTemplateExampleDirective,
        DocTemplateCodeDirective } from './doc-template.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    DocTemplateComponent,
    DocTemplateTitleDirective,
    DocTemplateExampleDirective,
    DocTemplateCodeDirective
  ],
  exports: [
    DocTemplateComponent,
    DocTemplateTitleDirective,
    DocTemplateExampleDirective,
    DocTemplateCodeDirective
  ]
})
export class DocTemplateModule { }
