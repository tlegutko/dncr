import { Injectable } from '@angular/core';
import { Http, RequestOptions, Request, RequestOptionsArgs, Response } from '@angular/http';
import { AuthHttp as BasicAuthHttp, AuthConfig } from 'angular2-jwt';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { AuthService } from './auth.service';

@Injectable()
export class AuthHttp extends BasicAuthHttp {
  constructor(options: AuthConfig, http: Http, defOpts?: RequestOptions) {
    super(options, http, defOpts);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return super.request(url, options)
      .catch((response: Response) => {
        if ([401, 403].indexOf(response.status) !== -1) {
          // TODO: Add notification about invalid response - logout
          AuthService.clear();
        }
        if (response.status === 500) {
          console.error(response);
        }
        return Observable.of(response);
      });
  }
}
