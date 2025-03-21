import { Component, OnInit, EventEmitter } from '@angular/core';
import { DrawerService } from '@albert/ui';
import { ParticipanteIndiretoFormComponent } from '../../components/participante-indireto/participante-indireto-form/participante-indireto-form.component';
import Seg from '../../model/seg';

@Component({
  selector: 'app-modulo-participante-indireto',
  templateUrl: './modulo-participante-indireto.component.html',
  styleUrls: ['./modulo-participante-indireto.component.scss']
})
export class ModuloParticipanteIndiretoComponent implements OnInit {

  constructor(private drawerService: DrawerService) { }

  seg: Seg = new Seg();

  eventEmitterIndireto = new EventEmitter();
  eventEmitterIndiretoUpdate = new EventEmitter();

  ngOnInit(): void {
    this.eventEmitterIndireto.subscribe(() => this.eventEmitterIndiretoUpdate.emit());
  }

  onNovoParticipanteIndireto() {
    this.drawerService.create({
      component: ParticipanteIndiretoFormComponent,
      size: 'small',
      componentProps: { event: this.eventEmitterIndireto }
    })
  }
}
