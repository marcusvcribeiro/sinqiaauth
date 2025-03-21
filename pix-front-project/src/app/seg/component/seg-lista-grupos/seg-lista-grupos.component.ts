import { PermissoesSeg } from './../../model/permissoes-seg';
import { SegPermissoesGrupoComponent } from './../seg-permissoes-grupo/seg-permissoes-grupo.component';
import { SegFormGrupoComponent } from './../seg-form-grupo/seg-form-grupo.component';
import { DrawerService } from '@albert/ui';
import { Grupo } from './../../model/grupo';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { SegService } from '../../services/seg.service';
import { PreferenciaUsuarioService } from 'src/app/shared/service/preferencia-usuario.service';

@Component({
  selector: 'app-seg-lista-grupos',
  templateUrl: './seg-lista-grupos.component.html',
  styleUrls: ['./seg-lista-grupos.component.scss']
})
export class SegListaGruposComponent implements OnInit {

  constructor(private segService: SegService, private drawerService: DrawerService, private preferenciasUsuario: PreferenciaUsuarioService) { }

  numeroLinhas: number;
  listaQuantidadeLinhas: number[];
  lista: Grupo[];
  permissoes: PermissoesSeg = new PermissoesSeg();
  @Input() eventUpdate: EventEmitter<any>;
  @Input() filtro?: string = '';
  @Output() listaGrupo = new EventEmitter<Grupo[]>();

  ngOnInit(): void {
    this.loadData();

    this.eventUpdate.subscribe(()=>{
      this.loadData();
    });
    this.numeroLinhas = this.preferenciasUsuario.numeroLinhasPagina;
    this.listaQuantidadeLinhas = this.preferenciasUsuario.listaLinhaPreferenciaUsuario;
  }

  private loadData(){
    this.segService.getGrupos().subscribe(data => {
      this.lista = data;
      this.loadListGrupo();
    });
  }

  onEdit(item: Grupo){
    this.drawerService.create({
      component: SegFormGrupoComponent,
      size: 'small',
      componentProps: { edit: item, event: this.eventUpdate }
    });
  }

  onPermissoes(item: Grupo){
    this.drawerService.create({
      component: SegPermissoesGrupoComponent,
      size: 'medium',
      componentProps: { edit: item }
    });
  }
  
  loadListGrupo(){
    this.listaGrupo.emit(this.lista);
  }

}
