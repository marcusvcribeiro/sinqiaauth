import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { TipoAlerta } from 'src/app/shared/model/enum/tipo-alerta';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { takeUntil } from 'rxjs/operators';
import Seg from '../model/seg';

@Component({
  selector: 'app-consulta-log-ocorrencia',
  templateUrl: './consulta-log-ocorrencia.component.html',
  styleUrls: ['./consulta-log-ocorrencia.component.scss']
})
export class ConsultaLogOcorrenciaComponent implements OnInit {
  filtroForm: FormGroup;
  tipoAlerta = TipoAlerta;
  tipoAlertaSelecionada: number;

  filtro$: Subject<any> = new BehaviorSubject(null);
  tipoAlertaExportar$: Subject<number> = new Subject<number>();

  seg: Seg = new Seg();

  private unsubscribe$ = new Subject();
  get ctrl() {
    return this.filtroForm.controls;
  }

  constructor(private formBuilder: FormBuilder,
    private parametrosGlobaisService: ParametrosGlobaisService) {
  }

  ngOnInit() {
    this.filtroForm = this.formBuilder.group({
      dataReferencia: [this.parametrosGlobaisService.dataReferencia, Validators.required]
    });
  }

  filtrarLogs() {
    const filtro = this.filtroForm.getRawValue();
    this.filtro$.next(filtro);
  }

  selectedTabChange(tipoAlerta: number) {
    this.tipoAlertaSelecionada = tipoAlerta;
  }

  onExportarExcel() {
    this.tipoAlertaExportar$.next(this.tipoAlertaSelecionada);
  }

}
