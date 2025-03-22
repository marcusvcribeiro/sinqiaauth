import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detalhe-ocorrencia-log',
  templateUrl: './detalhe-ocorrencia-log.component.html',
  styleUrls: ['./detalhe-ocorrencia-log.component.scss']
})
export class DetalheOcorrenciaLogComponent implements OnInit {
  @Input() descricao : string;
  formData: FormGroup;
  
  constructor(private formBuild: FormBuilder,
  ) { }

  ngOnInit(): void {
  this.instanceFormGroupForImediata()
  console.log(this.descricao)
}

  private instanceFormGroupForImediata() {
    this.formData = this.formBuild.group({
      formDesc: [this.descricao],
    });
  }

}
