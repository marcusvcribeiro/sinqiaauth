import { DrawerService } from '@albert/ui';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject, Subscription, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardRefreshService } from '../../service/dashboard-refresh.service';
import { AppDashboardModule } from '../../dashboard.module';
import { DashboardRefreshOptionsComponent } from '../dashboard-refresh-options/dashboard-refresh-options.component';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { DateFormatHelper } from 'src/app/shared/helper/date-format-helper';
import { AcompanhamentoReservaWidgetComponent } from 'src/app/acompanhamento-reserva/component/acompanhamento-reserva-widget/acompanhamento-reserva-widget.component';
import { DynamicLoaderConfigService } from '@albert/dashboard';
import { DashboardSolicitaSaqueComponent } from '../dashboard-solicita-saque/dashboard-solicita-saque.component';
import { DashboardSolicitaDepositoComponent } from '../dashboard-solicita-deposito/dashboard-solicita-deposito.component';
import Seg from '../../model/seg';
import * as moment from 'moment';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-refresh',
  templateUrl: './dashboard-refresh.component.html',
  styleUrls: ['./dashboard-refresh.component.scss']
})
export class DashboardRefreshComponent implements OnInit, OnDestroy {
  hasRefreshObservers: boolean;
  isRefreshing: boolean;
  date = new Date();
  onChange;
  page: string = "";
  private subscription: Subscription;
  private unsubscribe$ = new Subject();
  @Output() TimerExpired: EventEmitter<any> = new EventEmitter<any>();
    @Input() SearchDate: moment.Moment = moment();
@Input() ElapsTime: number = 1;
searchEndDate: moment.Moment;
remainingTime: number;
minutes: number;
seconds: number;
everySecond: Observable<number> = timer(0, 1000);
  seg:Seg = new Seg();
  constructor(
    private router: Router,
    private refreshService: DashboardRefreshService,
    private drawerService: DrawerService,
    private translateService: TranslateService,
    private parametroService: ParametrosGlobaisService,
    private dynamicLoaderConfig: DynamicLoaderConfigService,
    private ref: ChangeDetectorRef) 
    {
      this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
  }

  goToPage() {
    this.page = window.location.href
    window.location.href= this.page 
}

  ngOnInit(): void {
    this.page = window.location.href
    this.refreshComponent()
    if(window.location.href!==undefined && window.location.href.includes("dashboard")){
    this.subscription = this.everySecond.subscribe((seconds) => {
      var currentTime: moment.Moment = moment();
      this.remainingTime = this.searchEndDate.diff(currentTime)
      this.remainingTime = this.remainingTime / 1000;
      
   
      if(window.location.href!==undefined && window.location.href.includes("dashboard")){
      if (this.remainingTime <= 0) {
        if (this.isRefreshing && window.location.href!==undefined && window.location.href.includes("dashboard")){  
      this.SearchDate = moment();
      this.searchEndDate = this.SearchDate.add(this.ElapsTime, "minutes");
      //this.goToPage()
      this.onChangeDate('click')
      this.refreshComponent()   
      this.refreshService.refreshNow()
      this.TimerExpired.emit();
    }else{
      this.remainingTime=30000
    }
      }
      else {
      this.minutes = Math.floor(this.remainingTime / 60);
      this.seconds = Math.floor(this.remainingTime - this.minutes * 60);
              }
      this.ref.markForCheck()
            }
      })
    }
  }

  async opcoesRefreshDashboardRefresh() {
    await this.drawerService.create({
      component: DashboardRefreshOptionsComponent,
      size: 'small',
      title: this.translateService.instant('titulo.dashboardRefreshOptions'),
      componentProps: {
      }
    });
    setTimeout( this.drawerService.close, 2000);
  }

refreshComponent(){
  this.refreshService.showDashboardRefresh$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => this.hasRefreshObservers = v)
  this.refreshService.isRefreshing$.pipe(takeUntil(this.unsubscribe$)).subscribe(v => this.isRefreshing = v);
  this.date = this.parametroService.dataReferencia;
  this.parametroService.dataReferenciaDashboard = null;
}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  
  start(): void {
    this.refreshService.start();
    this.ngOnInit()
  }
  stop(): void {
    this.refreshService.stop();
  }
  refreshNow(): void {
    this.ngOnInit()
    this.refreshService.refreshNow();
  }
  async opcoesRefreshDashboard() {
    await this.drawerService.create({
      component: DashboardRefreshOptionsComponent,
      size: 'small',
      title: this.translateService.instant('titulo.dashboardRefreshOptions'),
      componentProps: {
      }
    });
  }
  async drawerSolicitaSaque(){
    await this.drawerService.create({
      component: DashboardSolicitaSaqueComponent,
      size: 'small',
      title: this.translateService.instant('titulo.drawerSolicitaSaque'),
      componentProps: {
      }
    })
  }
  async drawerSolicitaDeposito() {
    await this.drawerService.create({
      component: DashboardSolicitaDepositoComponent,
      size: 'small',
      title: this.translateService.instant('titulo.drawerSolicitaDeposito'),
      componentProps: {
      }
    })
  }
  onChangeDate($event) {
    if (!$event) { return; }
    this.parametroService.dataReferenciaDashboard = $event.date;
    this.date = $event.date;
    this.dynamicLoaderConfig.loadComponentsConfiguration([{
      key: 'AcompanhamentoReservaWidgetComponent',
      component: AcompanhamentoReservaWidgetComponent
    }]);
  }
  
}
