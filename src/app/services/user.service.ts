import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../models/user.model';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  SERVER_URL = environment.baseUrl + '/user';

  constructor(private _httpClient: HttpClient) { 
    
  }

  getUserByMail(mail: String): Observable<User> {
    let params = new HttpParams();
    params = params.set('mail', `${mail}`);
    return this._httpClient.get<User>(`${this.SERVER_URL}`, { params });
  }

  getUserByID(id: number): Observable<User> {
    return this._httpClient.get<User>(`${this.SERVER_URL}/${id}`);
  }

}
