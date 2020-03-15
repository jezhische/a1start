import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import * as $ from 'jquery';
import {filter, flatMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get('https://api.github.com/users');
  }
  getUsersJQuery(): Observable<any> {
    return from(observer =>
      $.getJSON('https://api.github.com/users')
        .done(response => observer.onNext(response))
        .fail((jqXHR, status, error) => observer.onError(error))
        .always(() => observer.onCompleted())
    );
  }
  getUsersResponseStreamFromRequestStream(...url: string[]): Observable<any> {
    const requestStream = from(url);
    const responseStream = requestStream
      // NB: map() дает responseStream = Observable<Observable<Object>>, а flatMap() дает Observable<Object>
      .pipe(
        // filter((val, index) => index % 10 !== 0),
      flatMap(request => this.http.get(request)));
    return responseStream;
  }
}
