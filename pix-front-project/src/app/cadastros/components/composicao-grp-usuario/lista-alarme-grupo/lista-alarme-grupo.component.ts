import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GrupoAlarme } from 'src/app/cadastros/model/grupoAlarme';
import { ComposicaoGrupoUsuariosService } from 'src/app/cadastros/service/composicao-grupo-usuarios.service';
import { SinqiaDataSource } from 'src/app/shared/helper/sinqia-data-source';

@Component({
  selector: 'app-lista-alarme-grupo',
  templateUrl: './lista-alarme-grupo.component.html',
  styleUrls: ['./lista-alarme-grupo.component.scss']
})
export class ListaAlarmeGrupoComponent implements OnInit {

  @Input() idGrupo: number = 0;
  @Output() close = new EventEmitter;

  constructor(
    private service: ComposicaoGrupoUsuariosService) { }
    public ds: SinqiaDataSource<GrupoAlarme>;

  @Input() eventUpdate: EventEmitter<any>;

  ngOnInit(): void {
    this.criarDataSource();
  }

  criarDataSource(): void {
    this.ds = SinqiaDataSource.of<GrupoAlarme>()
      .fromService((d: any) =>
        this.service.buscaAlarmeGrupoUsuarios(this.idGrupo, d))
      .build();
  }

  onClose(value: boolean): void {
    this.close.emit(value);
  }

}
