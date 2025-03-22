import { BottomSheetService } from '@albert/layout';
import { DrawerService } from '@albert/ui';
import { Component, OnInit, Input, EventEmitter, OnChanges, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';
import { TIPO_ATIVO_LIST } from 'src/app/shared/model/enum/tipo-ativo';
import { DetalheDictTabsComponent } from '../../component/detalhe-dict/detalhe-dict-tabs/detalhe-dict-tabs.component';
import { EditarDictComponent } from '../../component/editar-dict/editar-dict.component';
import { ChaveDict } from '../../model/chave-dict';
import  Seg  from '../../model/seg';
import { DictService } from '../../service/dict.service';
import { Subject } from "rxjs";

@Component({
  selector: 'app-chave-dict',
  templateUrl: './chave-dict-page.component.html',
  styleUrls: ['./chave-dict-page.component.scss']
})
export class ChaveDictPageComponent implements OnInit, OnChanges, OnDestroy {

  filtroForm: FormGroup;
  tipoAtivoList = TIPO_ATIVO_LIST;
  public ds: SinqiaDataSource<ChaveDict>;
  private unsubscribe$ = new Subject();
  seg:Seg = new Seg();

  @Input() eventUpdate: EventEmitter<any>;

  constructor(
    private formBuilder: FormBuilder,
    private dictService: DictService,
    private translateService: TranslateService,
    private bottomSheetService: BottomSheetService,
    private drawerService: DrawerService
  ) { }

  ngOnInit() {
    this.criarFormFiltro();
    this.criarDataSource();
  }

  ngOnChanges(){
    this.ds.filter();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
    this.bottomSheetService.close();
  }

  criarFormFiltro() {
    this.filtroForm = this.formBuilder.group({
      chaveDict: [],
      idTipoChaveDict: [],
      idTipoDono: [],
      documento: [],
      nomeDono: [],
      idTipoConta: [],
      agencia: [],
      numeroConta: [],
      idSituacao: [],
      ativo: [true]
    });
  }

  criarDataSource() {
    this.ds = SinqiaDataSource.of<ChaveDict>()
      .withFilter(this.filtroForm)
      .fromService(this.dictService.listarChaves.bind(this.dictService))
      .build();
  }

  onMensagemSelecionada(mensagemSelecionada) {
    this.bottomSheetService.create({
      component: DetalheDictTabsComponent,
      title: this.translateService.instant('titulo.detalheChave'),
      componentProps: { filtro: mensagemSelecionada}
    });
  }

  async onEditarDict(chave: ChaveDict){
    const { drawerComponent } = await this.drawerService.create({
      component: EditarDictComponent,
      size: 'small',
      componentProps: { edit: chave }
    });

    drawerComponent.instance.close.subscribe(() => {
      this.ds.filter();
    });
  }
}
