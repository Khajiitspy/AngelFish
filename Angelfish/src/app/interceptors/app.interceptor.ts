import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import {catchError, finalize} from 'rxjs/operators';
import { inject } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import {throwError} from 'rxjs';
import {GlobalErrorService} from '../services/global-error.service';

export const AppInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);
  const errorService = inject(GlobalErrorService);

  loadingService.show();

  return next(req).pipe(
    catchError((err: HttpErrorResponse) => {
      console.error(err);
      return throwError(errorService.processError(err.status));
    }),

    finalize(() => {
      loadingService.hide()
      errorService.hideError();
    })
  );
};
