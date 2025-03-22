import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { GruposUsuarioEditarComponent } from './../grupos-usuario-editar/grupos-usuario-editar.component';
import { UsuariosGrupoAdicionarComponent } from './../usuarios-grupo-adicionar/usuarios-grupo-adicionar.component';
import { BottomSheetService } from '@albert/layout';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { DrawerService, DialogService } from '@albert/ui';

import { GrupoUsuario } from '../../../model/grupoUsuario';

import { GrpUsuarioFormComponent } from '../grp-usuario-form/grp-usuario-form.component';

import { AlcadaService } from 'src/app/cadastros/service/alcada.service';
import { UsuariosGrupoVisualizacaoComponent } from '../usuarios-grupo-visualizacao/usuarios-grupo-visualizacao.component';
import { Observable } from 'rxjs';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-lista-grupos-usuarios',
  templateUrl: './lista-grupos-usuarios.component.html',
  styleUrls: ['./lista-grupos-usuarios.component.scss']
})
export class ListaGruposUsuariosComponent implements OnInit {
  @Input() readMore: boolean = false;

  constructor(
    private alcadaService: AlcadaService,
    private drawerService: DrawerService,
    private dialogService: DialogService,
    private pixMessageService: PixMessageService,
    private translateService: TranslateService) { }

  lista: GrupoUsuario[] = [];

  @Input() eventUpdate: EventEmitter<any>;
  @Input() filtro?: string;

  seg: Seg = new Seg();

  ngOnInit(): void {
    this.listarGruposUsuarios();

    this.eventUpdate.subscribe(() => {
      this.listarGruposUsuarios()
    })
  }

  private listarGruposUsuarios(){
    this.alcadaService.getGrupos().subscribe(grp => {
      this.lista = grp;
    })
  }

  onExcluirGrupo(grupo: GrupoUsuario){
    this.alcadaService.getUsuariosGrupo(grupo.idGrpUsu).subscribe(value =>{
      if(value.length !== 0){
        this.pixMessageService.toastErro(this.translateService.instant('validacoes.grupoVinculadoAUsuarios'));
      }
      else{
        this.dialogService.create({
          type: 'confirm',
          title: this.translateService.instant('titulo.excluirGrupoUsuarioConfirmar'),
          message: this.translateService.instant('mensagem.operacaoDesfeita'),
          btnPrimaryText: this.translateService.instant('campo.sim'),
          btnSecondaryText: this.translateService.instant('campo.nao'),
          callback: () => {
            this.alcadaService.excluirGrupo(grupo.idGrpUsu).subscribe(() =>{
              this.listarGruposUsuarios();
              this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
            });
          }}
        );
      }
    })


  }

  onEditarGrupo(item: GrupoUsuario){
    this.drawerService.create({
      component: GruposUsuarioEditarComponent,
      size: 'small',
      componentProps: { edit: item, event: this.eventUpdate }
    });
  }

  onVisualizarUsuariosDoGrupo(grupo: GrupoUsuario){
    this.drawerService.create({
      component: UsuariosGrupoVisualizacaoComponent,
      title: `Usuários do grupo ${grupo.dscGrpUsu}`,
      size: 'small',
      componentProps: { grupo: grupo },
    });
  }

  onAdicionarUsuarios(grupo: GrupoUsuario){
    this.drawerService.create({
      component: UsuariosGrupoAdicionarComponent,
      title: `Editar Usuários do Grupo ${grupo.dscGrpUsu}`,
      size: 'medium',
      componentProps: { grupo: grupo }
    })
  }
}
