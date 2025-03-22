import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export interface Config {
  baseUrl: string;
}

@Injectable()
export class ConfigService {
  configUrl = 'assets/config/config.json';

  private config: Config;

  constructor(private http: HttpClient) {
  }

  initializeConfig(): Promise<any> {
    return new Promise((resolve) => {
      this._getConfig().subscribe(config => {
        this.config = config;
        resolve();
      });
    });
  }

  getConfig(): Config {
    return this.config;
  }

  private _getConfig(): Observable<Config> {
    return <Observable<Config>>this.http.get<Config>(this.configUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an throwError with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
}

export function initConfiguration(configService: ConfigService): Function {
  return () => configService.initializeConfig();
}
