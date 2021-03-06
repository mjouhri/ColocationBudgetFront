import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserColocations } from '../models/user-colocations.model';

@Injectable({
  providedIn: 'root'
})
export class UserColocationsService {

  SERVER_URL = environment.baseUrl + '/user/colocations';

  constructor(private _httpClient: HttpClient) { 

  }

  getUserColocationsById(idUser: number): Observable<UserColocations> {
    return this._httpClient.get<UserColocations>(`${this.SERVER_URL}/${idUser}`);
  }

  getNbColocationsByIdUser(idUser: number): Observable<number> {
    return this._httpClient.get<number>(`${this.SERVER_URL}/nb/${idUser}`);
  }

}
