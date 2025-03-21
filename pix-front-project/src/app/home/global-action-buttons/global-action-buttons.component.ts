import { AuthenticationService } from '@albert/authentication';
import { DialogService, DrawerService } from '@albert/ui';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { SegService } from 'src/app/seg/services/seg.service';
import { AlertaListaComponent } from 'src/app/shared/component/alerta-lista/alerta-lista.component';
import { SegParametro } from 'src/app/shared/model/seg-parametro';
import { AlertaPoolingService } from 'src/app/shared/service/alerta-pooling.service';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { ReservaService } from 'src/app/shared/service/reserva.service';

@Component({
  selector: 'app-global-action-buttons',
  templateUrl: './global-action-buttons.component.html',
  styleUrls: ['./global-action-buttons.component.scss']
})
export class GlobalActionButtonsComponent implements OnInit {
  alertasNaoLidos$: Observable<number>;
  dataReferencia: Date;
  usuario: string;
  ultimoLoginUsuario: Date;
  idleTimeout: number;

  constructor(
    private drawerService: DrawerService,
    private alertaPoolingService: AlertaPoolingService,
    private parametrosGlobaisService: ParametrosGlobaisService,
    private reservaService: ReservaService,
    private messageService: PixMessageService,
    private translateService: TranslateService,
    private dialogService: DialogService,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    this.validaParametroRedirecionaUsuario();
    this.obterAlertasNaoLidos();
    this.dataReferencia = this.parametrosGlobaisService.dataReferencia;
    this.usuario = this.authenticationService.userData.preferred_username;
    this.ultimoLoginUsuario = this.parametrosGlobaisService.dataUltimoLogin;
  }

  mostrarAlertas() {
    this.drawerService.create({
      component: AlertaListaComponent,
      size: 'small',
    });
  }

  obterAlertasNaoLidos() {
    this.alertasNaoLidos$ = this.alertaPoolingService.alertasNaoLidos;
  }

  onConfiguracaoClick() {
    this.router.navigate(['configuracao']);
  }

  onLogoutClick() {
    this.router.navigate(['auth/logout']);
  }

  reprocessarReserva() {
    const textoReprocessamentoEfetuado = this.translateService.instant('reprocessamento.efetuado');

    this.dialogService.create({
      type: 'confirm',
      title: this.translateService.instant('titulo.reprocessarMomento'),
      message: this.translateService.instant('mensagem.operacaoDesfeita'),
      btnPrimaryText: this.translateService.instant('campo.sim'),
      btnSecondaryText: this.translateService.instant('campo.nao'),
      callback: () => {
        this.reservaService.reprocessarReserva(this.dataReferencia).subscribe(() => {
          this.messageService.toastSuccess(textoReprocessamentoEfetuado);
        });
      }
    });
  }

  validaParametroRedirecionaUsuario(){
    if(this.parametrosGlobaisService.controleSessao){
      this.redirecionarLogoutCasoUsuarioFecharTab();
    }else{
      return;
    }
  }

  redirecionarLogoutCasoUsuarioFecharTab(){
    let isPageReloaded :boolean = window.performance.getEntriesByType('navigation').map((nav) => (nav as any).type).includes('reload');
    if (localStorage.getItem('redirectUserLogout') == null){
      return;
    }
    if (String(localStorage.getItem('redirectUserLogout')) === 'true' && !isPageReloaded){
      localStorage.setItem('redirectUserLogout', 'false');
      this.authenticationService.logout();
    }
  }
}
