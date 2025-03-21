import { DialogService, DrawerService } from '@albert/ui';
import { Component, Input, OnChanges, OnInit, SimpleChanges, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioRecebedorService } from 'src/app/api-pix/service/usuario-recebedor.service';
import { ParticipanteIndireto } from 'src/app/cadastros/model/participanteIndireto';
import { ParticipanteIndiretoAcesso } from 'src/app/cadastros/model/participanteIndiretoAcesso';
import { ParticipanteIndiretoService } from 'src/app/cadastros/service/participante-indireto.service';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';

@Component({
  selector: 'app-acesso-participante-indireto-lista',
  templateUrl: './acesso-participante-indireto-lista.component.html',
  styleUrls: ['./acesso-participante-indireto-lista.component.scss']
})
export class AcessoParticipanteIndiretoListaComponent implements OnInit {

  @Input() filtro: any;

  formData!: FormGroup;
  listaQuantidadeLinhas: number[];
  numeroLinhas: number;
  participantesAcesso: ParticipanteIndiretoAcesso[]=[];
  @Input() partIndireto?: ParticipanteIndireto;
  

  constructor(
    private formBuilder: FormBuilder, 
    private participanteIndiretoService: ParticipanteIndiretoService,
    private pixMessageService: PixMessageService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    ) { }

  ngOnInit(): void {
    this.loadFormulario();
    this.listaAcessoParticipanteIndireto();
  }

  private listaAcessoParticipanteIndireto()
  {
    this.participanteIndiretoService.obterAcessoParticipanteIndireto(this.partIndireto.idEntPar)
    .subscribe(
      data => {this.participantesAcesso = data}
      );
  }

  loadFormulario() {
     this.formData = this.formBuilder.group({
       clientId: ['', [Validators.required, Validators.pattern(/^[0-9]*/i)]]
     });
  }

  onInserir() {
    var body = {
      complemento: this.formData.controls.clientId.value
    }
    this.participanteIndiretoService.criarAcessoParticipanteIndireto(body, this.partIndireto.idEntPar)
    .subscribe(()=>{
      this.listaAcessoParticipanteIndireto();
      this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
      this.formData.reset();
    });
  }

  onDeletar(item: number){
    this.dialogService.create({
      type: 'confirm',
      title: this.translateService.instant('titulo.excluirParticipanteIndiretoConfirmar'),
      message: this.translateService.instant('mensagem.operacaoDesfeita'),
      btnPrimaryText: this.translateService.instant('campo.sim'),
      btnSecondaryText: this.translateService.instant('campo.nao'),
      callback: () => {
        this.participanteIndiretoService.deletarAcessoParticipanteIndireto(item).subscribe(_ => {
          this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
          this.listaAcessoParticipanteIndireto();
        }
        );
      }
    });
  }
}
