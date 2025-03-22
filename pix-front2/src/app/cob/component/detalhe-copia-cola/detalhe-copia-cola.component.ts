import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detalhe-copia-cola',
  templateUrl: './detalhe-copia-cola.component.html',
  styleUrls: ['./detalhe-copia-cola.component.scss']
})
export class DetalheCopiaColaComponent implements OnInit {

  @Input() descricao : string;
  formData: FormGroup;
  
  constructor(private formBuild: FormBuilder,
  ) { }

  ngOnInit(): void {
  this.instanceFormGroup()
  console.log(this.descricao)
}

  private instanceFormGroup() {
    this.formData = this.formBuild.group({
      formDesc: [this.descricao],
    });
  }
}
