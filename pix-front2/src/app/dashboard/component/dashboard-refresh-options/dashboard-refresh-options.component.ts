import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardRefreshService } from '../../service/dashboard-refresh.service';

@Component({
  selector: 'app-dashboard-refresh-options',
  templateUrl: './dashboard-refresh-options.component.html',
  styleUrls: ['./dashboard-refresh-options.component.scss']
})
export class DashboardRefreshOptionsComponent implements OnInit {
  tempo: FormControl;

  constructor(private dashboardRefreshService: DashboardRefreshService) { }

  ngOnInit(): void {
    this.tempo = new FormControl(this.dashboardRefreshService.intervalTime);
    this.tempo.valueChanges.subscribe(v => this.dashboardRefreshService.updateIntervalTime(v));
  }
}
