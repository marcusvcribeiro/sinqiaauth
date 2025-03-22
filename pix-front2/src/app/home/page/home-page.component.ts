import { NavigationItem } from '@albert/layout';
import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/core/service/navigation.service';
import { Menu } from 'src/app/shared/model/menu';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  items: NavigationItem[] = new Array();

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit(): void {
    this.navigationService.getMenus().subscribe(menus => this.items = menus);
  }
}
