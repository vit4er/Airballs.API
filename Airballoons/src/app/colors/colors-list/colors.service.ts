import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Color} from '../../interfaces/color';
import {catchError} from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ColorsService {

  constructor(private http: HttpClient) { }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(error.error.message);
    } else {
      console.error(error);
    }
    return throwError('Ошибка вышла...');
  }

  getAllColors(): Observable<Color[]> {
    return this.http.get<Color[]>('https://localhost:44371/api/color', httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  addColor(color): Observable<Color> {
    return this.http.post<Color>('https://localhost:44371/api/color', color, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  delColor(code: string) {
    code = code.replace(/#/i, '');
    return this.http.delete ('https://localhost:44371/api/color/' + code, httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
