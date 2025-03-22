import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ConsultaCobranca } from 'src/app/shared/model/consulta-cobranca';
import { InformacoesAdicionais } from 'src/app/shared/model/info-adicionais';
import { ConsultaCobrancaService } from '../../service/consulta-cobranca.service';

@Component({
  selector: 'app-detalhe-info-adicionais',
  templateUrl: './detalhe-info-adicionais.component.html',
  styleUrls: ['./detalhe-info-adicionais.component.scss']
})
export class DetalheInfoAdicionaisComponent implements OnInit  {

  data: InformacoesAdicionais[];
  @Input() cobranca: ConsultaCobranca;
  constructor(
    private consultaCobrancaService: ConsultaCobrancaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    this.consultaCobrancaService.listInfoAdicional(this.cobranca).subscribe(data => {  
      this.data = data
    });

    this.cdr.detectChanges();
  }
}
