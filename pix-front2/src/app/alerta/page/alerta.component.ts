import { DrawerService } from '@albert/ui';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { Alerta } from 'src/app/shared/model/alerta';
import { TipoAlerta, TIPO_ALERTA_LIST } from 'src/app/shared/model/enum/tipo-alerta';
import { AlertaService } from 'src/app/shared/service/alerta.service';
import { ParametrosGlobaisService } from 'src/app/shared/service/parametros-globais.service';
import { MensagemDrawerComponent } from '../component/mensagem-drawer/mensagem-drawer.component';
import Seg from '../model/seg';

@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.component.html',
  styleUrls: ['./alerta.component.scss']
})
export class AlertaComponent implements OnInit {

  filtroForm: FormGroup;
  tipoAlerta = TipoAlerta;
  tipoAlertaList = TIPO_ALERTA_LIST;
  dataReferencia: Date;
  public ds: SinqiaDataSource<Alerta>;

  seg: Seg = new Seg();

  constructor(
    private drawerService: DrawerService,
    private alertaService: AlertaService,
    private formBuilder: FormBuilder,
    private parametrosGlobaisService: ParametrosGlobaisService
  ) { }

  ngOnInit() {
    this.dataReferencia = this.parametrosGlobaisService.dataReferencia;
    this.criarFormFiltro();
    this.criarDataSource();
  }

  criarFormFiltro() {
    this.filtroForm = this.formBuilder.group({
      assunto: [],
      tipo: [],
      usuario: [],
      dataReferencia: [this.dataReferencia, Validators.required],
    });
  }

  criarDataSource() {
    this.ds = SinqiaDataSource.of<Alerta>()
      .withBody(this.filtroForm)
      .fromService((d: any) =>
        this.alertaService.listarAlerta(d, this.filtroForm.getRawValue()))
      .build();
  }

  async onAbrirAlerta(alerta: Alerta) {
    alerta = new Alerta(alerta);
    const { component } = await this.drawerService.create({
      component: MensagemDrawerComponent,
      size: 'small',
      componentProps: { alerta }
    });

    component.instance.drawerClose.subscribe(v => this.ds.filter());
  }
}
