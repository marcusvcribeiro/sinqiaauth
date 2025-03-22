import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarSimpleService } from './navbar-simple.service';
import { NavbarSimpleItem } from './navbar-simple';

@Component({
  selector: 'alb-navbar-simple-item',
  templateUrl: './navbar-simple-item.component.html',
})
export class NavbarSimpleItemComponent {

  /**
   *
   * @description
   *
   * Input do tipo Array<SideNav> que deve conter a lista de itens do navbar-simple
   *
   */
  @Input() items: Array<NavbarSimpleItem>;

  /**
   * @description
   *
   * Booleano para mudar o titulo de aba ou não
   */
  @Input() changeTabTitle = false;

  /**
   * @description
   *
   * Caso a aplicação adicione algum caminho padrão na URL (fora os caminhos de rota), deve-se passar
   * esse caminho padrão aqui.
   * Por exemplo, quando subimos alguma aplicação com Docker, é preciso configurar um caminho padrão na URL
   * como em: dev.sinqia.io/albert/docs e os caminhos das rotas (que é a parte variavel da URL)
   * vem em seguida, como em: https://dev.sinqia.io/albert/docs/layout/navbar-full
   */
  @Input() urlPath = '';

  constructor(
    private router: Router,
    private navbarSimpleService: NavbarSimpleService
  ) { }

  /**
   *
   * @description
   *
   * Método utilizado para navegação ao clicar no texto de um item do navbar-simple-item
   * Além disso chama um service para sinalizar que o item foi clicado. Ele será usado no navbar-simple
   *
   */
  onNavbarNavigate(item: NavbarSimpleItem) {
    const { path, onClick } = item;

    if (path) {
      if (this.changeTabTitle) {
        document.title = item.name;
      }
      this.router.navigate([path]);
    }

    if (onClick instanceof Function) {
      onClick(item);
    }

    this.navbarSimpleService.setItemClicked(item);
  }

  /**
   *
   * @description
   *
   * Método utilizado para navegação ao clicar no ícone de um item do navbar-simple-item.
   * Isso faz com que o seja aberto uma nova aba e o usuário é redirecionado para ela.
   *
   */
  onNewTabNavigate(item: NavbarSimpleItem, event: Event) {
    event.stopPropagation();

    if (item.onClick instanceof Function) {
      item.onClick(this);
    }

    const path = this.urlPath ? this.urlPath + item.path : item.path;
    const newWindow = window.open(path, '_blank');
    if (this.changeTabTitle) {
      newWindow.addEventListener('load', () => {
        newWindow.document.title = item.name;
      }, false);
    }
    this.navbarSimpleService.setItemClicked(null);
  }

  /**
   *
   * @description
   *
   * Método utilizado mudar valor de favorito de um item do menu
   *
   */
  onFavoriteClick(item: NavbarSimpleItem, event: Event) {
    event.stopPropagation();
    item.favorite = item.favorite !== null ? !item.favorite : false;
    this.navbarSimpleService.setItemFavoriteSelected(item);
  }
}
