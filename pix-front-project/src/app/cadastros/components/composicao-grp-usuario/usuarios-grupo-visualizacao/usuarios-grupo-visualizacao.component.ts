import { AlcadaUsuario } from './../../../model/alcadaUsuario';
import { Component, Input, OnInit } from '@angular/core';
import { GrupoUsuario } from 'src/app/cadastros/model/grupoUsuario';
import { AlcadaService } from 'src/app/cadastros/service/alcada.service';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-usuarios-grupo-visualizacao',
  templateUrl: './usuarios-grupo-visualizacao.component.html',
  styleUrls: ['./usuarios-grupo-visualizacao.component.scss']
})
export class UsuariosGrupoVisualizacaoComponent implements OnInit {
  @Input() grupo: GrupoUsuario;

  seg: Seg = new Seg();

  lista: AlcadaUsuario[] = []
  filtroUsuarios = '';

  constructor(private alcadaService: AlcadaService) { }

  ngOnInit(): void {
    this.listarUsuariosDoGrupo();
  }

  private listarUsuariosDoGrupo(){
    this.alcadaService.getUsuariosGrupo(this.grupo.idGrpUsu).subscribe(usuarios => this.lista = usuarios)
  }
}
