import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  url = 'https://api.github.com/users/';
  noUser: boolean;

  constructor(private http: HttpClient) {}

  getGitUser(userName: string): Observable<any> {
    return this.http
      .get(this.url + userName)
      .pipe(catchError(this.handleError()));
  }

  private handleError<T>(operation = 'operation', result?: T) {

    return (error: any): Observable<T> => {
      console.error(error.message);
      return of(result as T);
    };
  }

}
