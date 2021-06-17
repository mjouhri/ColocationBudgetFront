import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Colocation } from '../models/colocation.model';
import { Spend } from '../models/spend.model';
import { Type } from '../models/type.model';
import { User } from '../models/user.model';

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

  addSpendToColocation(idColocation: number, spend: Spend): Observable<Colocation> {
    return this._httpClient.post<Colocation>(`${this.SERVER_URL}/addSpend/${idColocation}`, spend);
  }

  getListSpendType(): Observable<Type[]> {
    return this._httpClient.get<Type[]>(`${this.SERVER_URL}/listSpendType`);
  }

  getUsersOfColocation(idColocation: number): Observable<User[]> {
    return this._httpClient.get<User[]>(`${this.SERVER_URL}/usersOfColocation/${idColocation}`);
  }

}
