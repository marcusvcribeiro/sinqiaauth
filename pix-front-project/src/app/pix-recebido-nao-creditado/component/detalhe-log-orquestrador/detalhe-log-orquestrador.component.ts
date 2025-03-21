import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { PixNaoCreditadoCCO } from 'src/app/shared/model/pix-nao-creditado-cco';
import { PixRecebidoNaoCreditadoService } from '../../service/pix-recebido-nao-creditado.service';
import { DetalheOrquestradorLogComponent } from '../detalhe-orquestrador-log/detalhe-orquestrador-log.component';
import { DrawerService } from '@albert/ui';
import { PixNaoCreditadoLogOrq } from 'src/app/shared/model/pix-nao-creditado-log-orq';
import { TipoAlerta } from 'src/app/shared/model/enum/tipo-alerta';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-detalhe-log-orquestrador',
  templateUrl: './detalhe-log-orquestrador.component.html',
  styleUrls: ['./detalhe-log-orquestrador.component.scss']
})
export class DetalheLogOrquestradorComponent implements OnInit {
  
  @Input() mensagem : PixNaoCreditadoCCO;
  data: PixNaoCreditadoLogOrq[] = [];
  tipoAlerta = TipoAlerta;
  selected: PixNaoCreditadoLogOrq;
  constructor(
    private pixRecebidoNaoCreditado: PixRecebidoNaoCreditadoService,
    private cdr: ChangeDetectorRef,
    private drawerService: DrawerService,
    private translateService: TranslateService
    ) { }

  ngOnInit() {
    this.loadTable();
  }

  loadTable() {
    this.pixRecebidoNaoCreditado.listLogOrq(this.mensagem.idUniOpe).subscribe(data => {
    this.data = data});
    this.cdr.detectChanges();
  }
  async onDetalhe(log: PixNaoCreditadoLogOrq) {
    this.selected = log;
    const { drawerComponent } = await this.drawerService.create({
      component: DetalheOrquestradorLogComponent,
      size: 'medium',
      componentProps: { pixNaoCreditado: log },
      title: this.translateService.instant('tabs.logOrquestrador'),
    });
    drawerComponent.instance.close.subscribe(() => {
      this.selected = null;
    });
  }
}
