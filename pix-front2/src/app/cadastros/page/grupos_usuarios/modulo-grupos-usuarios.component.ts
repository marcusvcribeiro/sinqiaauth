import { Component, EventEmitter, OnInit } from '@angular/core';
import { DrawerService } from '@albert/ui';
import { GrpUsuarioFormComponent } from './../../components/composicao-grp-usuario/grp-usuario-form/grp-usuario-form.component';
import Seg from '../../model/seg';

@Component({
  selector: 'app-modulo-grupos-usuarios',
  templateUrl: './modulo-grupos-usuarios.component.html',
  styleUrls: ['./modulo-grupos-usuarios.component.scss']
})
export class ModuloGruposUsuariosComponent implements OnInit {

  constructor(private drawerService: DrawerService) { }

  seg: Seg = new Seg();

  filtroGrupo: string = '';
  eventEmitterGrupo = new EventEmitter();
  eventEmitterGrupoUpdate = new EventEmitter();

  ngOnInit(): void {
    this.eventEmitterGrupo.subscribe(() => this.eventEmitterGrupoUpdate.emit());
  }

  onNovoGrupo() {
    this.drawerService.create({
      component: GrpUsuarioFormComponent,
      size: 'small',
      componentProps: { event: this.eventEmitterGrupo }
    })
  }
}
