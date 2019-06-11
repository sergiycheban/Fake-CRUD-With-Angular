import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Phrases } from "../../models/phrases/phrases";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: "root"
})
export class PhrasesService {
  API: string = "https://jsonplaceholder.typicode.com/posts";

  constructor(private http: HttpClient) {}

  /** GET hero by id. Will 404 if id not found */
  getPhrases(): Observable<Phrases[]> {
    return this.http
      .get<Phrases[]>(this.API)
      .pipe(catchError(this.handleError<Phrases[]>("getPhrases", [])));
  }

  /** PUT: update the hero on the server */
  updatePhrases(phrases: Phrases): Observable<any> {
    const url = `${this.API}/${phrases.id}`;
    return this.http.put(url, phrases, httpOptions);
  }

  /** POST: add a new hero to the server */
  addPhrases(phrases: Phrases): Observable<Phrases> {
    return this.http.post<Phrases>(this.API, phrases, httpOptions);
  }

  /** DELETE: delete the hero from the server */
  deletePhrases(phrases: Phrases): Observable<Phrases> {
    const url = `${this.API}/${phrases.id}`;
    return this.http.delete<Phrases>(url, httpOptions);
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
