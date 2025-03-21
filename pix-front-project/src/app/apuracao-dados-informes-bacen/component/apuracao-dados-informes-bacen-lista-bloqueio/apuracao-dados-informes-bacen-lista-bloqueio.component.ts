import { ApuracaoDadosInformesBacenService } from './../../service/apuracao-dados-informes-bacen.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { ApuracaoTemproProcessamentoTipo } from 'src/app/shared/model/enum/apuracao-tempo-processamento';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { TransacoesBloqueio2Model } from '../../model/bloqueio.model';

@Component({
  selector: 'app-apuracao-dados-informes-bacen-lista-bloqueio',
  templateUrl: './apuracao-dados-informes-bacen-lista-bloqueio.component.html'
})
export class ApuracaoDadosInformesBacenListaBloqueio implements OnInit {

  public ds: SinqiaDataSource<TransacoesBloqueio2Model>;
  @Input() filtro;
  filtroForm: FormGroup;
  apuracaoTemproProcessamentoTipo = ApuracaoTemproProcessamentoTipo;
  dataReferencia: Date;

  constructor(private apuracaoDadosInformesBacenService: ApuracaoDadosInformesBacenService,
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
      exibicao: this.apuracaoTemproProcessamentoTipo.BLOQUEIO,
      ano: ['', Validators.required],
      mes: [null, Validators.required]
    });

    if(this.filtro){
      this.filtroForm.patchValue(this.filtro);
    }
  }

  private criarDataSource() {
    this.ds = SinqiaDataSource.of<TransacoesBloqueio2Model>()
      .withFilter(this.filtroForm)
      .fromNonPageableService(this.apuracaoDadosInformesBacenService.consultarDadosTransacoesBloqueadas.bind(this.apuracaoDadosInformesBacenService))
      .initialize(true)
      .build();
  }
}
