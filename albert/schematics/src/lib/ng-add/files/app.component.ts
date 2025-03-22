import { Component } from '@angular/core';
import { NavigationItem } from '@albert/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  lista: NavigationItem[] = [{
    icon: 'home',
    name: 'Home',
    path: '/'
  },
  {
    icon: 'menu',
    name: 'Indice',
    type: 'full',
    children: []
  }
];
}
