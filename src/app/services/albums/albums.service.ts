import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Albums } from "src/app/models/albums/albums";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class AlbumsService {
  API: string = "https://jsonplaceholder.typicode.com/albums";

  constructor(private http: HttpClient) {}

  /** GET hero by id. Will 404 if id not found */
  getAlbums(): Observable<Albums[]> {
    return this.http
      .get<Albums[]>(this.API)
      .pipe(catchError(this.handleError<Albums[]>("getAlbums", [])));
  }

  /** PUT: update the hero on the server */
  updateAlbums(albums: Albums): Observable<any> {
    const url = `${this.API}/${albums.id}`;
    return this.http.put(url, albums, httpOptions);
  }

  /** POST: add a new hero to the server */
  addAlbums(albums: Albums): Observable<Albums> {
    return this.http.post<Albums>(this.API, albums, httpOptions);
  }

  /** DELETE: delete the hero from the server */
  deletePhrases(albums: Albums): Observable<Albums> {
    const url = `${this.API}/${albums.id}`;
    return this.http.delete<Albums>(url, httpOptions);
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  log(arg0: string) {
    throw new Error("Method not implemented.");
  }
}
