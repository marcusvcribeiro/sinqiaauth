import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { DrawerService } from '@albert/ui';
import { ParametrosGerais } from 'src/app/shared/model/parametros-gerais';
import { roundToNearestMinutesWithOptions } from 'date-fns/fp';
import { ConsultaMensagemService } from 'src/app/consulta-mensagem/service/consulta-mensagem.service';
import Seg from '../../../model/seg';
import { DatePipe } from '@angular/common';
import { TransacaoAgendadas } from 'src/app/shared/model/transacaoAgendadas';
import { Table } from 'primeng/table';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { ConfiguracaoService } from 'src/app/configuracao/service/configuracao.service';
import { ParametroFormTransacaoagendadaComponent } from '../parametro-form-transacaoagendada/parametro-form-transacaoagendada.component';

@Component({
  selector: 'app-parametro-transacaoagendada',
  templateUrl: './parametro-transacaoagendada.component.html',
  styleUrls: ['./parametro-transacaoagendada.component.scss']
})
export class ParametroTransacaoagendadaComponent implements OnInit {
  
  @Input() listaTransacaoAgendada: TransacaoAgendadas[];
  @Input() parametrosgerais: ParametrosGerais;
  @Input() eventUpdate: EventEmitter<any>;
  @Output() listaTransacaoAgendadaAtualizada =  new EventEmitter<TransacaoAgendadas[]>();
  @Output() ListaDeletada =  new EventEmitter<boolean>(false);
  
  transacaoAgendada: TransacaoAgendadas;

  seg: Seg = new Seg();
  constructor(private configService: ConfiguracaoService,
    private drawerService: DrawerService, private pixMessageService: PixMessageService, private consultaMensagemService: ConsultaMensagemService) { }

  ngOnInit(): void {
  }

  onEdit(lista: TransacaoAgendadas): void{
    this.transacaoAgendada = lista;
    this.drawerService.create({
      component: ParametroFormTransacaoagendadaComponent,
      size: 'small',
      componentProps: { edit: lista, parametro: this.parametrosgerais, event: this.eventUpdate}
    });
  }

  remover(lista: TransacaoAgendadas){
    var index = this.listaTransacaoAgendada.indexOf(lista);
    if (index >-1){
      this.listaTransacaoAgendada.splice(index, 1)
    }

    this.listaTransacaoAgendadaAtualizada.emit(this.listaTransacaoAgendada);
    this.ListaDeletada.emit(true);
  }
  
}
