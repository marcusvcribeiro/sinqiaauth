import { AlcadaService } from 'src/app/cadastros/service/alcada.service';
import { AlcadaUsuario } from './../../../model/alcadaUsuario';
import { Component, Input, OnInit } from '@angular/core';
import { GrupoUsuario } from 'src/app/cadastros/model/grupoUsuario';
import Seg from 'src/app/cadastros/model/seg';

@Component({
  selector: 'app-grupos-usuario-visualizacao',
  templateUrl: './grupos-usuario-visualizacao.component.html',
  styleUrls: ['./grupos-usuario-visualizacao.component.scss']
})
export class GruposUsuarioVisualizacaoComponent implements OnInit {
  @Input() usuario: AlcadaUsuario;

  lista: GrupoUsuario[] = []
  filtroGrupos = '';

  seg: Seg = new Seg();

  constructor(private alcadaService: AlcadaService) { }

  ngOnInit(): void {
    this.listarGruposDoUsuario();
  }

  private listarGruposDoUsuario(){
    this.alcadaService.getGruposUsuario(this.usuario.id).subscribe(grupos => this.lista = grupos)
  }
}
