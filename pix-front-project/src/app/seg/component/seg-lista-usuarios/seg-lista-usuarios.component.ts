import { PreferenciaUsuarioService } from 'src/app/shared/service/preferencia-usuario.service';
import { SegFormUsuarioSenhaComponent } from './../seg-form-usuario-senha/seg-form-usuario-senha.component';
import { DrawerService } from '@albert/ui';
import { SegService } from './../../services/seg.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { SegFormUsuarioComponent } from '../seg-form-usuario/seg-form-usuario.component';
import { SegPermissoesUsuarioComponent } from '../seg-permissoes-usuario/seg-permissoes-usuario.component';
import { PermissoesSeg } from '../../model/permissoes-seg';

@Component({
  selector: 'app-seg-lista-usuarios',
  templateUrl: './seg-lista-usuarios.component.html',
  styleUrls: ['./seg-lista-usuarios.component.scss']
})
export class SegListaUsuariosComponent implements OnInit {

  @Input() eventUpdate: EventEmitter<any>;
  @Input() filtro?: string;
  @Output() listaUsuario = new EventEmitter<Usuario[]>();

  constructor(private segService: SegService, private drawerService: DrawerService, private preferenciasUsuario: PreferenciaUsuarioService) { }

  numeroLinhas: number;
  listaQuantidadeLinhas: number[];
  lista: Usuario[];
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
    this.segService.getUsuarios().subscribe(data => {
      this.lista = data;
      this.loadListUsuario();
    })  
  }

  onEdit(item:Usuario){
    this.drawerService.create({
      component: SegFormUsuarioComponent,
      size: 'small',
      componentProps: { edit: item, event: this.eventUpdate }
    });
  }

  onPermissoes(item: Usuario){
    this.drawerService.create({
      component: SegPermissoesUsuarioComponent,
      size: 'medium',
      componentProps: { edit: item }
    });
  }

  onPassword(item: Usuario){
    this.drawerService.create({
      component: SegFormUsuarioSenhaComponent,
      size: 'small',
      componentProps: { edit: item }
    });
  }

  loadListUsuario(){
    this.listaUsuario.emit(this.lista);
  }

}
