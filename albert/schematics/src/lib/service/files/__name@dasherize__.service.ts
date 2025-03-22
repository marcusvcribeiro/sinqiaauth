

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { <%= classify(name) %>Model } from '../model/<%= dasherize(name) %>.model';

@Injectable()
export class <%= classify(name) %>Service {

    constructor(private httpService: HttpClient) { }
        
    public save(obj: <%= classify(name) %>Model): Observable<any> {
        return this.httpService.post('<%= endpoint %>', obj);
    }
    
    public update(obj: <%= classify(name) %>Model): Observable<any> {
        return this.httpService.put('<%= endpoint %>', obj);
    }
    
    public remove(id: number): Observable<any> {
        return this.httpService.delete('<%= endpoint %>');
    }

    public get(url): Observable<any> {
        return this.httpService.get(url);
    }

}

