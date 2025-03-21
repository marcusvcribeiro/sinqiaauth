import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup } from '@angular/forms';
import { LazyLoadEvent } from 'primeng/primeng';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

export interface SinqiaDataSourceBuilder<T> {
  withFilter(filter: FormGroup): SinqiaDataSourceBuilder<T>;
  withBody(body: FormGroup): SinqiaDataSourceBuilder<T>;
  fromService(fromService: ({ }) => Observable<any>): SinqiaDataSourceBuilder<T>;
  fromNonPageableService(serviceCall: ({ }) => Observable<T[]>): SinqiaDataSourceBuilder<T>;
  selectable(): SinqiaDataSourceBuilder<T>;
  multiSelectable(): SinqiaDataSourceBuilder<T>;
  initialize(value: boolean): SinqiaDataSourceBuilder<T>;
  build(): SinqiaDataSource<T>;
}

export class SinqiaDataSource<T> {
  private offset = 0;
  private page = 1;
  private limit = 20;
  private sortBy: string;
  private sortDirection: string;

  private filtroForm: FormGroup = new FormGroup({});
  private bodyForm: FormGroup = new FormGroup({});

  private pageableServiceCall: ({ }) => Observable<any>;
  private pageableWithBodyServiceCall: ({ }, { }) => Observable<any>;

  private nonPageableServiceCall: ({ }) => Observable<T[]>;

  public total$ = new BehaviorSubject<number>(0);
  public data$: Subject<T[]> = new Subject();
  public reset$: Subject<boolean> = new Subject();
  public error$: Subject<String> = new Subject();
  public selection: SelectionModel<T>;
  public initialize = true;

  private pageable = false;


  static of<T>() {
    const builder: SinqiaDataSourceBuilder<T> = new class implements SinqiaDataSourceBuilder<T> {
      private ds = new SinqiaDataSource<T>();

      withFilter(getFiltroForm: FormGroup) {
        this.ds.filtroForm = getFiltroForm;
        return this;
      }

      withBody(getBodyForm: FormGroup) {
        this.ds.bodyForm = getBodyForm;
        return this;
      }

      fromService(serviceCall: ({ }) => Observable<any>) {
        this.ds.pageable = true;
        this.ds.pageableServiceCall = serviceCall;
        this.ds.pageableWithBodyServiceCall = serviceCall;
        return this;
      }

      fromNonPageableService(serviceCall: ({ }) => Observable<T[]>) {
        this.ds.pageable = false;
        this.ds.nonPageableServiceCall = serviceCall;
        return this;
      }

      selectable() {
        this.ds.selection = new SelectionModel<T>(false, []);
        return this;
      }

      multiSelectable() {
        this.ds.selection = new SelectionModel<T>(true, []);
        return this;
      }

      initialize(value: boolean) {
        this.ds.initialize = value;
        return this;
      }

      build() {
        return this.ds;
      }

    };

    return builder;
  }

  constructor() { }

  public isAllSelected(values: T[]): boolean {
    return this.selection.selected.length === values.length;
  }

  public selectAllToggle(values: T[]) {
    this.isAllSelected(values) ?
      this.selection.clear() :
      values.forEach(value => this.selection.select(value));
  }

  public clear() {
    this.selection.clear();
  }


  public load(event: LazyLoadEvent) {
    this.sortBy = event.sortField;
    if (event.sortOrder === 1) {
      this.sortDirection = 'ASC';
    } else if (event.sortOrder === -1) {
      this.sortDirection = 'DESC';
    }
    if (this.pageable) {
      this.limit = event.rows;
      this.offset = event.first;
      this.page = (event.first / event.rows) + 1;

      this.retrieveDataPageable();
    } else {
      this.retrieveDataNonPageable();
    }
  }

  public resetPage(): void {
    this.limit = 20;
    this.offset = 0;
    this.page = 1;
    this.sortBy = '';
    this.sortDirection = '';
    this.reset$.next(true);
  }

  public filter(): void {
    if (this.filtroForm?.invalid) {
      this.invalidField(this.filtroForm);
      return;
    }

    if (this.bodyForm?.invalid) {
      this.invalidField(this.bodyForm);
      return;
    }
    this.resetPage();
  }

  public get isPageable(): boolean {
    return this.pageable;
  }

  private invalidField(formGroup: FormGroup) {
    const fields = Object.keys(formGroup.controls);
    fields.forEach(field => {
      if (formGroup.controls[field].invalid) {
        this.error$.next(field);
      }
    });
  }

  private retrieveDataPageable() {
    const param = {
      ...this.filtroForm.getRawValue(),
      limit: this.limit,
      offset: this.offset,
      page: this.page,
      sortBy: this.sortBy,
      sortDirection: this.sortDirection,
    };
    const body = {
      ...this.bodyForm.getRawValue()
    };

    if (this.bodyForm) {
      this.pageableWithBodyServiceCall(param, body).subscribe(value => {
        const records = this.getRecords(value);
        const total = this.getTotal(value);

        this.data$.next(records);
        this.total$.next(total);
      }, er => er);
    } else {
      this.pageableServiceCall(param).subscribe(value => {
        const records = this.getRecords(value);
        const total = this.getTotal(value);

        this.data$.next(records);
        this.total$.next(total);
      }, er => er);
    }

  }

  private retrieveDataNonPageable() {
    this.nonPageableServiceCall(
      {
        ...this.filtroForm.getRawValue(),
        sortBy: this.sortBy,
        sortDirection: this.sortDirection
      }
    ).subscribe(value => {
      this.data$.next(value);
    }, er => er);
  }

  private getRecords(value) {
    if (value.hasOwnProperty('records')) {
      return value.records;
    }

    return value.content;
  }

  private getTotal(value) {
    if (value.hasOwnProperty('metadata') && value.metadata.hasOwnProperty('totalCount')) {
      return value.metadata.totalCount;
    }

    return value.total;
  }
}
