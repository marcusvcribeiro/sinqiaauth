import { Component, OnInit } from '@angular/core';
import { DrawerService } from '@albert/ui';

@Component({
  selector: 'doc-drawer',
  templateUrl: './drawer.component.html'
})
export class DrawerDocComponent {

  constructor(private drawerService: DrawerService) { }

  onOpenDrawer() {
    this.drawerService.create({
      component: DrawerDocComponent,
      title: 'Isto é uma Drawer!',
    });
  }

}
