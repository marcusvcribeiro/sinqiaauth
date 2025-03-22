import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CobDescontoDatafixa } from 'src/app/shared/model/cob-desc-data-fixa';
import { ConsultaCobranca } from 'src/app/shared/model/consulta-cobranca';
import { ConsultaCobrancaService } from '../../service/consulta-cobranca.service';

@Component({
  selector: 'app-detalhe-desc-data-fixa',
  templateUrl: './detalhe-desc-data-fixa.component.html',
  styleUrls: ['./detalhe-desc-data-fixa.component.scss']
})
export class DetalheDescDataFixaComponent  implements OnInit{

  data: CobDescontoDatafixa[];
  @Input() cobranca: ConsultaCobranca;

  constructor(
    private consultaCobrancaService: ConsultaCobrancaService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    this.consultaCobrancaService.listDescDataFixa(this.cobranca).subscribe(data => {  
      this.data = data
    });

    this.cdr.detectChanges();
  }
}
