import { ToastService } from '@albert/ui';
import { AfterViewInit, Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Table } from 'primeng/table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SinqiaDataSource } from '../helper/sinqia-data-source';
import { PreferenciaUsuarioService } from '../service/preferencia-usuario.service';

@Directive({
  selector: '[sq-data-source]'
})
export class SinqiaDataSourceDirective implements OnInit, OnDestroy, AfterViewInit {
  @Input('sq-data-source') dataSource: SinqiaDataSource<any>;

  private unsubscribe$ = new Subject();

  constructor(
    private host: Table,
    private el: ElementRef,
    private preferenciaUsuarioService: PreferenciaUsuarioService,
    private toastService: ToastService,
    private translateService: TranslateService
  ) {
    this.host.paginator = true;
    this.host.lazy = true;
    this.host.sortMode = 'single';
    this.addOpcaoLinhas();
  }

  ngOnInit() {
    this.el.nativeElement.classList.add('sq-sortable-table');

    // TODO: Melhorar construção das mensagens
    this.dataSource.error$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(field => {
        const campoSemCamelCase = field.replace(/([a-z])([A-Z])/g, '$1 $2');
        const campoCompleto = campoSemCamelCase.charAt(0).toUpperCase() + campoSemCamelCase.slice(1);

        this.toastService.create({
          type: 'error',
          text: this.translateService.instant('validacoes.campoInvalido') + ': ' + campoCompleto,
        });
      });

    this.dataSource.reset$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(v => this.host.reset());

    this.dataSource.total$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(v => this.host.totalRecords = v);

    this.dataSource.data$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(v => this.host.value = v);

    this.host.onLazyLoad
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(v => this.dataSource.load(v));

    this.host.paginator = this.dataSource.isPageable;

    if (this.dataSource.initialize) {
      this.dataSource.filter();
    }
  }

  ngAfterViewInit() {
    if (this.dataSource?.isPageable) {
      const paginator = this.el.nativeElement.querySelector('p-paginator');
      paginator.classList.add('alb-p-paginator');
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private addOpcaoLinhas() {
    const numeroLinhas = this.preferenciaUsuarioService.numeroLinhasPagina;
    const opcoesDefault = [10, 15, 20, 30, 50];
    if (opcoesDefault.indexOf(numeroLinhas) < 0) {
      for (const opcao of opcoesDefault) {
        if (opcao > numeroLinhas) {
          opcoesDefault.splice(opcoesDefault.indexOf(opcao), 0, numeroLinhas);
          break;
        }
      }
    }
    this.host.rowsPerPageOptions = opcoesDefault;
    this.host.rows = numeroLinhas;
  }
}
