import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DrawerService } from '@albert/ui';
import { UsuarioRecebedorDrawerComponent } from './../../component/usuario-recebedor-drawer/usuario-recebedor-drawer.component';
import { TranslateService } from '@ngx-translate/core';
import { UsuarioRecebedor } from '../../model/UsuarioRecebedor';
import Seg from '../../model/Seg';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.scss']
})
export class OnboardingComponent implements OnInit {

  filtro$: Subject<any> = new BehaviorSubject(null);
  usuarios: UsuarioRecebedor[];
  seg: Seg = new Seg();

  constructor(private drawerService: DrawerService, private translateService: TranslateService) { }

  ngOnInit(): void {

  }

  refresh() {
    this.filtro$.next({});
  }

  async adicionar() {
    const { drawerComponent } = await this.drawerService.create({
      component: UsuarioRecebedorDrawerComponent,
      title: this.translateService.instant(`titulo.novo_usuario_recebedor`),
      size: 'large',
      componentProps: { usuarios: this.usuarios }
    });

    drawerComponent.instance.close.subscribe(() => {
      this.refresh();
    });
  }

  notifica($event: UsuarioRecebedor[]) {
    this.usuarios = $event;
  }

}
