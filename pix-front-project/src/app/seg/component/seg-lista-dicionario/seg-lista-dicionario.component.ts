import { DialogService, DrawerService } from '@albert/ui';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { PreferenciaUsuarioService } from 'src/app/shared/service/preferencia-usuario.service';
import { Dicionario } from '../../model/dicionario';
import { PermissoesSeg } from '../../model/permissoes-seg';
import { SegService } from '../../services/seg.service';
import { SegFormDicionarioComponent } from '../seg-form-dicionario/seg-form-dicionario.component';
@Component({
  selector: 'app-seg-lista-dicionario',
  templateUrl: './seg-lista-dicionario.component.html',
  styleUrls: ['./seg-lista-dicionario.component.scss']
})
export class SegListaDicionarioComponent implements OnInit {

  @Input() eventUpdate: EventEmitter<any>;
  @Input() filtro?: string;
  @Output() listaDicionario = new EventEmitter<Dicionario[]>();

  constructor(
    private segService: SegService, 
    private drawerService: DrawerService, 
    private preferenciasUsuario: PreferenciaUsuarioService,
    private dialogService: DialogService,
    private translateService: TranslateService,
    private pixMessageService: PixMessageService,
    ) { }

  numeroLinhas: number;
  listaQuantidadeLinhas: number[];
  lista: Dicionario[];
  permissoes: PermissoesSeg = new PermissoesSeg();
  ngOnInit(): void {
    this.loadData();

    this.eventUpdate.subscribe(()=>{
      this.loadData();
    });
    this.numeroLinhas = this.preferenciasUsuario.numeroLinhasPagina;
    this.listaQuantidadeLinhas = this.preferenciasUsuario.listaLinhaPreferenciaUsuario;
  }

  private loadData(){
    this.segService.getSenhasFracas().subscribe(data => {
      this.lista = data;
      this.loadListDicionario();
    })  
  }

  onEdit(item: Dicionario){
    this.drawerService.create({
      component: SegFormDicionarioComponent,
      size: 'small',
      componentProps: { edit: item, event: this.eventUpdate }
    });
  }

  loadListDicionario(){
    this.listaDicionario.emit(this.lista);
  }
  
  onRemover(senha: number){
    this.dialogService.create({
      type: 'confirm',
      title: this.translateService.instant('titulo.confirmarOperacao'),
      message: this.translateService.instant('mensagem.operacaoDesfeita'),
      btnPrimaryText: this.translateService.instant('campo.sim'),
      btnSecondaryText: this.translateService.instant('campo.nao'),
      callback: () => {
        this.segService.removerSenhaFraca(senha).subscribe(() => {
          this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
          this.loadData();
        })
      }}
    );
      
    
  }

}
