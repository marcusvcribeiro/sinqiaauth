import { Component, Input, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { TemposAnsTipo } from 'src/app/shared/model/enum/tempos-ans-tipo';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { TemposAnsService } from '../../service/tempos-ans.service';
import { TemposAnsAnalitico } from 'src/app/shared/model/tempos-ans-analitico';

@Component({
  selector: 'app-tempos-ans-lista-analitico',
  templateUrl: './tempos-ans-lista-analitico.component.html'
})

export class TemposAnsListaAnaliticoComponent implements OnInit {

  public ds: SinqiaDataSource<TemposAnsAnalitico>;
  @Output() lista = new EventEmitter <TemposAnsAnalitico[]>();
  @Input() filtro;
  filtroForm: FormGroup;
  TemposAnsTipo = TemposAnsTipo;
  dataReferencia: Date;

  constructor(private TemposAnsService: TemposAnsService,
    private formBuilder: FormBuilder,
    private parametrosGlobaisService: ParametrosGlobaisService) {
  }

  ngOnInit(): void {
    this.dataReferencia = this.parametrosGlobaisService.dataReferencia;
    this.criarForm();
    this.criarDataSource();
  }

  ngOnChanges(change: SimpleChanges) {
    const { filtro } = change;

    if (this.ds && filtro) {
      this.filtroForm.patchValue(this.filtro);
      this.ds.filter();
    }
  }

  private criarForm() {
    this.filtroForm = this.formBuilder.group({
      exibicao: this.TemposAnsTipo.ANALITICO,
      dataInicio: [this.dataReferencia, Validators.required],
      dataFim: [this.dataReferencia, Validators.required],
      empresa: ['2088', Validators.required]
    });
  }


  private criarDataSource() {
    this.ds = SinqiaDataSource.of<TemposAnsAnalitico>()
      .withFilter(this.filtroForm)
      .fromNonPageableService(this.TemposAnsService.listarTemposAns.bind(this.TemposAnsService))
      .initialize(true)
      .build();
      this.ds.data$.subscribe((data) => {
        this.lista.emit(data);
      });
  }
}
