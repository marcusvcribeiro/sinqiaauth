import { Component, OnInit } from '@angular/core';
import { DrawerService } from 'projects/ui/src/public-api';

/**
 * ATENÇÃO:
 * Esse projeto é apenas para realizar testes de componentes.
 * Sempre deve possuír apenas um app.component vazio!
 */

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private drawerService: DrawerService,
  ) {}

  ngOnInit(): void {
  }

  onOpenDrawer() {
    this.drawerService.create({
      component: AppComponent,
      title: 'Apenas um test',
    });
  }
}
