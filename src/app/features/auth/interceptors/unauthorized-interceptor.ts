import {
  HttpInterceptorFn,
  HttpErrorResponse,
  HttpRequest,
  HttpEvent,
  HttpSentEvent,
  HttpHeaderResponse, HttpResponse, HttpDownloadProgressEvent, HttpUploadProgressEvent, HttpUserEvent
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {catchError, Observable, throwError} from 'rxjs';
import {TokenService} from '../services/token.service';


export const unauthorizedInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: (req: HttpRequest<unknown>) => Observable<HttpEvent<unknown>>): Observable<HttpSentEvent | HttpHeaderResponse | HttpResponse<unknown> | HttpDownloadProgressEvent | HttpUploadProgressEvent | HttpUserEvent<unknown>> => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse): Observable<never> => {
      if (error.status === 401) {
        tokenService.accessToken = '';
        router.navigate(['auth', 'login']).then();
      }
      return throwError((): HttpErrorResponse => error);
    })
  );
};
