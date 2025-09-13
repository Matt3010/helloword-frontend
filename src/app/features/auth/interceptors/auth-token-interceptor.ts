import {
  HttpDownloadProgressEvent,
  HttpEvent,
  HttpHeaderResponse,
  HttpInterceptorFn,
  HttpRequest,
  HttpResponse,
  HttpSentEvent, HttpUploadProgressEvent, HttpUserEvent
} from '@angular/common/http';
import { inject } from '@angular/core';
 import {Observable} from 'rxjs';
import {TokenService} from '../services/token.service';

export const authTokenInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: (req: HttpRequest<unknown>) => Observable<HttpEvent<unknown>>): Observable<HttpSentEvent | HttpHeaderResponse | HttpResponse<unknown> | HttpDownloadProgressEvent | HttpUploadProgressEvent | HttpUserEvent<unknown>> => {
  const tokenService: TokenService = inject(TokenService);

  const authReq: HttpRequest<unknown> = tokenService.hasToken()
    ? req.clone({
      setHeaders: {
        Authorization: `Bearer ${tokenService.accessToken}`
      }
    })
    : req;

  return next(authReq);
};
