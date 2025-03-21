import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClientService } from 'src/app/shared/service/http-client.service';
import { switchMap } from 'rxjs/operators';
import { Orquestrador } from '../model/orquestrador';

@Component({
  selector: 'app-external-page',
  template: '',
})
export class RedirectionOrquestradorService implements OnInit{

  constructor(private httpClientService: HttpClientService) { }

  ngOnInit(): void {
    this.getUrlFrontOrquestrador().subscribe((rsp: Orquestrador) => {
      window.open(rsp.url, '_blank');
    });
  }

  getUrlFrontOrquestrador(): Observable<Orquestrador>{
    const path = 'parametros/url-front-orquestrador';
    return this.httpClientService.core.find<Orquestrador>({path});
  }

}
