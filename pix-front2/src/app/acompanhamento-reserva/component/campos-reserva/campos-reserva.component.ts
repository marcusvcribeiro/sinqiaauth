import { DrawerService, ToastService } from '@albert/ui';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { PosicaoReserva } from 'src/app/shared/model/posicao-reserva';
import { WidgetCustomConfig } from 'src/app/shared/model/widget-custom-config';
import { AcompanhamentoReservaService } from '../../service/acompanhamento-reserva.service';

@Component({
  selector: 'app-campos-reserva',
  templateUrl: './campos-reserva.component.html',
  styleUrls: ['./campos-reserva.component.scss']
})
export class CamposReservaComponent implements OnInit {
  @Output() widgetCustomConfigChanged = new EventEmitter<WidgetCustomConfig>();
  @Input() camposSelecionados: PosicaoReserva[] = [];
  @Input() titulo: string;

  camposSelecionadosLocais: PosicaoReserva[] = [];
  posicaoReserva: PosicaoReserva[] = [];

  nome: FormControl;

  constructor(
    private acompanhamentoReservaService: AcompanhamentoReservaService,
    private toastService: ToastService,
    private translateService: TranslateService,
    private drawerService: DrawerService) {}

  ngOnInit(): void {
    this.acompanhamentoReservaService.listarPosicaoReservaDia().subscribe(v => {
      const camposSelecionadosMap = this.camposSelecionados.map(cs => cs.campo);
      this.posicaoReserva = v.filter(p => !camposSelecionadosMap.includes(p.campo));
    });

    this.nome = new FormControl(this.titulo, Validators.required);
    this.camposSelecionadosLocais = JSON.parse(JSON.stringify(this.camposSelecionados));
  }

  selecionar(posicao: PosicaoReserva) {
    this.posicaoReserva.splice(this.posicaoReserva.indexOf(posicao), 1);
    this.camposSelecionadosLocais.push(posicao);
  }

  remover(posicao: PosicaoReserva) {
    this.camposSelecionadosLocais.splice(this.camposSelecionadosLocais.indexOf(posicao), 1);
    this.posicaoReserva.splice(0, 0, posicao);
  }

  moverCima(index: number) {
    const posicaoReservaSelecionado = this.camposSelecionadosLocais[index];
    this.camposSelecionadosLocais.splice(index, 1);
    this.camposSelecionadosLocais.splice(index - 1, 0, posicaoReservaSelecionado);
  }

  moverBaixo(index: number) {
    const posicaoReservaSelecionado = this.camposSelecionadosLocais[index];
    this.camposSelecionadosLocais.splice(index, 1);
    this.camposSelecionadosLocais.splice(index + 1, 0, posicaoReservaSelecionado);
  }

  destacar(index: number) {
    const posicaoReservaSelecionado = this.camposSelecionadosLocais[index];
    posicaoReservaSelecionado.destaque = !posicaoReservaSelecionado.destaque;
    this.camposSelecionadosLocais.splice(index, 1, posicaoReservaSelecionado);
  }

  emitirValor() {
    if (this.nome.invalid) {
      this.toastService.create({
        type: 'error',
        text: this.translateService.instant('validacoes.campoInvalido') + ': ' + this.translateService.instant('campo.tituloWidget'),
      });
      return;
    }
    this.camposSelecionados = this.camposSelecionadosLocais;

    const wcc = new WidgetCustomConfig();
    wcc.camposPosicaoReserva = this.camposSelecionados;
    wcc.titulo = this.nome.value;
    this.widgetCustomConfigChanged.emit(wcc);
    this.drawerService.close();
  }
}
