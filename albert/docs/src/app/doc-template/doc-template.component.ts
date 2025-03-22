import { Component, Directive, OnInit, Input } from '@angular/core';

@Component({
  selector: 'doc-template',
  templateUrl: './doc-template.component.html',
  styleUrls: ['./doc-template.component.scss']
})
export class DocTemplateComponent {

  @Input() hideExampleBackground = false;

  showExample = false;

  setShowExample(value: boolean) {
    this.showExample = value;
  }
}
@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'docTemplateTitle',
})
export class DocTemplateTitleDirective {}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'docTemplateExample',
})
export class DocTemplateExampleDirective implements OnInit {

  constructor(
    private docTemplate: DocTemplateComponent
  ) { }

  ngOnInit() {
    this.docTemplate.setShowExample(true);
  }
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'docTemplateCode',
})
export class DocTemplateCodeDirective {}
