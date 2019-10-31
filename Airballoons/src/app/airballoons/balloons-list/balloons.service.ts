import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Airballoon, AirballoonListItem} from '../../interfaces/airballoon';
import {Observable, throwError} from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BalloonsService {

  uri = 'https://' + window.location.hostname + ':44371/api/airball';

  constructor(private http: HttpClient) {
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error(error.error.message);
    } else {
      console.error(error);
    }
    return throwError('Сбой программы.');
  }

  getBalloons(first: number, rows: number, sort: any, filters: any): Observable<HttpResponse<any>> {
    let params = new HttpParams();
    params = params.append('start', first.toString());
    params = params.append('length', rows.toString());
    params = params.append('orders', sort);
    params = params.append('filters', filters);
    return this.http.get<any>(this.uri, {
      observe: 'response',
      params
    })
      .pipe(
      catchError(this.handleError)
    );
  }

  getBalloon(id: number): Observable<Airballoon> {
    return this.http.get<Airballoon>(this.uri + '/' + id.toString(), httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  addBalloon(balloon: Airballoon) {
    return this.http.post(this.uri, balloon, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  updBalloon(id: number, balloon: Airballoon) {
    return this.http.put(this.uri + '/' + id.toString(), balloon, httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  delBalloon(balloonId: number) {
    const uri = location.origin;
    return this.http.delete(this.uri + '/' + balloonId.toString(), httpOptions).pipe(
      catchError(this.handleError)
    );
  }
}
