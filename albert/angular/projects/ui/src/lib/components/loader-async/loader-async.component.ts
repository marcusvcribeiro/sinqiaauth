import { Component, OnDestroy } from '@angular/core';
import { LoaderService } from './loader.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'alb-loader-async',
  templateUrl: './loader-async.component.html',
})
export class LoaderAsyncComponent implements OnDestroy {

   /**
    * @description
    * Propriedade que define quando o loader aparece
    *
    */
  loading: boolean;

  private unsubscribe$ = new Subject();


  constructor(private loaderService: LoaderService) {

    this.loaderService.isLoading
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe((v) => {
      this.loading = v;
    });

  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
