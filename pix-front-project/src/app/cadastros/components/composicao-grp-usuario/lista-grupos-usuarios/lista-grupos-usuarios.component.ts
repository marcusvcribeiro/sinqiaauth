import { PixMessageService } from 'src/app/shared/service/pix-message-service';
import { GruposUsuarioEditarComponent } from './../grupos-usuario-editar/grupos-usuario-editar.component';
import { UsuariosGrupoAdicionarComponent } from './../usuarios-grupo-adicionar/usuarios-grupo-adicionar.component';
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { DrawerService, DialogService } from '@albert/ui';
import { takeUntil } from 'rxjs/operators';
import { GrupoUsuario } from '../../../model/grupoUsuario';
import { AlcadaService } from 'src/app/cadastros/service/alcada.service';
import { UsuariosGrupoVisualizacaoComponent } from '../usuarios-grupo-visualizacao/usuarios-grupo-visualizacao.component';
import { Subject } from 'rxjs';
import Seg from 'src/app/cadastros/model/seg';
import { ListaAlcadaGrupoComponent } from '../lista-alcada-grupo/lista-alcada-grupo.component';
import { ListaAlarmeGrupoComponent } from '../lista-alarme-grupo/lista-alarme-grupo.component';
import { ComposicaoGrupoUsuariosService } from 'src/app/cadastros/service/composicao-grupo-usuarios.service';

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
    private composicaoGrupoService: ComposicaoGrupoUsuariosService,
    private translateService: TranslateService,
    private pixMessageService: PixMessageService,
    private changeDetectorRef: ChangeDetectorRef) { }

  lista: GrupoUsuario[] = [];

  @Input() eventUpdate: EventEmitter<any>;
  @Input() filtro?: string;
  private unsubscribe$ = new Subject();
  private ehExcluirAlcadaGrupo: boolean = false;
  private ehExcluirAlarmeGrupo: boolean = false;

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

  onExcluirGrupo(grupo: GrupoUsuario): void {
    this.alcadaService.getUsuariosGrupo(grupo.idGrpUsu).subscribe(value =>{
      if(value.length !== 0){
        this.dialogService.create({
          type: 'error',
          title: this.translateService.instant('titulo.erroOperacao'),
          message: this.translateService.instant('validacoes.grupoVinculadoAUsuarios'),
          btnPrimaryText: 'OK'
        });
      }else{
        this.ehExcluirAlarmeGrupo = false;
        this.ehExcluirAlcadaGrupo = false;
        this.excluirAlcadaGrupo(grupo.idGrpUsu);
        this.excluirAlarmeGrupo(grupo.idGrpUsu);
      }
    })
  }

  async excluirAlcadaGrupo(idGrpUsu: number): Promise<void> {
    this.composicaoGrupoService.buscaAlcadaGrupoUsuarios(idGrpUsu).subscribe(async value =>{
      if(value.records.length !== 0){
        const { component } = await this.dialogService.create({
          type: 'custom',
          component: ListaAlcadaGrupoComponent,
          componentProps : {
            idGrupo: idGrpUsu
          }
        });

        component.instance.close.pipe(takeUntil(this.unsubscribe$))
          .subscribe((value: boolean) => {
            this.ehExcluirAlcadaGrupo = value;
            this.changeDetectorRef.detectChanges();
            this.composicaoGrupoService.excluiAlcadaGrupoUsuarios(idGrpUsu).subscribe(() =>{
              this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
              this.excluirGrupoUsuario(idGrpUsu);
            });
          });
      }else{
        this.ehExcluirAlcadaGrupo = true;
        this.changeDetectorRef.detectChanges();
        this.excluirGrupoUsuario(idGrpUsu);
      }
    })
  }

  async excluirAlarmeGrupo(idGrpUsu: number): Promise<void> {
    this.composicaoGrupoService.buscaAlarmeGrupoUsuarios(idGrpUsu).subscribe(async value =>{
      if(value.records.length !== 0){
        const { component } = await this.dialogService.create({
          type: 'custom',
          component: ListaAlarmeGrupoComponent,
          componentProps : {
            idGrupo: idGrpUsu
          }
        });

        component.instance.close.pipe(takeUntil(this.unsubscribe$))
          .subscribe((value: boolean) => {
            this.ehExcluirAlarmeGrupo = value;
            this.changeDetectorRef.detectChanges();
            this.composicaoGrupoService.excluiAlarmeGrupoUsuarios(idGrpUsu).subscribe(() =>{
              this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
              this.excluirGrupoUsuario(idGrpUsu);
            });
          });
      }else{
        this.ehExcluirAlarmeGrupo = true;
        this.changeDetectorRef.detectChanges();
        this.excluirGrupoUsuario(idGrpUsu);
      }
    })
  }

  excluirGrupoUsuario(idGrpUsu: number) : void{
    if(this.ehExcluirAlcadaGrupo && this.ehExcluirAlarmeGrupo){
      this.alcadaService.excluirGrupo(idGrpUsu).subscribe(() =>{
        this.listarGruposUsuarios();
        this.pixMessageService.toastSuccess('mensagem.operacaoSucesso');
      });
    }
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
