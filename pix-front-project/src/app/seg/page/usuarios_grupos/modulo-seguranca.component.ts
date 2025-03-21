import { SegFormGrupoComponent } from '../../component/seg-form-grupo/seg-form-grupo.component';
import { SegFormUsuarioComponent } from '../../component/seg-form-usuario/seg-form-usuario.component';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { SegService } from '../../services/seg.service';
import { DrawerService } from '@albert/ui';
import { TabsSeguranca } from '../../model/tabs-seguranca';
import { PermissoesSeg } from '../../model/permissoes-seg';
import { Parametro } from '../../model/parametro';
import { Usuario } from '../../model/usuario';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DownloadFile } from 'src/app/shared/helper/download-file-helper';
import { Grupo } from '../../model/grupo';
import { Dicionario } from '../../model/dicionario';
import { SegFormDicionarioComponent } from '../../component/seg-form-dicionario/seg-form-dicionario.component';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { descricaoGrupo } from '../../model/descricaoGrupo';

@Component({
  selector: 'app-modulo-seguranca',
  templateUrl: './modulo-seguranca.component.html',
  styleUrls: ['./modulo-seguranca.component.scss']
})
export class ModuloSegurancaComponent implements OnInit {

  constructor(private segService: SegService, private drawerService: DrawerService){}

  tab_usuarios: TabsSeguranca = TabsSeguranca.Usuarios;
  tab_grupos: TabsSeguranca = TabsSeguranca.Grupos;
  tab_dicionario: TabsSeguranca = TabsSeguranca.Dicionario;
  tab_selected: TabsSeguranca = TabsSeguranca.Usuarios;


  //#region PERMISSOES
  permissoes: PermissoesSeg = new PermissoesSeg();
  //#endregion

  eventEmitterGrupo = new EventEmitter();
  eventEmitterGrupoUpdate = new EventEmitter();

  eventEmitterUsuario = new EventEmitter();
  eventEmitterUsuarioUpdate = new EventEmitter();

  
  eventEmitterDicionario = new EventEmitter();
  eventEmitterDicionarioUpdate = new EventEmitter();

  filtroUsuario: string = '';
  filtroGrupo: string = '';
  filtroDicionario: string = '';
  listaUsuario: Usuario[];
  listaGrupo: Grupo[];
  listaDicionario: Dicionario[];
  

  parametro: Parametro;
  dataSource = {listGeneric:[{itemLista1: "",itemLista2:"", itemLista3:"", itemLista4:"", itemLista5:"",itemLista6:""}]};
  private unsubscribe$ = new Subject();
  excelNome: string = "CadastroUsuarioGrupo";


  ngOnInit(): void {
    this.eventEmitterGrupo.subscribe(() => this.eventEmitterGrupoUpdate.emit());
    this.eventEmitterUsuario.subscribe(() => this.eventEmitterUsuarioUpdate.emit());
    this.eventEmitterDicionario.subscribe(() => this.eventEmitterDicionarioUpdate.emit());
    this.segService.obterParametrosDefault().subscribe(data => this.parametro = data);
  }

  onNovoUsuario() {
    this.drawerService.create({
      component: SegFormUsuarioComponent,
      size: 'small',
      componentProps: { event: this.eventEmitterUsuario }
    });
  }

  onNovoGrupo() {
    this.drawerService.create({
      component: SegFormGrupoComponent,
      size: 'small',
      componentProps: { event: this.eventEmitterGrupo, parametro: this.parametro }
    });
  }

  onNovoSenhaDicionario() {
    this.drawerService.create({
      component: SegFormDicionarioComponent,
      size: 'small',
      componentProps: { event: this.eventEmitterDicionario }
    });
  }

  onTrocarTab(event) {
    this.tab_selected = event;
  }

  receiverList(returnLists){
    if (this.tab_selected == 1){
        this.listaUsuario = returnLists;
    }
    else if (this.tab_selected == 2){
      this.listaGrupo = returnLists;
    } else{
      this.listaDicionario = returnLists;
    }
  }

  expandirUsuariosPorGrupo(usuario: Usuario): Usuario[] {
    const usuariosExpandidos: Usuario[] = [];
        
        if (usuario.grupos.length > 1) {
            usuario.grupos.forEach(grupo => {
                usuariosExpandidos.push({
                    ...usuario, 
                    grupos: [grupo] 
                });
            });
        } else {
            usuariosExpandidos.push(usuario);
        }

    return usuariosExpandidos;
}

  onExportarExcel() {
    if (this.tab_selected == 1){
      this.excelNome = "CadastroUsuario";
      this.dataSource = {listGeneric:[{itemLista1:"Id",itemLista2:"Nome", itemLista3:"Login do Usuário",itemLista4:"Última atualização de data", itemLista5: "Perfil do Usuário",itemLista6:"Situação"}]};
      this.listaUsuario.forEach(item =>{

         this.expandirUsuariosPorGrupo(item).forEach(user => {
          if (this.filtroUsuario === "" || item.nome.toLowerCase().includes(this.filtroUsuario.toLowerCase())){
            this.dataSource.listGeneric.push({
              itemLista1: item.id.toString(),
              itemLista2: item.nome,
              itemLista3: item.login,
              itemLista4: user.grupos.length > 0 ? user.grupos[0].dataUltimaAtualizacao : "",
              itemLista5: user.grupos.length > 0 ? user.grupos[0].descricaoGrupo : "",
              itemLista6: user.situacao
            })
          }
         });

        });
    }else if(this.tab_selected ==2 ){
      this.excelNome = "CadastroGrupo";
      this.dataSource = {listGeneric:[{itemLista1:"Código",itemLista2:"Nome do Grupo",itemLista3:"", itemLista4:"", itemLista5:"",itemLista6:""}]};
        this.listaGrupo.forEach(item =>{
          if (this.filtroGrupo === "" || item.nome.toLowerCase().includes(this.filtroGrupo.toLowerCase())){
            this.dataSource.listGeneric.push({
              itemLista1: item.id,
              itemLista2: item.nome,
              itemLista3: "",
              itemLista4: "",
              itemLista5: "",
              itemLista6: ""
            })
          }
         });
    }else{
      this.excelNome = "DicionarioSenha";
      this.dataSource = {listGeneric: [{itemLista1:"Senha", itemLista2:"",itemLista3:"", itemLista4:"", itemLista5:"",itemLista6:""}]};
      this.listaDicionario.forEach(item =>{
        if(this.filtroDicionario === "" || item.senha.toLowerCase().includes(this.filtroDicionario.toLowerCase())){
          this.dataSource.listGeneric.push({
            itemLista1: item.senha, 
            itemLista2: "",
            itemLista3: "",
            itemLista4: "",
            itemLista5: "",
            itemLista6: ""
          })
        }
      })
    }
    this.segService
    .exportarExcel(this.dataSource, this.excelNome)
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((res) => DownloadFile.downloadFile(res));
  }
}