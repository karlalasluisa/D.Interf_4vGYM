
import { Injectable } from '@angular/core';
import { TypeActivity } from '../models/TypeActivity';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AcivityTypeServiceService {

  constructor(private http: HttpClient) { }

  getTypes() :Observable<TypeActivity[]>{
    return this.http.get<TypeActivity[]>('http://localhost:8000/activity_types'); 
  }
}
