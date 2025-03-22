import { Component, Input, OnInit } from '@angular/core';
import { ConsultaCobranca } from 'src/app/shared/model/consulta-cobranca';

@Component({
  selector: 'app-detalhe-consulta-cobranca',
  templateUrl: './detalhe-consulta-cobranca.component.html',
  styleUrls: ['./detalhe-consulta-cobranca.component.scss']
})
export class DetalheConsultaCobrancaComponent  {

  @Input() cobranca: ConsultaCobranca;

  ngOnInit() {
  }

}
