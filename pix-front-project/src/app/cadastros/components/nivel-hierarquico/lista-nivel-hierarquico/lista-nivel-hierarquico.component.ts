import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { TranslateService } from '@ngx-translate/core';
import { NivelHierarquicoService } from './../../../service/nivel-hierarquico.service';
import { DrawerService, DialogService } from '@albert/ui';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';

import { EditarNivelHierarquicoFormComponent } from '../editar-nivel-hierarquico-form/editar-nivel-hierarquico-form.component';

import { NivelHierarquico } from '../../../model/nivelHierarquico';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-lista-nivel-hierarquico',
  templateUrl: './lista-nivel-hierarquico.component.html',
  styleUrls: ['./lista-nivel-hierarquico.component.scss']
})
export class ListaNivelHierarquicoComponent implements OnInit {

  constructor(
    private drawerService: DrawerService,
    private nivelHierarquicoService: NivelHierarquicoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private pixMessageService: PixMessageService
    ) { }

  lista: NivelHierarquico[] = [];

  seg: Seg = new Seg();

  @Input() eventUpdate: EventEmitter<any>;

  ngOnInit(): void {
    this.listarNivelHierarquico();

    this.eventUpdate.subscribe(()=>{
      this.listarNivelHierarquico();
    });
  }

  listarNivelHierarquico(): void{
    this.nivelHierarquicoService.listarNivelHierarquico().subscribe(value =>{
      this.lista = value;
    })
  }

  onEdit(item: NivelHierarquico){
    this.drawerService.create({
      component: EditarNivelHierarquicoFormComponent,
      size: 'small',
      componentProps: { edit: item, event: this.eventUpdate }
    });
  }

  onDeletar(item: NivelHierarquico){
    this.dialogService.create({
      type: 'confirm',
      title: this.translateService.instant('titulo.excluirNivelHierarquicoConfirmar'),
      message: this.translateService.instant('mensagem.operacaoDesfeita'),
      btnPrimaryText: this.translateService.instant('campo.sim'),
      btnSecondaryText: this.translateService.instant('campo.nao'),
      callback: () => {
        this.nivelHierarquicoService.excluirNivelHierarquico(item.codNivHie).subscribe(_ => {
          this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
          this.listarNivelHierarquico();
        }
        );
      }
    });
  }

  // this.dialogService.create({
  //   type: 'confirm',
  //   title: this.translateService.instant('titulo.reprocessarMomento'),
  //   message: this.translateService.instant('mensagem.operacaoDesfeita'),
  //   btnPrimaryText: this.translateService.instant('campo.sim'),
  //   btnSecondaryText: this.translateService.instant('campo.nao'),
  //   callback: () => {
  //     this.reservaService.reprocessarReserva(this.dataReferencia).subscribe(() => {
  //       this.messageService.toastSuccess(textoReprocessamentoEfetuado);
  //     });
  //   }
  // });

}
