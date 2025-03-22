import { Component, OnInit, EventEmitter } from '@angular/core';
import { DrawerService } from '@albert/ui';
import { NivelHierarquicoFormComponent } from '../../components/nivel-hierarquico/nivel-hierarquico-form/nivel-hierarquico-form.component';
import Seg from '../../model/seg';

@Component({
  selector: 'app-modulo-nivel-hierarquico',
  templateUrl: './modulo-nivel-hierarquico.component.html',
  styleUrls: ['./modulo-nivel-hierarquico.component.scss']
})
export class ModuloNivelHierarquicoComponent implements OnInit {

  constructor(private drawerService: DrawerService) { }

  seg: Seg = new Seg();

  eventEmitterNivel = new EventEmitter();
  eventEmitterNivelUpdate = new EventEmitter();

  ngOnInit(): void {
    this.eventEmitterNivel.subscribe(() => this.eventEmitterNivelUpdate.emit());
  }

  onNovoNivelHierarquico() {
    this.drawerService.create({
      component: NivelHierarquicoFormComponent,
      size: 'small',
      componentProps: { event: this.eventEmitterNivel }
    })
  }
}
