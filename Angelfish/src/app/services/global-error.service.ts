import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorService {
  private _isError = new BehaviorSubject<boolean>(false);

  private _errorTypeDictionary = new Map<number, new (...args: any[]) => Error>([
    [0, class NetworkError extends Error {
      constructor(message?: string) {
        super(message || 'Сервер не відповідає. Спробуйте пізніше');
        this.name = 'NetworkError';
      }
    }],
    [400, class BadRequestError extends Error {
      constructor(message?: string) {
        super(message || 'Помилка запиту. Перевірте правильність введення');
        this.name = 'BadRequestError';
      }
    }],
    [401, class UnauthorizedError extends Error {
      constructor(message?: string) {
        super(message || 'Ви не авторизовані');
        this.name = 'UnauthorizedError';
      }
    }],
    [403, class ForbiddenError extends Error {
      constructor(message?: string) {
        super(message || 'Ви не маєте доступу до цієї сторінки');
        this.name = 'ForbiddenError';
      }
    }],
    [404, class NotFoundError extends Error {
      constructor(message?: string) {
        super(message || 'Не знайдено');
        this.name = 'NotFoundError';
      }
    }],
    [500, class InternalServerError extends Error {
      constructor(message?: string) {
        super(message || 'Проблема сервера. Спробуйте пізніше');
        this.name = 'InternalServerError';
      }
    }]
  ]);

  public isError = this._isError.asObservable();
  public message: string = "";

  processError(err: HttpErrorResponse): HttpErrorResponse {
    this._isError.next(true);

    const errorClass = this._errorTypeDictionary.get(err.status);

    if (errorClass) {
      const errorInstance = new errorClass();
      this.message = errorInstance.message;
    } else {
      this.message = 'Невідома помилка';
    }

    console.log(this.message);

    return new HttpErrorResponse({
      error: err.error,
      headers: err.headers,
      status: err.status,
      statusText: err.statusText,
      url: err.url || undefined,
    });
  }

  hideError(){
    this._isError.next(false);
  }
}
