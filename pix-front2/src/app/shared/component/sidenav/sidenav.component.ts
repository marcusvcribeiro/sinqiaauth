import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface SidenavItem {
  id: string;
  label: string;
  icon?: string;
  data?: any;
  type?: 'strong' | 'weak';
  items?: SidenavItem[];
  hash?: string;
  firstItem?: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent {
  @Input() items: SidenavItem[] = [];
  @Input() selectedItemId: string;
  @Output() navigate = new EventEmitter<SidenavItem>();
  @Input() firstItem = true;

  onClick(item: SidenavItem) {
    this.navigate.emit(item);
  }

  onChildNavigate(item: SidenavItem) {
    this.navigate.emit(item);
  }
}


