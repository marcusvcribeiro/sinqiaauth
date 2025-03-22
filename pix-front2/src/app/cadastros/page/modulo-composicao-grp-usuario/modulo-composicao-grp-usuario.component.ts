import { DrawerService } from '@albert/ui';
import { Component, EventEmitter, OnInit } from '@angular/core';

import { CompFormUsuarioComponent } from '../../components/composicao-grp-usuario/comp-form-usuario/comp-form-usuario.component';
import { GrpUsuarioFormComponent } from '../../components/composicao-grp-usuario/grp-usuario-form/grp-usuario-form.component';
import Seg from '../../model/seg';

import { TabsComposicao } from '../../model/tabs-composicao';

@Component({
  selector: 'app-modulo-composicao-grp-usuario',
  templateUrl: './modulo-composicao-grp-usuario.component.html',
  styleUrls: ['./modulo-composicao-grp-usuario.component.scss']
})
export class ModuloComposicaoGrpUsuarioComponent implements OnInit {

  constructor(private drawerService: DrawerService) { }

  seg: Seg = new Seg();

  tab_usuarios: TabsComposicao = TabsComposicao.Usuarios;
  tab_grupos: TabsComposicao = TabsComposicao.Grupos;
  tab_selected: TabsComposicao = TabsComposicao.Usuarios;

  eventEmitterGrupo = new EventEmitter();
  eventEmitterGrupoUpdate = new EventEmitter();

  eventEmitterUsuario = new EventEmitter();
  eventEmitterUsuarioUpdate = new EventEmitter();

  filtroUsuario: string = '';
  filtroGrupo: string = '';

  ngOnInit(): void {
    this.eventEmitterGrupo.subscribe(() => this.eventEmitterGrupoUpdate.emit());
    this.eventEmitterUsuario.subscribe(() => this.eventEmitterUsuarioUpdate.emit());
  }

  onNovoUsuario() {
    this.drawerService.create({
      component: CompFormUsuarioComponent,
      size: 'small',
      componentProps: { event: this.eventEmitterUsuario }
    });
  }

  //confirmar que o componente de cadastro é o grpUsuarioFormComponent
  onNovoGrupo() {
    this.drawerService.create({
      component: GrpUsuarioFormComponent,
      size: 'small',
      componentProps: { event: this.eventEmitterGrupo }
    });
  }

  onTrocarTab(event){
    this.tab_selected = event;
  }
}
