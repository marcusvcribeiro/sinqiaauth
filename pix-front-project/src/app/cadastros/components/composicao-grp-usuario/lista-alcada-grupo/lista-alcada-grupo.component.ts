import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GrupoAlcada } from 'src/app/cadastros/model/grupoAlcada';
import { ComposicaoGrupoUsuariosService } from 'src/app/cadastros/service/composicao-grupo-usuarios.service';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';

@Component({
  selector: 'app-lista-alcada-grupo',
  templateUrl: './lista-alcada-grupo.component.html',
  styleUrls: ['./lista-alcada-grupo.component.scss']
})
export class ListaAlcadaGrupoComponent implements OnInit {

  @Input() idGrupo: number = 0;
  @Output() close = new EventEmitter;

  constructor(
    private service: ComposicaoGrupoUsuariosService) { }
    public ds: SinqiaDataSource<GrupoAlcada>;

  @Input() eventUpdate: EventEmitter<any>;

  ngOnInit(): void {
    this.criarDataSource();
  }

  criarDataSource(): void {
    this.ds = SinqiaDataSource.of<GrupoAlcada>()
      .fromService((d: any) =>
        this.service.buscaAlcadaGrupoUsuarios(this.idGrupo, d))
      .build();
  }

  onClose(value: boolean): void {
    this.close.emit(value);
  }

}
