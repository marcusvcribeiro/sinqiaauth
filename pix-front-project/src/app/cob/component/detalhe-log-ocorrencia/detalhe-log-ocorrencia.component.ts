import { DrawerService } from '@albert/ui';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CobLogOcorrencia } from 'src/app/shared/model/cob-log-ocorrencia';
import { ConsultaCobranca } from 'src/app/shared/model/consulta-cobranca';
import { ConsultaCobrancaService } from '../../service/consulta-cobranca.service';
import { DetalheOcorrenciaLogComponent } from '../detalhe-ocorrencia-log/detalhe-ocorrencia-log.component';

@Component({
  selector: 'app-detalhe-log-ocorrencia',
  templateUrl: './detalhe-log-ocorrencia.component.html',
  styleUrls: ['./detalhe-log-ocorrencia.component.scss']
})
export class DetalheLogOcorrenciaComponent implements OnInit{

  @Input() cobranca : ConsultaCobranca;
  data
  constructor(
    private consultaCobrancaService: ConsultaCobrancaService,
    private cdr: ChangeDetectorRef,
    private drawerService: DrawerService
  ) { }

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    this.consultaCobrancaService.listLogQrCodeOcorrencia(this.cobranca).subscribe(data => {
      console.log(data[0])
    this.data = data});
    this.cdr.detectChanges();
  }

  onDetalhe( desc: string){
    this.drawerService.create({
      component: DetalheOcorrenciaLogComponent,
      size: 'small',
      componentProps: { descricao: desc}
    });  
}


}
