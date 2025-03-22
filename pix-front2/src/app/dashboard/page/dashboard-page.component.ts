import { Dashboard, Widget, DashboardComponent } from '@albert/dashboard';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import Seg from '../model/seg';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html'
})
export class DashboardPageComponent implements OnInit {
  seg:Seg = new Seg();
  ngOnInit(): void {
  }
}
