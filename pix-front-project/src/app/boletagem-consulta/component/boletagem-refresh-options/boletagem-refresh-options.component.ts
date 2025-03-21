import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-boletagem-refresh-options',
  templateUrl: 'boletagem-refresh-options.component.html',
  styleUrls: ['boletagem-refresh-options.component.scss']
})
export class BoletagemRefreshOptionsComponent implements OnInit, OnDestroy {

  @Input() tempo: number;

  @Output() tempoChange = new EventEmitter<number>();

  tempoForm: FormControl;

  private unsubscribe$ = new Subject();

  constructor() { }

  ngOnInit(): void {
    this.tempoForm = new FormControl(this.tempo);
    this.tempoForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(v => this.tempoChange.emit(v));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


}
