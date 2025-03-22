import { WidgetComponent } from '@albert/dashboard';
import { DrawerService } from '@albert/ui';
import { ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PosicaoReserva } from 'src/app/shared/model/posicao-reserva';
import { WidgetCustomConfig } from 'src/app/shared/model/widget-custom-config';
import { AcompanhamentoReservaService } from '../../service/acompanhamento-reserva.service';
import { CamposReservaComponent } from '../campos-reserva/campos-reserva.component';

@Component({
  selector: 'app-acompanhamento-reserva',
  templateUrl: './acompanhamento-reserva-widget.component.html',
  styleUrls: ['./acompanhamento-reserva-widget.component.scss']
})
export class AcompanhamentoReservaWidgetComponent implements OnInit, OnDestroy {
  title: string;

  posicaoReserva$: Observable<PosicaoReserva[]>;

  posicaoReservaSelecionados: PosicaoReserva[] = [];

  private unsubscribe$ = new Subject();

  constructor(private drawerService: DrawerService,
    private acompanhamentoReservaService: AcompanhamentoReservaService,
    @Inject(WidgetComponent) private widgetComponent: WidgetComponent,
    private translateService: TranslateService,
    private changeDetectorRef: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {
    this.posicaoReserva$ = this.acompanhamentoReservaService.listarPosicaoReservaDia();
    this.habilitarConfigButton();
    this.carregarWidgetCustomData();
    this.criarListaPosicoes();
  }

  ngOnDestroy(): void {
    this.acompanhamentoReservaService.removerDashboardRefresh();
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private habilitarConfigButton() {
    this.widgetComponent.configButtonClicked.subscribe(v => {
      this.selecionarCampos().then();
    });
  }

  async selecionarCampos() {
    const { component } = await this.drawerService.create({
      component: CamposReservaComponent,
      size: 'medium',
      title: this.translateService.instant('titulo.selecaoCampo'),
      componentProps: {
        camposSelecionados: this.posicaoReservaSelecionados,
        titulo: this.title
      }
    });
    component.instance.widgetCustomConfigChanged.subscribe(v => this.atualizarDados(v));
  }

  criarListaPosicoes() {
    this.acompanhamentoReservaService.adicionarDashboardRefresh();
    this.acompanhamentoReservaService.posicaoReserva.pipe(takeUntil(this.unsubscribe$)).subscribe(v => {
      for (let posicao of this.posicaoReservaSelecionados) {
        const posicaoAtualizada = v.get(posicao.campo);
        posicao.valor = posicaoAtualizada.valor;
      }
    });
  }

  atualizarDados(widgetCustomConfig: WidgetCustomConfig) {
    this.title = widgetCustomConfig.titulo;
    setTimeout(v => this.widgetComponent.setCustomData(widgetCustomConfig));
  }

  carregarWidgetCustomData() {
    this.widgetComponent.customDataLoaded.subscribe(valor => {
      if (valor) {
        this.title = valor.titulo;
        this.posicaoReservaSelecionados = valor.camposPosicaoReserva;
        this.changeDetectorRef.detectChanges();
        this.widgetComponent.updateTitleWidget();
      }
    });
  }
}
