import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { TipoAlerta } from '../../model/enum/tipo-alerta';
import { Alerta } from '../../model/alerta';
import { AlertaService } from '../../service/alerta.service';
import { ParametrosGlobaisService } from '../../service/parametros-globais.service';
import { DrawerService } from '@albert/ui';
import { environment } from 'src/environments/environment';
import { MensagemDrawerComponent } from 'src/app/alerta/component/mensagem-drawer/mensagem-drawer.component';

@Component({
  selector: 'app-alerta-lista',
  templateUrl: './alerta-lista.component.html',
  styleUrls: ['./alerta-lista.component.scss']
})
export class AlertaListaComponent implements OnInit {
  alertas$: Observable<Alerta[]>;

  tipoAlerta = TipoAlerta;

  constructor(private alertaService: AlertaService,
    private parametrosGlobaisService: ParametrosGlobaisService,
    private router: Router,
    private drawerService: DrawerService
  ) {
  }

  ngOnInit(): void {
    moment.locale(environment.defaultLanguage);
    const dataReferencia = this.parametrosGlobaisService.dataReferencia;
    this.alertas$ = this.alertaService.listarAlerta({ limit: 20, page: 0, dataReferencia }, null)
      .pipe(map(r => {
        r.records.map(v => {
          v.mensagemRecebimento = this.mensagemRecebimento(v.dataEnvio);
          return v;
        });
        return r.records;
      }));
  }

  mensagemRecebimento(data: Date): string {
    const dataAtual = moment();
    const dataRecebimento = moment(data);
    const dias = dataAtual.diff(dataRecebimento, 'days');
    if (dias === 0) {
      return this.alertaDiaAtual(dataAtual, dataRecebimento);
    }
    if (dias === 1) {
      return this.alertaDiaAnterior(dataRecebimento);
    }
    if (dias >= 2 && dias <= 7) {
      return this.alertaUltimaSemana(dataRecebimento);
    }

    return dataRecebimento.format('DD/MM/YYYY');
  }

  alertaDiaAtual(dataAtual, dataRecebimento) {
    const minutos = dataAtual.diff(dataRecebimento, 'minutes');
    if (minutos < 60) {
      return `Hoje há ${minutos} minutos`;
    } else {
      const horas = dataAtual.diff(dataRecebimento, 'hour');
      return `Hoje há ${horas} horas`;
    }
  }

  alertaDiaAnterior(dataRecebimento) {
    const hora = dataRecebimento.format('HH:mm');
    return `Ontem às ${hora}`;
  }

  alertaUltimaSemana(dataRecebimento) {
    const diaSemana = moment(dataRecebimento).format('dddd');
    const hora = dataRecebimento.format('HH:mm');
    return `${diaSemana} às ${hora}`;
  }

  exibirMais() {
    this.router.navigate(['alertas']);
  }

  onAbrirAlerta(alerta: Alerta) {

    alerta = new Alerta(alerta);
    this.drawerService.create({
      component: MensagemDrawerComponent,
      size: 'small',
      componentProps: { alerta }
    });
  }
}
