import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { TranslateService } from '@ngx-translate/core';
import { ParticipanteIndiretoService } from '../../../service/participante-indireto.service';
import { DrawerService, DialogService } from '@albert/ui';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { EditarParticipanteIndiretoFormComponent } from '../editar-participante-indireto-form/editar-participante-indireto-form.component';
import { ParticipanteIndireto } from '../../../model/participanteIndireto';
import Seg from 'src/app/cadastros/model/seg';
import { AcessoParticipanteIndiretoListaComponent } from '../acesso-participante-indireto-lista/acesso-participante-indireto-lista.component';

@Component({
  selector: 'app-lista-participante-indireto',
  templateUrl: './lista-participante-indireto.component.html',
  styleUrls: ['./lista-participante-indireto.component.scss']
})
export class ListaParticipanteIndiretoComponent implements OnInit {

  constructor(
    private drawerService: DrawerService,
    private ParticipanteIndiretoService: ParticipanteIndiretoService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private pixMessageService: PixMessageService
    ) { }

  lista: ParticipanteIndireto[] = [];

  seg: Seg = new Seg();

  @Input() eventUpdate: EventEmitter<any>;

  ngOnInit(): void {
    this.listarParticipanteIndireto();
    this.eventUpdate.subscribe(()=>{
      this.listarParticipanteIndireto();
    });
  
  }

  listarParticipanteIndireto(): void{
    this.ParticipanteIndiretoService.listarParticipanteIndireto().subscribe(value =>{
      this.lista = value;
      this.lista.forEach(e => {
        if(e.idEstOpe == 'A') {
          e.idEstOpe= "Ativo";
        } else{
          e.idEstOpe="Inativo";
        }
      });
    })
  }

  onEdit(item: ParticipanteIndireto){
    this.drawerService.create({
      component: EditarParticipanteIndiretoFormComponent,
      size: 'small',
      componentProps: { edit: item, event: this.eventUpdate }
    });
  }

  onDeletar(item: ParticipanteIndireto){
    this.dialogService.create({
      type: 'confirm',
      title: this.translateService.instant('titulo.excluirParticipanteIndiretoConfirmar'),
      message: this.translateService.instant('mensagem.operacaoDesfeita'),
      btnPrimaryText: this.translateService.instant('campo.sim'),
      btnSecondaryText: this.translateService.instant('campo.nao'),
      callback: () => {
        this.ParticipanteIndiretoService.excluirParticipanteIndireto(item.idEntPar).subscribe(_ => {
          this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
          this.listarParticipanteIndireto();
        }
        );
      }
    });
  }

  onAdicionarAcesso(partIndireto: ParticipanteIndireto){
    this.drawerService.create({
      component: AcessoParticipanteIndiretoListaComponent,
      title: `Acesso participante ${partIndireto.nomEntPar}`,
      size: 'medium',
      componentProps: { partIndireto: partIndireto }
    })
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
