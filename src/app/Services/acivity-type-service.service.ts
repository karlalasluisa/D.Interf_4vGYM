import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TypeActivity } from '../models/TypeActivity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcivityTypeServiceService {

  constructor(private http: HttpClient) { }

  getTypes() :Observable<TypeActivity[]>{
    return this.http.get<TypeActivity[]>('http://localhost:8080/activity-types'); //TODO poner los buenos de web
  }
}
