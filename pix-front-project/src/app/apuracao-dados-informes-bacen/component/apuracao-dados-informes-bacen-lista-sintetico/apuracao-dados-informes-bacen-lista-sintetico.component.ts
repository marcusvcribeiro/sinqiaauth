import { ApuracaoDadosInformesBacenService } from './../../service/apuracao-dados-informes-bacen.service';
import { TransacoesDict2Model } from '../../model/dict.model';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { ApuracaoTemproProcessamentoTipo } from 'src/app/shared/model/enum/apuracao-tempo-processamento';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';

@Component({
  selector: 'app-apuracao-dados-informes-bacen-lista-sintetico',
  templateUrl: './apuracao-dados-informes-bacen-lista-sintetico.component.html'
})
export class ApuracaoDadosInformesBacenListaSinteticoComponent implements OnInit {

  public ds: SinqiaDataSource<TransacoesDict2Model>;
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
      exibicao: this.apuracaoTemproProcessamentoTipo.SINTETICO,
      ano: ['', Validators.required],
      mes: [null, Validators.required]
    });

    if(this.filtro){
      this.filtroForm.patchValue(this.filtro);
    }
  }

  private criarDataSource() {
    this.ds = SinqiaDataSource.of<TransacoesDict2Model>()
      .withFilter(this.filtroForm)
      .fromNonPageableService(this.apuracaoDadosInformesBacenService.consultarDadosDictAnaliticos.bind(this.apuracaoDadosInformesBacenService))
      .initialize(true)
      .build();
  }
}
