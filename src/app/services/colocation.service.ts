import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Colocation } from '../models/colocation.model';

@Injectable({
  providedIn: 'root'
})
export class ColocationService {

  SERVER_URL = environment.baseUrl + '/colocation';

  constructor(private _httpClient: HttpClient) { 
  }

  getColocationsById(id: number): Observable<Colocation> {
    return this._httpClient.get<Colocation>(`${this.SERVER_URL}/${id}`);
  }

}
