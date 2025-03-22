import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, iif, interval, merge, Observable, Subject, Subscription } from 'rxjs';
import { mapTo, shareReplay, startWith, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardRefreshService implements OnDestroy {

  public readonly isRefreshing$: Observable<boolean>
  private refresh = new Subject();
  private refreshSubscription: Subscription;
  private start$ = new Subject();
  private stop$ = new Subject();
  private refreshNow$ = new Subject();
  private intervalTime$: BehaviorSubject<number>;
  private _intervalTime: number;

  private _showDashboardRefresh: Subject<boolean> = new Subject();

  public get refresh$() {
    return this.refresh.asObservable();
  }

  public get refreshObserversCount() {
    return this.refresh.observers.length;
  }

  public get showDashboardRefresh$(): Observable<boolean> {
    return this._showDashboardRefresh.asObservable();
  }

  public get intervalTime(): number {
    return this._intervalTime;
  }


  constructor() {

    const intervalTime = this.getDIntervalTimeFromLocalStorage();
    this.intervalTime$ = new BehaviorSubject(intervalTime ? intervalTime : 5000);

    // Controles de atualização
    const startCommand$ = this.start$.pipe(mapTo(true));
    const stopCommand$ = this.stop$.pipe(mapTo(false));

    // Inicia o controle com o refresh habilitado
    this.isRefreshing$ = merge(startCommand$, stopCommand$).pipe(
      startWith(true),
      // Mantém o último estado para ser possível consulta-lo com late subscribe
      shareReplay(1)
    );

    // Criar observable que avisa quando é necessário atualizar
    const refreshInterval$ = combineLatest(this.isRefreshing$, this.intervalTime$).pipe(

      // Recria o refresh toda vez que houver uma mudança nos parâmetros
      switchMap(([isRunning, refreshTime]) =>

        // Somente cria um interval se estiver executando
        iif(() => isRunning, interval(refreshTime))
      )

    );

    // Observable final (atualizado pelo interval ou pelo comando explicitamente )
    this.refreshSubscription = merge(refreshInterval$, this.refreshNow$).subscribe(x => this.refresh.next(x));

    // atualizando valor de leitura do intervalTime
    this.intervalTime$.subscribe(v => this._intervalTime = v);
  }

  start(): void {
    this.start$.next();
  }

  stop(): void {
    this.stop$.next();
  }

  refreshNow(): void {
    this.refreshNow$.next();
  }

  ngOnDestroy() {
    this.refresh.complete();
    if (this.refreshSubscription) {
      this.refreshSubscription.unsubscribe();
    }
  }

  showDashboardRefresh() {
    this._showDashboardRefresh.next(true);
  }

  hideDashboardRefresh() {
    this._showDashboardRefresh.next(false);
  }

  updateIntervalTime(time) {
    if (time && typeof time === 'number' && time > 0) {
      window.localStorage.setItem('dashboard_interval_time', String(time));
      this.intervalTime$.next(time);
    }
  }

  private getDIntervalTimeFromLocalStorage() {
    const localStorageIntervalTime = window.localStorage.getItem('dashboard_interval_time');
    try {
      return Number(localStorageIntervalTime);
    } catch (e) {
      return null;
    }
  }
}
