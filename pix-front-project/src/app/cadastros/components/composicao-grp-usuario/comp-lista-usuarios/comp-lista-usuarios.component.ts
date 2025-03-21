import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { DrawerService } from '@albert/ui';

import { GruposUsuarioAdicionarComponent } from './../grupos-usuario-adicionar/grupos-usuario-adicionar.component';
import { GruposUsuarioVisualizacaoComponent } from './../grupos-usuario-visualizacao/grupos-usuario-visualizacao.component';
import { CompFormUsuarioComponent } from '../comp-form-usuario/comp-form-usuario.component';

import { AlcadaService } from 'src/app/cadastros/service/alcada.service';
import { AlcadaUsuario } from './../../../model/alcadaUsuario';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-comp-lista-usuarios',
  templateUrl: './comp-lista-usuarios.component.html',
  styleUrls: ['./comp-lista-usuarios.component.scss']
})
export class CompListaUsuariosComponent implements OnInit {

  constructor(
    private drawerService: DrawerService,
    private alcadaService: AlcadaService
  ) { }

  ngOnInit(): void {
    this.listarUsuarios();
  }

  lista: AlcadaUsuario[] = [];

  seg: Seg = new Seg();

  @Input() eventUpdate: EventEmitter<any>;
  @Input() filtro?: string;

  private listarUsuarios(){
    this.alcadaService.getUsuarios().subscribe(usuarios => this.lista = usuarios)
  }

  onVisualizarGruposDoUsuario(usuario: AlcadaUsuario){
    this.drawerService.create({
      component: GruposUsuarioVisualizacaoComponent,
      size: 'small',
      title: `Grupos associados à ${usuario.nomeUsu}`,
      componentProps: { usuario: usuario },
    });
  }

  onAdicionarGrupos(usuario: AlcadaUsuario){
    this.drawerService.create({
      component: GruposUsuarioAdicionarComponent,
      size: 'medium',
      componentProps: { usuario: usuario , event: this.eventUpdate }
    })
  }

}
